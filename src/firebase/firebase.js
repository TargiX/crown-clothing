import * as firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyDulQ2hFOFKVeSU-AmR0UTHp4jv-BRq-nY',
  authDomain: 'crown-db-f8f82.firebaseapp.com',
  databaseURL: 'https://crown-db-f8f82.firebaseio.com',
  projectId: 'crown-db-f8f82',
  storageBucket: '',
  messagingSenderId: '1024109403481',
  appId: '1:1024109403481:web:20ad3fcfd54ce23c4d4048'
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();

export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();

provider.setCustomParameters({ promt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
