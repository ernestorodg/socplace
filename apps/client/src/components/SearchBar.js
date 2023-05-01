import React from 'react'
import { Form } from 'semantic-ui-react';
import { useForm } from '../util/hooks';
import { useHistory } from 'react-router-dom'


function SearchBar(props) {
    const history = useHistory()

    const updateFiltersCallback = () => {
        props.setFilters({title: values.title});
        props.refetch()
        history.push('/')
    }

    const { values, onChange, onSubmit } = useForm(updateFiltersCallback, {
        title: ''
      });

    return (
    <div>
        <Form onSubmit = {onSubmit}>
          <Form.Field>
              <Form.Input
                name="title"
                // iconPosition="right"
                icon='search' 
                value={values.title}
                onChange={onChange}>
              </Form.Input>
          </Form.Field>

        </Form>
    </div>
    );
}
export default SearchBar;
