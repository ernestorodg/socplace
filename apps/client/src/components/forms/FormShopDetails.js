import { Button, Form, Container } from 'semantic-ui-react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { useForm } from '../../util/hooks';
import SearchPlacesBox from '../../components/SearchPlacesBox'
import Dropzone from '../Dropzone';
import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/auth';
import CropModal from '../cropImage/CropModal'


let latitude = 0;
let longitude = 0;

function FormShopDetails(props) {
  console.log('entrou em FormShop:', props)
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});
  const [cropModalState, triggerCropModalState] = useState(false);
  const [croppedImage, setCroppedImage] = useState(null);
  const [droppedImage, handleDroppedImage] = useState(null);

  const { values } = props;

  const back = e => {
    console.log(props)
    console.log('step: ', props.step)
    e.preventDefault();
    props.prevStep();
  };

  const { onChange, onSubmit, toSendValues } = useForm(createShopCallback, 
    {}
  );

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(
      _,
      {
        data: { register: userData }
      }
    ) {
      context.login(userData);
      props.history.push('/');
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values
  });

  console.log(toSendValues, loading)

  function registerUser() {
    addUser();
  }


  const panTo = React.useCallback(({ lat, lng }) => {
    latitude = lat;
    longitude = lng;
    console.log("create! ", latitude, " e ", longitude)

  }, []);
  
  async function createShopCallback() {
    const formData = new FormData();
    console.log('values:', values)
    
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
        values.latitude = latitude;
        values.longitude = longitude;
        console.log(values)
        console.log('Success:', data);
        registerUser();
      })
      .catch(err => console.log(err))
    }
    else {
      values.latitude = latitude;
      values.longitude = longitude;
      console.log("create! ", values.latitude, " e ", values.longitude)
      try {
        registerUser();
      }catch(e) {
        console.log(e)
      }
    }

  }

  return (
    // <MuiThemeProvider>
    //   <>
    //     <Dialog
    //       open
    //       fullWidth
    //       maxWidth='sm'
    //     >
    //       <AppBar title="Enter User Details" />
    //       <TextField
    //         placeholder="Enter Your First Name"
    //         label="First Name"
    //         onChange={handleChange('firstName')}
    //         defaultValue={values.firstName}
    //         margin="normal"
    //         fullWidth
    //       />
    //       <br />
    //       <TextField
    //         placeholder="Enter Your Last Name"
    //         label="Last Name"
    //         onChange={handleChange('lastName')}
    //         defaultValue={values.lastName}
    //         margin="normal"
    //         fullWidth
    //       />
    //       <br />
    //       <TextField
    //         placeholder="Enter Your Email"
    //         label="Email"
    //         onChange={handleChange('email')}
    //         defaultValue={values.email}
    //         margin="normal"
    //         fullWidth
    //       />
    //       <br />


    //       <Button
    //           color="secondary"
    //           variant="contained"
    //           onClick={back}
    //         >Back</Button>

    //       <Button
    //           color="primary"
    //           variant="contained"
    //           onClick={nextStep}
    //         >Confirm</Button>
    //     </Dialog>
    //   </>
    // </MuiThemeProvider>
    <Container>
      <Form onSubmit={onSubmit}>
        <h2>How will be your shop?</h2>
        <Form.Field>

          <Form.Input fluid
              placeholder="Your location"
              name="location"
              onChange={onChange}
              value={values.location}
              // error={error ? true : false}
            >
              <SearchPlacesBox panTo={panTo}/>
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

          <Button
              onClick={back}
            >Back</Button>

          <Button type="submit" color="teal">
            Confirm
          </Button>
        </Form.Field>

        

{/* 
          <Button
              color="primary"
              variant="contained"
              onClick={nextStep}
            >Confirm</Button> */}

      </Form>
      {Object.keys(errors).length > 0 && (
        <div className="ui error message">
          <ul className="list">
            {Object.values(errors).map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
      )}
    </Container>
  );
}
export default FormShopDetails;


const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
    $latitude: Float
    $longitude: Float
    $image: String
    
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
        latitude: $latitude
        longitude: $longitude
        image: $image
      }
    ) {
      id
      email
      username
      createdAt
      token
      latitude
      longitude
      image
    }
  }
`;
