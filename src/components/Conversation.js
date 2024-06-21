// src/components/Conversation.js
import React from 'react';
import './Conversation.css';

const Conversation = ({ chat, contact }) => {
  return (
    <div className="conversation">
      <div className="conversation-header">
        <img src={contact.profilePictureURL} alt={contact.name} className="profile-picture" />
        <h2>{contact.name}</h2>
      </div>
      <div className="messages">
        {chat.map((msg, index) => (
          <div key={index} className="message">
            {msg.user1 && (
              <div className="message-content user1">
                <span>{msg.user1.message}</span>
                <div className="message-timestamp">{msg.user1.timeStamp}</div>
              </div>
            )}
            {msg.you && (
              <div className="message-content you">
                <span>{msg.you.message}</span>
                <div className="message-timestamp">{msg.you.timeStamp}</div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Conversation;
