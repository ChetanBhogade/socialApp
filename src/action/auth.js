import auth from '@react-native-firebase/auth';
import Snackbar from 'react-native-snackbar';
import database from '@react-native-firebase/database';

export const signUp = data => async dispatch => {
  console.log('SignUp Data: - ', data);
  const {name, instaUsername, bio, email, password, country, image} = data;

  auth()
    .createUserWithEmailAndPassword(email, password)
    .then(data => {
      console.log('Signup Data After: - ', data);
      console.log('User creation was success');

      database()
        .ref('/users/' + data.user.uid)
        .set({
          name,
          instaUsername,
          country,
          image,
          bio,
          uid: data.user.uid,
        })
        .then(() => {
          console.log('Data Set Success');
        });
      Snackbar.show({
        text: 'Account Created',
        textColor: 'white',
        backgroundColor: '#1b262c',
      });
    })
    .catch(error => {
      console.error('Error: - ', error);
      Snackbar.show({
        text: 'Sign Up Failed',
        textColor: 'white',
        backgroundColor: 'red',
      });
    });
};

export const signIn = data => async dispatch => {
  console.log('Sign In: -', data);
  const {email, password} = data;

  auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      console.log('Success SignIn');
      Snackbar.show({
        text: 'Account Sign In',
        textColor: 'white',
        backgroundColor: '#1b262c',
      });
    })
    .catch(error => {
      console.log('Error: - ', error);
      Snackbar.show({
        text: 'Sign In Failed!',
        textColor: 'white',
        backgroundColor: 'red',
      });
    });
};

export const signOut = () => async dispatch => {
  auth()
    .signOut()
    .then(() => {
      Snackbar.show({
        text: 'Sign Out Success',
        textColor: 'white',
        backgroundColor: '#1b262c',
      });
    })
    .catch(error => {
      console.log('Error: - ', error);
      Snackbar.show({
        text: 'Sign Out failed',
        textColor: 'white',
        backgroundColor: 'red',
      });
    });
};
