import { auth, googleProvider } from '../config/firebase';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signInWithPopup, 
  sendEmailVerification, 
  sendPasswordResetEmail,
  signOut
} from 'firebase/auth';

// TODO: Replace these Firebase calls with your backend API calls when ready
// e.g., axios.post('/api/auth/provider/login', { email, password })

export const loginProvider = async (email, password) => {
  if (!auth) throw new Error('Firebase not configured');
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  const token = await userCredential.user.getIdToken();
  return { user: userCredential.user, role: 'provider', token };
};

export const loginConsumer = async (email, password) => {
  if (!auth) throw new Error('Firebase not configured');
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  const token = await userCredential.user.getIdToken();
  return { user: userCredential.user, role: 'consumer', token };
};

export const signupProvider = async (email, password, name) => {
  if (!auth) throw new Error('Firebase not configured');
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  await sendEmailVerification(userCredential.user);
  const token = await userCredential.user.getIdToken();
  return { user: userCredential.user, role: 'provider', token };
};

export const signupConsumer = async (email, password, name) => {
  if (!auth) throw new Error('Firebase not configured');
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  await sendEmailVerification(userCredential.user);
  const token = await userCredential.user.getIdToken();
  return { user: userCredential.user, role: 'consumer', token };
};

export const loginWithGoogle = async (role) => {
  if (!auth) throw new Error('Firebase not configured');
  const userCredential = await signInWithPopup(auth, googleProvider);
  const token = await userCredential.user.getIdToken();
  return { user: userCredential.user, role, token };
};

export const resetPassword = async (email) => {
  if (!auth) throw new Error('Firebase not configured');
  await sendPasswordResetEmail(auth, email);
};

export const logoutUser = async () => {
  if (auth) {
    await signOut(auth);
  }
};
