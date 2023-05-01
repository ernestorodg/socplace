import { Button, Form } from 'semantic-ui-react';
import React from 'react';

function FormUserDetails(props) {
  console.log('entrou em FormUser:', props)
  const errors = {};

  const nextStep = e => {
    console.log(props)
    console.log('step: ', props.step)
    e.preventDefault();
    props.nextStep();
  };

  const { handleChange } = props;
  return (
    <div className="form-container">
      <Form onSubmit={nextStep} noValidate>
        <h1>Register</h1>
        <Form.Input
          label="Username"
          placeholder="Username.."
          name="username"
          type="text"
          error={errors.username ? true : false}
          onChange={handleChange('username')}
        />
        <Form.Input
          label="Email"
          placeholder="Email.."
          name="email"
          type="email"
          error={errors.email ? true : false}
          onChange={handleChange('email')}
        />
        <Form.Input
          label="Password"
          placeholder="Password.."
          name="password"
          type="password"
          error={errors.password ? true : false}
          onChange={handleChange('password')}
        />
        <Form.Input
          label="Confirm Password"
          placeholder="Confirm Password.."
          name="confirmPassword"
          type="password"
          error={errors.confirmPassword ? true : false}
          onChange={handleChange('confirmPassword')}
        />

        <Button type="submit" primary>
          Next
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

export default FormUserDetails;
