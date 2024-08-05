import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD9RFzFJBy29NChPm6rUwLl29g97LD2YO4",
  authDomain: "lab04-71bef.firebaseapp.com",
  projectId: "lab04-71bef",
  storageBucket: "lab04-71bef.appspot.com",
  messagingSenderId: "113378713907",
  appId: "1:113378713907:web:474af1fc47fd2cdb9e5e46"
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export { firestore };