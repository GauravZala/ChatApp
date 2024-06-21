// src/components/ContactList.js
import React from 'react';
import './ContactList.css';

const ContactList = ({ contacts, selectContact, openModal }) => {
  return (
    <div className="contact-list">
      {contacts.map(contact => (
        <div key={contact.userId} className="contact-item" onClick={() => selectContact(contact.userId)}>
          <img src={contact.profilePictureURL} alt={contact.name} className="profile-picture" />
          <div className="contact-info">
            <div className="contact-name">{contact.name}</div>
            <div className="contact-message">{contact.chat[contact.chat.length - 1].user1 ? contact.chat[contact.chat.length - 1].user1.message : contact.chat[contact.chat.length - 1].you.message}</div>
          </div>
          {contact.unreadCount > 0 && <div className="unread-count">{contact.unreadCount}</div>}
          <button className="options-button" onClick={(e) => { e.stopPropagation(); openModal(contact.userId); }}>...</button>
        </div>
      ))}
    </div>
  );
};

export default ContactList;
