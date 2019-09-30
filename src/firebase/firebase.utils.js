import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
  apiKey: 'AIzaSyD8noYSF0kBzT57ZoJ6k8KKF_j0axQNUsY',
  authDomain: 'crwn-db-70af5.firebaseapp.com',
  databaseURL: 'https://crwn-db-70af5.firebaseio.com',
  projectId: 'crwn-db-70af5',
  storageBucket: '',
  messagingSenderId: '236021296614',
  appId: '1:236021296614:web:be0b2ce50b3a6bd5ce3a27'
}

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return

  const userRef = firestore.doc(`users/${userAuth.uid}`)

  const snapShot = await userRef.get()

  if (!snapShot.exists) {
    const { displayName, email } = userAuth
    const createdAt = new Date()

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (error) {
      console.log('error creating users', error.message)
    }
  }
  return userRef
}

firebase.initializeApp(config)

export const auth = firebase.auth()
export const firestore = firebase.firestore()

const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({ prompt: 'select_account' })
export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase
