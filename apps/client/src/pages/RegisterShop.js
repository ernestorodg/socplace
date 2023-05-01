import React, { useContext, useState } from 'react';
import { Button, Form } from 'semantic-ui-react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import SearchPlacesBox from '../components/SearchPlacesBox'
import { AuthContext } from '../context/auth';
import { useForm } from '../util/hooks';


let latitude = 0;
let longitude = 0;

function RegisterShop(props) {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});

  const { onChange, onSubmit, values } = useForm(registerUser, {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    latitude: 0,
    longitude: 0
  });

  const panTo = React.useCallback(({ lat, lng }) => {
    latitude = lat;
    longitude = lng;
    console.log("create! ", latitude, " e ", longitude)

  }, []);

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

  function registerUser() {
    const formData = new FormData();

    if (filesToUpload.length > 0) {
      console.log(filesToUpload[0])
      formData.append('file', filesToUpload[0])
      fetch(
        process.env.REACT_APP_PRODUCTS_API_URL + '/products/image/upload',
        {
          method: 'POST',
          body: formData,
        }
      )
      .then((response) => response.json())
      .then((result) => {
        values.image = result.filename
        console.log(values)
        console.log('Success:', result);
        values.latitude = latitude;
        values.longitude = longitude;
        console.log("create! ", values.latitude, " e ", values.longitude)

        createProduct();
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    }
    else {
      values.latitude = latitude;
      values.longitude = longitude;
      console.log("create! ", values.latitude, " e ", values.longitude)
      try {
        createProduct();
      }catch(e) {
        console.log(e)
      }
    }
    addUser();
  }

  

  return (
    <div className="form-container">
      <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
        <h1>RegisterShop</h1>
        <Form.Input
          label="Username"
          placeholder="Username.."
          name="username"
          type="text"
          value={values.username}
          error={errors.username ? true : false}
          onChange={onChange}
        />
        <Form.Input
          label="Email"
          placeholder="Email.."
          name="email"
          type="email"
          value={values.email}
          error={errors.email ? true : false}
          onChange={onChange}
        />
        <Form.Input
          label="Password"
          placeholder="Password.."
          name="password"
          type="password"
          value={values.password}
          error={errors.password ? true : false}
          onChange={onChange}
        />
        <Form.Input
          label="Confirm Password"
          placeholder="Confirm Password.."
          name="confirmPassword"
          type="password"
          value={values.confirmPassword}
          error={errors.confirmPassword ? true : false}
          onChange={onChange}
        />
        <Form.Input 
          fluid
          label="Where would you like to sell?"
          placeholder="Location*"
          name="location"
          onChange={onChange}
          value={values.location}
          error={errors.location ? true : false}
        >
          <SearchPlacesBox panTo={panTo}/>
        </Form.Input>


        <Button type="submit" primary>
          RegisterShop
        </Button>
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
    </div>
  );
}

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      username
      createdAt
      token
      latitude
      longitude
    }
  }
`;

export default RegisterShop;
