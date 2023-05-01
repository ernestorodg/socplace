import React, { useContext } from 'react';
import { Grid } from 'semantic-ui-react';

import { AuthContext } from '../context/auth';
import PostForm from '../components/PostForm';

function Announce(props) {
    const { user } = useContext(AuthContext);


    return (
    <Grid centered columns={2}>

        {user && (
            <Grid.Column>
            <PostForm props={props}/>
            </Grid.Column>
        )}
        
    </Grid>
    );
}

export default Announce;
