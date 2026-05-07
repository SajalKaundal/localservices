import { auth } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";

export const waitForAuth = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe();

      if (user) {
        resolve(user);
      } else {
        reject(new Error("User not authenticated"));
      }
    });
  });
};
export const getToken = async () => {
  const user = auth.currentUser || (await waitForAuth());

  return await user.getIdToken(true);
};
