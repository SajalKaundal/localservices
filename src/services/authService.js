import { auth, googleProvider } from "../config/firebase";

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  sendEmailVerification,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";

const API_URL = import.meta.env.VITE_API_URL;

const syncUserWithBackend = async ({
  uid,
  role,
  name,
  email,
  profileImage,
}) => {
  const response = await fetch(
    `${API_URL}/auth/register`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        uid,
        role,
        name,
        email,
        profileImage,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Backend sync failed"
    );
  }

  return data;
};

export const loginProvider = async (
  email,
  password
) => {
  if (!auth)
    throw new Error("Firebase not configured");

  const userCredential =
    await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

  // refresh token to get latest claims
  await userCredential.user.getIdToken(true);

  const token =
    await userCredential.user.getIdToken();

  return {
    user: userCredential.user,
    role: "provider",
    token,
  };
};

export const loginConsumer = async (
  email,
  password
) => {
  if (!auth)
    throw new Error("Firebase not configured");

  const userCredential =
    await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

  // refresh token to get latest claims
  await userCredential.user.getIdToken(true);

  const token =
    await userCredential.user.getIdToken();

  return {
    user: userCredential.user,
    role: "user",
    token,
  };
};

export const signupProvider = async (
  email,
  password,
  name
) => {
  if (!auth)
    throw new Error("Firebase not configured");

  const userCredential =
    await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

  const user = userCredential.user;

  await sendEmailVerification(user);

  // create provider in backend
  await syncUserWithBackend({
    uid: user.uid,
    role: "provider",
    name,
    email,
    profileImage: user.photoURL,
  });

  // refresh token after custom claims
  await user.getIdToken(true);

  const token = await user.getIdToken();

  return {
    user,
    role: "provider",
    token,
  };
};

export const signupConsumer = async (
  email,
  password,
  name
) => {
  if (!auth)
    throw new Error("Firebase not configured");

  const userCredential =
    await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

  const user = userCredential.user;

  await sendEmailVerification(user);

  // create user in backend
  await syncUserWithBackend({
    uid: user.uid,
    role: "user",
    name,
    email,
    profileImage: user.photoURL,
  });

  // refresh token after custom claims
  await user.getIdToken(true);

  const token = await user.getIdToken();

  return {
    user,
    role: "user",
    token,
  };
};

export const loginWithGoogle = async (
  role
) => {
  if (!auth)
    throw new Error("Firebase not configured");

  const userCredential =
    await signInWithPopup(
      auth,
      googleProvider
    );

  const user = userCredential.user;

  // sync with backend
  await syncUserWithBackend({
    uid: user.uid,
    role,
    name: user.displayName,
    email: user.email,
    profileImage: user.photoURL,
  });

  // refresh token after claims
  await user.getIdToken(true);

  const token = await user.getIdToken();

  return {
    user,
    role,
    token,
  };
};

export const resetPassword = async (
  email
) => {
  if (!auth)
    throw new Error("Firebase not configured");

  await sendPasswordResetEmail(
    auth,
    email
  );
};

export const logoutUser = async () => {
  if (auth) {
    await signOut(auth);
  }
};