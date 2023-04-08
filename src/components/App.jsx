import React, { Component } from 'react';
import Phonebook from './Phonebook/Phonebook';
import { nanoid } from 'nanoid';
import { Filter } from './Filter/Filter';
import { Contacts } from './Contacts/Contacts';
import { MainContainer, Title } from './App.style';
class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  reviseExistName = person => {
    return this.state.contacts.some(
      contact => contact.name.toLowerCase() === person.toLowerCase()
    );
  };

  addContact = ({ name, number }) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    };

    if (this.reviseExistName(name)) {
      return alert(`Sorry, but ${contact.name} is already in contacts`);
    }

    this.setState(prevState => ({
      contacts: [contact, ...prevState.contacts],
    }));
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  filterContacts = () => {
    const normalizeFilter = this.state.filter.toLowerCase();

    return this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizeFilter)
    );
  };

  removeContact = id => {
    this.setState(({ contacts }) => {
      return {
        contacts: contacts.filter(contact => contact.id !== id),
      };
    });
  };

  render() {
    const filterContacts = this.filterContacts();

    return (
      <MainContainer>
        <Title>Phonebook</Title>
        <Phonebook onSubmitAccept={this.addContact} />
        <Title>Contacts</Title>
        <Filter value={this.state.filter} onChange={this.changeFilter} />
        <Contacts contacts={filterContacts} receiveID={this.removeContact} />
      </MainContainer>
    );
  }
}

export default App;
