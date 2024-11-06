import React, { useState } from "react";
import { auth } from "../../config/firebase";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

const AuthComponent: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const provider = new GoogleAuthProvider();

  // Sign Up with Email and Password
  const handleEmailSignup = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("Signup successful:", userCredential.user);
      alert("Signup successful!");
    } catch (error) {
      console.error("Error during sign up:", error);
    }
  };

  // Sign In with Email and Password
  const handleEmailSignin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("Sign in successful:", userCredential.user);
      alert("Sign in successful!");
    } catch (error) {
      console.error("Error during sign in:", error);
    }
  };

  // Sign In/Sign Up with Google
  const handleGoogleSignin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("Google sign in successful:", result.user);
      alert("Google sign in successful!");
    } catch (error) {
      console.error("Error with Google sign in:", error);
    }
  };

  return (
    <div>
      <h2>Email Sign Up</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleEmailSignup}>Sign Up</button>
      <button onClick={handleEmailSignin}>Sign In</button>

      <h2>Or Sign In with Google</h2>
      <button onClick={handleGoogleSignin}>Sign In with Google</button>
    </div>
  );
};

export default AuthComponent;
