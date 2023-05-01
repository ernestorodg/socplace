import React from 'react'
import {
  Header,
  Segment,
  Sticky,
} from 'semantic-ui-react'


function LateralBar() {
    return (
        <Sticky>
            <Segment style={{ margin: 20 }}>
                    <Header as='h3'>Stuck Content</Header>
            </Segment>
        </Sticky>

)}


export default LateralBar;
