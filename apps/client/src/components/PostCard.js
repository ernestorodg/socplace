import React, { useContext } from 'react';
import { Button, Card, Icon, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import { AuthContext } from '../context/auth';
import LikeButton from './LikeButton';
import { useState } from 'react';


function PostCard({
  // post: { body, createdAt, id, username, likeCount, commentCount, likes }
  post: { description, _id, seller, title, image, price}

}) {
  const { user } = useContext(AuthContext);
  const [raised, setRaised] = useState(false)
  const src = image;
  // const src = 'http://localhost:4000' + "/products/image/" + image;

  return (
    <Card raised={raised} onMouseOver={() => {setRaised(true)}} 
    centered fluid onMouseOut={() => {setRaised(false)}}>
      <Image as={Link} to={`/products/${_id}`} src={src} wrapped ui={false} />
      <Card.Content as={Link} to={`/products/${_id}`} textAlign = "left">
        <Card.Meta as={Link} to={`/users/${seller}`}>by {seller}</Card.Meta>
        <Card.Header>
          {title} 
        </Card.Header>
        <Card.Meta textAlign="left" >
          {/* {moment(createdAt).fromNow(true)} */}
          {/* <Card.Description></Card.Description> */}
        </Card.Meta>
        
      </Card.Content>
      <Card.Content textAlign="left" extra>
        {/* <Card.Content textAlign="left"> */}
        <strong>R$ {price}</strong>

          <Button as={Link} to={`/products/${_id}`} floated="right"
            icon circular basic color='blue'
            >
            <Icon name="comments" />
          </Button>

          <LikeButton user={user} post={{ _id }} />

      </Card.Content>
    </Card>
  );
}

export default PostCard;
