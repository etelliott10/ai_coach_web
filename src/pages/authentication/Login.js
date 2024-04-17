import React from 'react';
import { GoogleLogin } from 'react-google-login';

const clientId = 'YOUR_CLIENT_ID';

const GoogleAuth = () => {
  const onSuccess = async (response) => {
    const { tokenId } = response;
    // Send tokenId to your backend
    try {
      const res = await fetch('/api/google-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tokenId }),
      });
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const onFailure = (error) => {
    console.error('Google sign-in failed:', error);
  };

  return (
    <GoogleLogin
      clientId={clientId}
      buttonText="Sign in with Google"
      onSuccess={onSuccess}
      onFailure={onFailure}
      cookiePolicy={'single_host_origin'}
    />
  );
};

export default GoogleAuth;
