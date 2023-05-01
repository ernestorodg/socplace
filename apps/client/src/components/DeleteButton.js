import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { Button, Confirm, Icon } from 'semantic-ui-react';

import { FETCH_FILTERED_PRODUCTS_QUERY } from '../util/graphql';
import MyPopup from '../util/MyPopup';

function DeleteButton({ productId, commentId, callback }) {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const mutation = commentId ? DELETE_COMMENT_MUTATION : DELETE_PRODUCT_MUTATION;

  const [deleteProductOrMutation] = useMutation(mutation, {
    update(proxy) {
      setConfirmOpen(false);
      if (!commentId) {
        const data = proxy.readQuery({
          query: FETCH_FILTERED_PRODUCTS_QUERY
        });
        data.filterProduct = data.filterProduct.filter((p) => p._id !== productId);
        proxy.writeQuery({ query: FETCH_FILTERED_PRODUCTS_QUERY, data });
      }
      if (callback) callback();
    },
    variables: {
      productId,
      commentId
    }
  });
  return (
    <>
      <MyPopup content={commentId ? 'Delete comment' : 'Delete post'}>
        <Button
          as="div"
          color="red"
          floated="right"
          onClick={() => setConfirmOpen(true)}
        >
          <Icon name="trash" style={{ margin: 0 }} />
        </Button>
      </MyPopup>
      <Confirm
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={deleteProductOrMutation}
      />
    </>
  );
}

const DELETE_PRODUCT_MUTATION = gql`
  mutation deleteProduct($productId: ID!) {
    deleteProduct(productId: $productId)
  }
`;

const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($productId: ID!, $commentId: ID!) {
    deleteComment(productId: $productId, commentId: $commentId) {
      _id
      comments {
        id
        username
        createdAt
        body
      }
      commentCount
    }
  }
`;

export default DeleteButton;
