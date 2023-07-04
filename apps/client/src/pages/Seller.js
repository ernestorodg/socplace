import React, {useContext} from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import {
  Grid,
  Image,
  Transition,
  Segment,
  Container
} from 'semantic-ui-react';
import { AuthContext } from '../context/auth';
import { FETCH_FILTERED_PRODUCTS_QUERY } from '../util/graphql';
import PostCard from '../components/PostCard';
import MessageButton from '../components/MessageButton';


function Seller(props) {
  const filters = {seller: props.match.params.username}
  const query = FETCH_FILTERED_PRODUCTS_QUERY;
  const { user } = useContext(AuthContext);

  const {
    data: { getUserData: seller },
    loading_user, error_user, refetch_user
    } = useQuery(FETCH_USER_QUERY, {
      variables: 
        {username: filters.seller}
  });


  // const image_src = "http://localhost:4000/products/image/" + seller.image;

  // let user_data;
  // if (!seller) {
  //   user_data = <p>Loading User</p> 
  // } else {
  //   const {
  //     id,
  //     username,
  //     latitude,
  //     longitude,
  //     image
  //   } = seller;
  // }

  const {
    data: { filterProduct: posts },
    loading, error, refetch
    } = useQuery(query, {
      variables: 
        filters
  });



  return (
    
    <Container centered>
          <Grid columns={1}>
            <Grid.Row>
              <Grid.Column>
                {seller && 
                  <Segment raised>
                    <Grid columns={2}>

                      <Grid.Column>
                        <Image src={seller.image} 
                          wrapped size='small' circular/>
                      </Grid.Column>

                      <Grid.Column>
                        <h1>{seller.username}</h1>
                        {/* <p>Descrição da pessoa? Endereço?</p>                           */}
                      </Grid.Column>

                      {seller && (<MessageButton client={user} seller={seller.username}/>)}

                    </Grid>
                  </Segment>
                }
            </Grid.Column>
            </Grid.Row>
            <Transition.Group>
            <Grid centered columns={3} style={{ height: "100%"}} stackable>
                <Grid.Row>
                  {posts &&
                    posts.map((post) => (
                      <Grid.Column key={post.id}>
                        <PostCard post={post} />
                      </Grid.Column>
                  ))}
                </Grid.Row>
              </Grid>
            </Transition.Group>
          </Grid>
      </Container>
  );
}


const FETCH_USER_QUERY = gql`
  query($username: String!) {
    getUserData(username: $username) {
      id
      username
      latitude
      longitude
      image
    }
  }
`;

export default Seller;
