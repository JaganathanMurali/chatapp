import React, { useState } from 'react';
import { db, auth } from '../firebase';
import { FieldValue } from 'firebase/firestore'; // Import FieldValue

function SendMessage({ scroll }) {
  const [msg, setMsg] = useState('');

  async function sendMessage(e) {
    e.preventDefault();
    const { uid, photoURL } = auth.currentUser;

    await db.collection('messages').add({
      text: msg,
      photoURL,
      uid,
      createdAt: FieldValue.serverTimestamp(), // Use FieldValue.serverTimestamp
    });
    setMsg('');
    scroll.current.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <div>
      <form onSubmit={sendMessage}>
        <div className="sendMsg">
          <input
            style={{
              width: '78%',
              fontSize: '15px',
              fontWeight: '550',
              marginLeft: '5px',
              marginBottom: '-3px',
              padding: '10px',
              borderRadius: '5px',
              border: '1px solid #ccc',
            }}
            placeholder="Message..."
            type="text"
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
          />
          <button
            style={{
              width: '18%',
              fontSize: '15px',
              fontWeight: '550',
              margin: '4px 5% -13px 5%',
              padding: '10px',
              borderRadius: '5px',
              backgroundColor: '#4CAF50',
              color: 'white',
              cursor: 'pointer',
            }}
            type="submit"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}

export default SendMessage;
