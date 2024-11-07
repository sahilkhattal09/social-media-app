import React, { useState } from "react";
import { auth } from "../../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PasswordStrengthMeter from "../PasswordStrengthMeter"; // Import the PasswordStrengthMeter

interface AuthComponentProps {
  mode?: "signin" | "signup";
}

const AuthComponent: React.FC<AuthComponentProps> = ({ mode = "signin" }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [authMode, setAuthMode] = useState<"signin" | "signup">(mode);
  const provider = new GoogleAuthProvider();

  const handleAuth = async () => {
    if (authMode === "signup" && password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      if (authMode === "signup") {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        console.log("Signup successful:", userCredential.user);
        toast.success("Signup successful!");
      } else {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        console.log("Sign in successful:", userCredential.user);
        toast.success("Sign in successful!");
      }
    } catch (error) {
      console.error(`Error during ${authMode}:`, error);
      toast.error(`Error during ${authMode}`);
    }
  };

  const handleGoogleSignin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("Google sign in successful:", result.user);
      toast.success("Google sign in successful!");
    } catch (error) {
      console.error("Error with Google sign in:", error);
      toast.error("Error with Google sign in");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-md rounded-lg p-10 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-8">
          {authMode === "signup" ? "Sign Up" : "Sign In"}
        </h2>

        {authMode === "signup" && (
          <>
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </>
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={`w-full px-4 py-2 ${
            authMode === "signin" ? "mb-4" : "mb-2"
          } border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
        />

        {/* Password Strength Meter only in signup mode */}
        {authMode === "signup" && (
          <div className="mb-4">
            <PasswordStrengthMeter password={password} />
          </div>
        )}

        {authMode === "signup" && (
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-2 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        )}

        <button
          onClick={handleAuth}
          className="w-full bg-blue-500 text-white py-3 rounded-lg mb-6 hover:bg-blue-600 transition-colors"
        >
          {authMode === "signup" ? "Sign Up" : "Sign In"}
        </button>

        {authMode === "signin" && (
          <button
            onClick={handleGoogleSignin}
            className="w-full bg-red-500 text-white py-3 rounded-lg mb-4 hover:bg-red-600 transition-colors"
          >
            Sign in with Google
          </button>
        )}

        <p className="text-center mt-6">
          {authMode === "signin"
            ? "Don't have an account?"
            : "Already have an account?"}{" "}
          <button
            onClick={() =>
              setAuthMode(authMode === "signin" ? "signup" : "signin")
            }
            className="text-blue-500 hover:underline"
          >
            {authMode === "signin" ? "Sign Up" : "Sign In"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthComponent;
