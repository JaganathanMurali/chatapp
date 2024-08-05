import React, { useState } from 'react';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

function SignIn() {
  const [error, setError] = useState(null);

  const auth = getAuth();

  const handleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      // Handle successful sign-in (e.g., redirect to another page, update user state)
      console.log(result.user);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <button onClick={handleSignIn}>Sign in with Google</button>
      {error && <p>{error}</p>}
    </div>
  );
}

export default SignIn;
