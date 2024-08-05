import React, { useState, useEffect, useRef } from 'react';
import { db, auth } from '../firebase';
import { collection, onSnapshot, query, orderBy, limit, startAfter, getDocs } from 'firebase/firestore';
import SendMessage from './SendMessage';
import SignOut from './SignOut';

function Chat() {
  const scroll = useRef(null);
  const [messages, setMessages] = useState([]);
  const [hasMoreMessages, setHasMoreMessages] = useState(true);
  const [error, setError] = useState(null);
  const [lastVisibleMessage, setLastVisibleMessage] = useState(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const q = query(
          collection(db, 'messages'),
          orderBy('createdAt'),
          limit(50),
          lastVisibleMessage ? startAfter(lastVisibleMessage) : null
        );
        const snapshot = await getDocs(q);

        const newMessages = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMessages((prevMessages) => [...prevMessages, ...newMessages]);
        setHasMoreMessages(snapshot.size === 50);

        if (snapshot.size) {
          setLastVisibleMessage(snapshot.docs[snapshot.docs.length - 1]);
        } else {
          setHasMoreMessages(false);
        }
      } catch (error) {
        console.error('Error fetching messages:', error);
        setError(error.message);
      }
    };

    fetchMessages();

    // Implement additional logic to handle scrolling and fetching new messages
    // ...

    return () => {
      // Clean up any event listeners or subscriptions
    };
  }, []);

  const handleSendMessage = (newMessage) => {
    // Implement logic to send the message to Firestore
    // ...

    // Update local messages state (optional, depending on implementation)
    setMessages([...messages, newMessage]); // Consider security here before updating state
  };

  return (
    <div>
      <SignOut />
      <div className="msgs">
        {error ? (
          <p>Error: {error}</p>
        ) : messages.length === 0 ? (
          <p>No messages yet</p>
        ) : (
          messages.map(({ id, text, photoURL, uid }) => (
            <div key={id} className={`msg ${uid === auth.currentUser.uid ? 'sent' : 'received'}`}>
              <img src={photoURL} alt="" />
              <p>{/* Sanitize or validate text before rendering */}</p>
            </div>
          ))
        )}
      </div>
      <SendMessage scroll={scroll} onSendMessage={handleSendMessage} />
      <div ref={scroll}></div>
    </div>
  );
}

export default Chat;
