import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm/contactForm';
import ContactList from './ContactList/contactList';
import Filter from './Filter/filter';
import { GlobalStyle } from './GlobalStyle';
import { Phonebook, MainTitle, ContactTitle } from './Layout';
import { Notify } from 'notiflix';

Notify.init({ position: 'center-top' });

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const storageContacts = localStorage.getItem('Contacts');
    const parsedStorageContacts = JSON.parse(storageContacts);

    if (parsedStorageContacts) {
      this.setState({ contacts: parsedStorageContacts });
    }
  }

  componentDidUpdate(ptrevState) {
    if (this.state.contacts !== ptrevState.contacts) {
      localStorage.setItem('Contacts', JSON.stringify(this.state.contacts));
    }
  }

  addContact = ({ name, number }) => {
    if (this.handleChekUnique(name)) {
      const contact = {
        id: nanoid(),
        name,
        number,
      };

      this.setState(({ contacts }) => ({
        contacts: [contact, ...contacts],
      }));
    }
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  contactFilter = event => {
    this.setState({ filter: event.currentTarget.value });
  };

  getFilteredContacts = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  handleChekUnique = name => {
    const { contacts } = this.state;
    // console.log(this.state);
    const isExistContact = !!contacts.find(contact => contact.name === name);
    isExistContact && Notify.warning(name + ' is already in contacts');
    return !isExistContact;
  };

  render() {
    const { contacts, filter } = this.state;

    const filteredContacts = this.getFilteredContacts();

    return (
      <Phonebook>
        <MainTitle>Phonebook</MainTitle>
        <ContactForm onSubmit={this.addContact} />
        <ContactTitle>Contacts</ContactTitle>
        {contacts.length > 0 && (
          <>
            <Filter value={filter} onChange={this.contactFilter} />
            <ContactList
              contacts={filteredContacts}
              onDeleteContact={this.deleteContact}
            />
          </>
        )}
        <GlobalStyle />
      </Phonebook>
    );
  }
}
