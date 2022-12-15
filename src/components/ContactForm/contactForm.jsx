import React, { Component } from 'react';
import { Form, FormLabel, FormInput } from './contactForm.styled';
import Button from '../Button/button';

class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  handleChange = e => {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value });
  };

  resetForm = () => {
    this.setState({
      name: '',
      number: '',
    });
  };

  handleAddContact = event => {
    event.preventDefault();

    this.props.onSubmit(this.state);
    // console.log(this.state);
    this.resetForm();

  };

  render() {
    return (
      <Form onSubmit={this.handleAddContact}>
        <FormLabel>
          Name
          <FormInput
            value={this.state.name}
            onChange={this.handleChange}
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            placeholder="Enter name"
          />
        </FormLabel>
        <FormLabel>
          Number
          <FormInput
            value={this.state.number}
            onChange={this.handleChange}
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            placeholder="Enter phone number"
          />
        </FormLabel>
        <Button type="submit">Add contact</Button>
      </Form>
    );
  }
}

export default ContactForm;
