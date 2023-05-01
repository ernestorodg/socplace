import React from 'react';
import FormShopDetails from './FormShopDetails';
import FormUserDetails from './FormUserDetails';
import { useState } from 'react';

function UserForm(props) {
  const [state, setState] = useState({
    step: 1,
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    image: '',
    latitude: 0,
    longitude: 0
  });

  // Proceed to next step
  function nextStep() {
    const { step } = state;
    setState({
      ...state,
      step: step + 1
    });
  };

  // Go back to prev step
  function prevStep() {
    const { step } = state;
    setState({
      ...state,
      step: step - 1
    });
  };

  // Handle fields change
  const handleChange = input => e => {
    setState({ ...state, [input]: e.target.value });
  };

  const { step } = state;
  const { username, email, password, confirmPassword, 
    image, latitude, longitude } = state;
  const values = { username, email, password, confirmPassword, 
    image, latitude, longitude };

  switch (step) {
    case 1:
      return (
        <FormUserDetails
          nextStep={nextStep}
          handleChange={handleChange}
          values={values}
        />
      );
    case 2:
      return (
        <FormShopDetails
          nextStep={nextStep}
          prevStep={prevStep}
          handleChange={handleChange}
          values={values}
        />
      );
    default:
      (console.log('This is a multi-step form built with React.'))
  }
}

export default UserForm;
