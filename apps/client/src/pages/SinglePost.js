import React, { useContext, useState, useRef } from 'react';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';
import {
  Card,
  Form,
  Grid,
  Image,
} from 'semantic-ui-react';

import { AuthContext } from '../context/auth';
import DeleteButton from '../components/DeleteButton';
import MessageButton from '../components/MessageButton';
import LikeButton from '../components/LikeButton';

function SinglePost(props) {
  const productId = props.match.params._id;
  const { user } = useContext(AuthContext);
  const commentInputRef = useRef(null);

  const [comment, setComment] = useState('');

  const {
    data: { getProduct }
  } = useQuery(FETCH_POST_QUERY, {
    variables: {
      productId
    }
  });

  const [submitComment] = useMutation(SUBMIT_COMMENT_MUTATION, {
    update() {
      setComment('');
      commentInputRef.current.blur();
    },
    variables: {
      productId,
      body: comment
    }
  });

  function deletePostCallback() {
    props.history.push('/');
  }

  let postMarkup;
  if (!getProduct) {
    postMarkup = <p>Loading post..</p>;
  } else {
    const {
      _id,
      description,
      seller,
      comments,
      image,
      price
    } = getProduct;

    // const src = "http://products-service:4000/products/image/" + image;
    const src = image;


    postMarkup = (
      <Grid>
        <Grid.Row>
          <Grid.Column width={2}>
            <Image
              src={src}
              size="small"
              float="right"
              rounded wrapped
            />
          </Grid.Column>
          <Grid.Column width={10}>
            <Card fluid>
              <Card.Content>
                <Card.Header>{seller}</Card.Header>
                {/* <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta> */}
                <Card.Description>R$ {price}<p></p>{description}</Card.Description>
              </Card.Content>
              <hr />
              <Card.Content extra>
                {user && user.username === seller && (
                  <DeleteButton productId={_id} callback={deletePostCallback} />
                )}
                {user && (<MessageButton client={user} seller={seller}/>)}
                <LikeButton user={user} post={{ _id }} />
              </Card.Content>
            </Card>
            {user && (
              <Card fluid>
                <Card.Content>
                  <p>Post a comment</p>
                  <Form>
                    <div className="ui action input fluid">
                      <input
                        type="text"
                        placeholder="Comment.."
                        name="comment"
                        value={comment}
                        onChange={(event) => setComment(event.target.value)}
                        ref={commentInputRef}
                      />
                      <button
                        type="submit"
                        className="ui button teal"
                        disabled={comment.trim() === ''}
                        onClick={submitComment}
                      >
                        Submit
                      </button>
                    </div>
                  </Form>
                </Card.Content>
              </Card>
            )}
            {comments.map((comment) => (
              <Card fluid key={comment.username}>
                <Card.Content>
                  {user && user.username === comment.username && (
                    <DeleteButton productId={_id} commentId={comment.id} />
                  )}
                  <Card.Header>{comment.username}</Card.Header>
                  {/* <Card.Meta>{moment(comment.createdAt).fromNow()}</Card.Meta> */}
                  <Card.Description>{comment.body}</Card.Description>
                </Card.Content>
              </Card>
            ))}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
  return postMarkup;
}

const SUBMIT_COMMENT_MUTATION = gql`
  mutation($productId: String!, $body: String!) {
    createComment(productId: $productId, body: $body) {
      _id
      comments {
        id
        body
        username
      }
    }
  }
`;

const FETCH_POST_QUERY = gql`
  query($productId: ID!) {
    getProduct(productId: $productId) {
      _id
      seller
      description
      image
      latitude
      longitude
      price
      comments {
        id
        username
        body
      }
    }
  }
`;

export default SinglePost;
