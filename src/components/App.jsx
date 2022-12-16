import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm/contactForm';
import ContactList from './ContactList/contactList';
import Filter from './Filter/filter';
import { GlobalStyle } from './GlobalStyle';
import { Phonebook, MainTitle, ContactTitle } from './Layout';
import { Notify } from 'notiflix';

Notify.init({ position: 'center-top' });

export default function App() {
  const [contactArr, setContacts] = useState(() => {
    return JSON.parse(window.localStorage.getItem('contacts')) ?? [];
  });

  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contactArr));
  }, [contactArr]);

  const addContact = ({ name, number }) => {
    if (handleChekUnique(name)) {
      const newContact = {
        id: nanoid(),
        name,
        number,
      };
      setContacts(prevValue => [...prevValue, newContact]);
    }
  };

  const deleteContact = contactId => {
    setContacts(contactArr.filter(contact => contact.id !== contactId));
  };

  const contactFilter = event => {
    setFilter(event.target.value);
  };

  const getFilteredContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contactArr.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const handleChekUnique = name => {
    const isExistContact = !!contactArr.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
    isExistContact && Notify.warning(name + ' is already in contacts');
    return !isExistContact;
  };

  return (
    <Phonebook>
      <MainTitle>Phonebook</MainTitle>
      <ContactForm onSubmit={addContact} />
      <ContactTitle>Contacts</ContactTitle>
      {contactArr.length > 0 && (
        <>
          <Filter value={filter} onChange={contactFilter} />
          <ContactList
            contacts={getFilteredContacts()}
            onDeleteContact={deleteContact}
          />
        </>
      )}
      <GlobalStyle />
    </Phonebook>
  );
}
