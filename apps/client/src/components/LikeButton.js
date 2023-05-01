// import React, { useState } from 'react';
import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Button, Icon } from 'semantic-ui-react';
import { useState, useEffect } from 'react';

function LikeButton({ user, post: { _id } }) {
  const [liked, setLiked] = useState(false);

  const [getSavedProducts, { 
    data: dataSavedProducts, loading: loadingSavedProducts 
  }] = useMutation(FETCH_SAVED_PRODUCTS);

  const getSavedProductsCallback = useCallback(()=> {
    getSavedProducts();
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (user) {
      getSavedProductsCallback()
    }
  }, [user, getSavedProductsCallback]);

  useEffect(() => {
    if (user) {
      if (!loadingSavedProducts && dataSavedProducts) {
        user.savedProducts = dataSavedProducts.getUserSavedProducts
        if (user.savedProducts && user.savedProducts.find((savedProduct) => savedProduct.id === _id)) {
          setLiked(true);
        }
        else setLiked(false);
      }      
    }
  }
  , [loadingSavedProducts, _id, dataSavedProducts, user]);


  const [saveProduct, { data, loading }] = useMutation(SAVE_PRODUCT_MUTATION, {
    variables: { productId: _id }
  });

  useEffect(() => {
    if (user) {
      if (!loading && data) {
        user.savedProducts = data.saveProduct
        if (user.savedProducts && user.savedProducts.find((savedProduct) => savedProduct.id === _id)) {
          setLiked(true);
        }
        else setLiked(false);
      }    
    }
  }, [loading, _id, data, user]);

  const likeButton = user ? (
    liked ? (
      <Button 
      as="div" onClick={saveProduct} floated="right" icon circular
      color="red">
        <Icon name="heart" />
      </Button>
    ) : (
      <Button 
      as="div" onClick={saveProduct} floated="right" icon circular basic
      color="red">
        <Icon name="heart" />
      </Button>
    )
  ) : (
    <Button 
    onClick={saveProduct} floated="right" icon circular basic
    as={Link} to="/accounts/login" color="red">
      <Icon name="heart" />
    </Button>
  );
  return (
    <>{likeButton}</>
        
  );
}

const SAVE_PRODUCT_MUTATION = gql`
  mutation saveProduct($productId: ID!) {
    saveProduct(productId: $productId) {
      id
      createdAt
    }
  }
`;

const FETCH_SAVED_PRODUCTS = gql`
  mutation getSavedProducts{
    getUserSavedProducts {
        id
        createdAt
    }
  }
`;

export default LikeButton;
