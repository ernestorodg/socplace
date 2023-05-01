import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Grid, Transition, Container, Segment } from 'semantic-ui-react';
import PostCard from '../components/PostCard';
import { FETCH_FILTERED_PRODUCTS_QUERY } from '../util/graphql';
import MapContainer from '../components/Map';
import FilterButton from '../components/FilterButton';
import SearchBar from '../components/SearchBar';
import LoadingIcon from '../components/LoadingIcon';

function Home() {
  // const { user } = useContext(AuthContext);
  const [filters, setFilters] = useState({});



  const query = FETCH_FILTERED_PRODUCTS_QUERY;
  const {
    data: { filterProduct: posts },
    loading, error, refetch
    } = useQuery(query, {
      variables: 
          filters
  });

  console.log(error)

  // useEffect(() => {
  //   setFilters({});
  // }, [filters]);


  return (
    <Container fluid style={{ height: "100%"}}>
    <Grid className='home_grid' centered columns={2} style={{ height: "100%"}} stackable>
      <Grid.Column style={{ height: "100%"  , overflow: "auto"}}>
        <Segment>
          <Grid columns = {2}>
              <Grid.Column>              
                <SearchBar setFilters={setFilters} refetch={refetch}/>
              </Grid.Column>
              <Grid.Column>
                <FilterButton setFilters={setFilters} refetch={refetch}/>
              </Grid.Column>
          </Grid>
        </Segment>

        {loading ? (
          <Segment >
            <LoadingIcon centered/>
          </Segment>
        ) : (
          <Container>
            <Transition.Group>
              <Grid className='productDisplayer' centered columns={3} stackable style={{margin: 1}}>
                <Grid.Row >
                  {posts &&
                    posts.map((post) => (
                      <Grid.Column key={post.id}>
                        <PostCard post={post} />
                      </Grid.Column>
                    ))}
                </Grid.Row>
              </Grid>
            </Transition.Group>
          </Container>
        )}
      </Grid.Column>

      <Grid.Column className='map_column'>
        <Container fluid>
          {posts && <MapContainer posts={posts}/>}    
        </Container>
      </Grid.Column>

    </Grid>
    </Container>


  );
}
export default Home;


