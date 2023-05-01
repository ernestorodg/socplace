import gql from 'graphql-tag';

export const FETCH_PRODUCTS_QUERY = gql`
{
  getProducts {
    _id
    title
    seller
    description
    category
    price
    image
    latitude
    longitude
    comments {
      username
      body
    }
  }
}
`;



export const FETCH_FILTERED_PRODUCTS_QUERY = gql`
query filterProduct(
      $title: String,
      $description: String,
      $seller: String,
      $price: String,
      $image: String,
      $latitude: Float,
      $longitude: Float,
  ) { 
      filterProduct(
          title: $title,
          description: $description,
          seller: $seller,
          price: $price,
          image: $image,
          latitude: $latitude,
          longitude: $longitude) {
              _id
              title
              seller
              description
              category
              price
              image
              latitude
              longitude
              comments {
              username
              body
              }
          }
  }
`;
