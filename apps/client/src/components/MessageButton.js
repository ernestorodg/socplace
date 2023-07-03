import React from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';


async function startConversation (client, seller){

    // get seller id
    const sellerId = await axios.get(
        process.env.REACT_APP_MESSAGES_API_URL + "/api/users/?username=" + seller)

    //check if a conversation if this seller already exist
    const convExist = await axios.get(
        process.env.REACT_APP_MESSAGES_API_URL + `/api/conversations/find/${client.id}/${sellerId.data._id}`);
    if (convExist.data){
    return [convExist.data._id, sellerId.data._id]
    }
    else{
    //post conversation with seller
    try {
        const res = await axios.post(
            process.env.REACT_APP_MESSAGES_API_URL + "/api/conversations/postConv/?senderId=" + client.id + "&receiverId=" + sellerId.data._id
        );
        return [res.data._id, sellerId.data._id]
    } catch (err) {
        console.log(err);
    }
    }
}

const handleConversation = (client, seller) =>{
    startConversation(client, seller).then((response) => {
        // window.location.href = process.env.REACT_APP_WEB_CLIENT_URL + '/messenger/?sellerId=' + response[1] + "&convId=" + response[0]
        window.location.href = '/messenger/?sellerId=' + response[1] + "&convId=" + response[0]
    })
}
function MessageButton({client, seller}){
    return(
        <>
        <strong as={Link} onClick={() => handleConversation(client, seller)} >Chat with seller</strong> 
            {/* <Button onClick={}>
                <Button color="blue" basic>
                    <Icon name="chat" />
                </Button>
            </Button> */}
        </>
    );
}

export default MessageButton;