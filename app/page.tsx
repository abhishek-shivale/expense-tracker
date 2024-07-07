"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";

export default function Home() {
  const { data: session, status } = useSession();
  const [error, setError] = useState('');

  const handleSignIn = async () => {
    try {
      setError(''); // Clear any previous errors
      await signIn();
    } catch (error:any) {
      if (error.error === 'OAuthAccountNotLinked') {
        setError('To confirm your identity, sign in with the same account you used originally.');
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    }
  };

  return (
    <main>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {session?.user ? (
        <>
          <div
            onClick={() => {
              signOut();
            }}
          >
            Logout
          </div>
        </>
      ) : (
        <>
          <div
            onClick={handleSignIn}
          >
            Login
          </div>
        </>
      )}
    </main>
  );
}
