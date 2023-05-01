import React, { useState } from 'react';
import { Button, Form } from 'semantic-ui-react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import categories from '../util/categories';
import { useForm } from '../util/hooks';
import { FETCH_FILTERED_PRODUCTS_QUERY } from '../util/graphql';
import Dropzone from './Dropzone';
import {useHistory} from 'react-router-dom'
import CropModal from './cropImage/CropModal'




function PostForm(props) {
  const history = useHistory();
  const [cropModalState, triggerCropModalState] = useState(false);
  const [croppedImage, setCroppedImage] = useState(null);
  const [droppedImage, handleDroppedImage] = useState(null);

  const updateCategoryCallback = (e, {value}) => {
    // e.persist();
    // console.log(e.target.textContent);
    values.category = value
  };


  const { values, onChange, onSubmit } = useForm(createProductCallback, {
    title: '',
    description: '',
    category: '',
    price: '',
    image: '',
  });
  
  const [createProduct, { error }] = useMutation(CREATE_PRODUCT_MUTATION, {
    variables: values,
    update(proxy, result) {
      const data = proxy.readQuery({
        query: FETCH_FILTERED_PRODUCTS_QUERY
      });
      data.filterProduct = [result.data.createProduct, ...data.filterProduct];
      proxy.writeQuery({ query: FETCH_FILTERED_PRODUCTS_QUERY, data });
      history.push('/');

    }
  });

  async function createProductCallback() {
    const formData = new FormData();

    if (croppedImage !== null) {
      const file = await fetch(croppedImage)
      .then(r => r.blob())
      .then(blobFile => new File([blobFile], "file.png", { type: "image/png" }));
      formData.append('file', file);
      formData.append("upload_preset", "it8z1lbf");
      formData.append("cloud_name","drhckdsxw");
      return fetch("https://api.cloudinary.com/v1_1/drhckdsxw/image/upload",{
          method:"post",
          body: formData
      })
      .then(resp => resp.json())
      .then(data => {
        values.image = data.url
        console.log(values)
        console.log('Success:', data);
        createProduct();
      })
      .catch(err => console.log(err))
  

    }
    else {
      try {
        createProduct();
      }catch(e) {
        console.log(e)
      }
    }

  }
  

    return (
      <>
        <Form onSubmit={onSubmit}>
          <h2>What are you selling?</h2>
          <Form.Field>
            <Form.Input
              placeholder="Title*"
              name="title"
              onChange={onChange}
              value={values.title}
              error={error ? true : false}
            />
            <Form.Input
              placeholder="Description*"
              name="description"
              onChange={onChange}
              value={values.description}
              error={error ? true : false}
            >
            </Form.Input>


            {/* <Form.Input
              placeholder="Category"
              name="category"
              onChange={onChange}
              value={values.category}
              error={error ? true : false}
            >
            </Form.Input> */}

            <Form.Select
                name="category"
                onChange={updateCategoryCallback}
                placeholder='Category'
                options={categories}
            />


            <Form.Input
              placeholder="Price"
              name="price"
              onChange={onChange}
              value={values.price}
              error={error ? true : false}
            >
            </Form.Input>
          

            <Form.Field>
            {/* <Form.Field> */}
              <Dropzone 
                triggerCropModalState={triggerCropModalState} 
                handleDroppedImage={handleDroppedImage}
              />
            </Form.Field>
            
            <p>
              {droppedImage && 
                <CropModal 
                  cropModalState={cropModalState} 
                  droppedImage={droppedImage} 
                  setCroppedImage={setCroppedImage}
                />}
            </p>
            


            <Button type="submit" color="teal">
              Submit
            </Button>
          </Form.Field>
        </Form>
        {error && (
          <div className="ui error message" style={{ marginBottom: 20 }}>
            <ul className="list">
              <li>{error.graphQLErrors[0].message}</li>
            </ul>
          </div>
        )}
      </>
    );
  }

const CREATE_PRODUCT_MUTATION = gql`
  mutation createProduct($title: String!,
                        $description: String!,
                        $category: String!,
                        $price: String!,
                        $image: String,
                        ) {
    createProduct(title: $title,
                  description: $description,
                  category: $category,
                  price: $price,
                  image: $image,
                  ) {
      _id
      description
      title
      seller
      price
      category
      latitude
      longitude
      comments {
        id
        body
        username
      }
    }
  }
`;




export default PostForm;
