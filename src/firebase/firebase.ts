import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import { store } from "@/store/store";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

const login = async (email: string, password: string): Promise<void> => {
  try {
    const auth = getAuth();
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    if (user) await store.dispatch("login", user);
  } catch (error: any) {
    console.log(`CODE: ${error.code}\nERROR: ${error.message}`);
  }
};

const logout = async (): Promise<void> => {
  await store.dispatch("logout");
};

export { login, logout };

// TODO fix .env in production