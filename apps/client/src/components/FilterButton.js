import React, { useState } from 'react';
import { Button, Form, Modal } from 'semantic-ui-react';
import { useForm } from '../util/hooks';
import categories from '../util/categories';


function FilterButton(props) {
    const [modalOpen, setModalOpen] = useState(false);
    // const [category, setCategory] = useState('');

    const updateFiltersCallback = () => {
        props.setFilters(values);
        props.refetch()
    }


    const { values, onChange, onSubmit } = useForm(updateFiltersCallback, {
        seller: '',
        category: ''

      });

    const updateCategoryCallback = (e, {value}) => {
        // e.persist();
        // console.log(e.target.textContent);
        values.category = value
    };


    return (
    <div>
        <Button
            color="blue"
            onClick={() => setModalOpen(true)}
        >
            Filter
        </Button>
        <Form onSubmit = {onSubmit}>

        <Modal
        open={modalOpen}
        onClose = {() => setModalOpen(false)}
        onOpen = {() => setModalOpen(true)}
        >
                <Modal.Header>Filters</Modal.Header>
                <Modal.Content>
                        <Modal.Description>
                        
                            <Form.Field>
                                <p>Who are you looking for?</p>
                                <Form.Input
                                placeholder="Seller*"
                                name="seller"
                                value={values.seller}
                                onChange={onChange}
                                />
                                {/* <Button type="submit" color="teal">
                                Submit
                                </Button> */}
                            </Form.Field>

                                                    
                            <p>Select the category</p>
                            <Form.Select
                                name="category"
                                onChange={updateCategoryCallback}
                                placeholder='Select the category'
                                options={categories}
                            />

                        </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button
                        onClick={onSubmit}
                        color = 'blue'
                        content = "Apply Filters"
                        type = "submit"
                    > 
                    </Button>
                </Modal.Actions>
        </Modal>
        </Form>

    </div>
    );
}


export default FilterButton;
