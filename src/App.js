// src/App.js
import React, { useState } from 'react';
import ContactList from './components/ContactList';
import Conversation from './components/Conversation';
import Modal from './components/Modal';
import './App.css';

const initialData = [
  {
    userId: 'user1',
    name: 'Sam',
    unreadCount: 1,
    profilePictureURL:
      'https://www.pexels.com/photo/portrait-photo-of-smiling-man-with-his-arms-crossed-standing-in-front-of-a-wall-2379004/',
    chat: [
      { user1: { message: 'Hello', timeStamp: '10:40' }, you: { message: 'Hey', timeStamp: '10:41' } },
      { user1: { message: 'How are you doing?', timeStamp: '10:41' }, you: { message: 'Fine mate, how about you?', timeStamp: '10:42' } },
      { user1: { message: 'great', timeStamp: '10:44' }, you: { message: "Coming to my wedding right? I don't think you confirmed.", timeStamp: '10:44' } },
      { user1: { message: 'Oh yes. There is no way i am going to miss that.', timeStamp: '10:44' }, you: { message: 'Awesome. See ya there. Let me know if you want me to book tickets.', timeStamp: '10:45' } }
    ]
  },
  {
    userId: 'user2',
    name: 'Elon',
    unreadCount: 0,
    profilePictureURL:
      'https://www.pexels.com/photo/man-in-brown-polo-shirt-614810/',
    chat: [
      { user1: { message: 'there?', timeStamp: '11:39' }, you: { message: 'yeah, whats up?', timeStamp: '11:47' } },
      { user1: { message: 'movie tomorrow?', timeStamp: '11:49' }, you: { message: 'Yeah sure. let me know the timings. and which movie again?', timeStamp: '11:52' } },
      { user1: { message: 'the new mad max movie. Reviews are great.', timeStamp: '11:52' }, you: { message: 'Oh yes, i have been waiting for that one.', timeStamp: '11:54' } }
    ]
  },
  {
    userId: 'user3',
    name: 'Kate',
    unreadCount: 1,
    profilePictureURL:
      'https://www.pexels.com/photo/closeup-photo-of-woman-with-brown-coat-and-gray-top-733872/',
    chat: [
      { user1: { message: 'that burger was delicious!', timeStamp: '13:12' }, you: { message: 'Oh yes, no doubt.', timeStamp: '13:13' } },
      { user1: { message: 'We are definetely going to that place again.', timeStamp: '13:13' }, you: { message: 'we are. My mouth waters whenever drive thorugh that area', timeStamp: '13:14' } },
      { user1: { message: 'haha, I bet. Lets take Tony and Natasha too next time', timeStamp: '13:14' }, you: { message: 'Sure. they would love it', timeStamp: '13:15' } }
    ]
  }
];

const App = () => {
  const [contacts, setContacts] = useState(initialData);
  const [selectedContact, setSelectedContact] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContact, setModalContact] = useState(null);

  const selectContact = (userId) => {
    const contact = contacts.find(contact => contact.userId === userId);
    if (contact) {
      setSelectedContact(contact);
      setContacts(contacts.map(c => c.userId === userId ? { ...c, unreadCount: 0 } : c));
    }
  };

  const openModal = (userId) => {
    const contact = contacts.find(contact => contact.userId === userId);
    if (contact) {
      setModalContact(contact);
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContact(null);
  };

  const markAsUnread = () => {
    if (modalContact) {
      setContacts(contacts.map(c => c.userId === modalContact.userId ? { ...c, unreadCount: 1 } : c));
    }
    closeModal();
  };

  const deleteConversation = () => {
    if (modalContact) {
      setContacts(contacts.filter(c => c.userId !== modalContact.userId));
      if (selectedContact && selectedContact.userId === modalContact.userId) {
        setSelectedContact(null);
      }
    }
    closeModal();
  };

  return (
    <div className="app">
      <ContactList contacts={contacts} selectContact={selectContact} openModal={openModal} />
      {selectedContact && <Conversation chat={selectedContact.chat} contact={selectedContact} />}
      <Modal isOpen={isModalOpen} onClose={closeModal} onMarkUnread={markAsUnread} onDelete={deleteConversation} />
    </div>
  );
};

export default App;
