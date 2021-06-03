import React, {useState} from 'react';
import {StyleSheet, View, ScrollView, TouchableOpacity} from 'react-native';

import {
  Container,
  Form,
  Item,
  Input,
  Text,
  Button,
  Thumbnail,
  Content,
} from 'native-base';

import storage from '@react-native-firebase/storage';
import ProgressBar from 'react-native-progress/Bar';

import ImagePicker from 'react-native-image-picker';

import {options} from '../utils/Options';

import propTypes from 'prop-types';
import {signUp} from '../action/auth';
import {connect} from 'react-redux';

const SignUp = ({signUp}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [instaUsername, setInstaUsername] = useState('');
  const [country, setCountry] = useState('');
  const [bio, setBio] = useState('');
  const [image, setImage] = useState(
    'https://firebase.google.com/downloads/brand-guidelines/PNG/logo-logomark.png',
  );
  const [imageUploading, setImageUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);

  const chooseImage = async () => {
    ImagePicker.launchCamera(options, response => {
      console.log('Image Picker response: - ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('Image Picker Image: - ', response.errorCode);
      } else if (response.errorMessage) {
        console.log('User errorMessage: - ', response.errorMessage);
      } else {
        const source = {uri: response.assets};
        console.log('Image Source: - ', source, ' all response: - ', response);
        uploadImage(response);
      }
    });
  };

  const uploadImage = async response => {
    setImageUploading(true);
    const reference = storage().ref(response.filename);

    const task = reference.putFile(response.path);
    task.on('state_changed', taskSnapshot => {
      const percentage =
        (taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 1000;
      setUploadStatus(percentage);
    });
    task.then(async () => {
      const url = await reference.getDownloadURL();

      setImage(url);
      setImageUploading(false);
    });
  };

  const doSignUp = async () => {
    signUp({name, instaUsername, bio, country, email, password, image});
  };

  return (
    <Container style={styles.container}>
      <Content padder>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <View style={styles.imageContainer}>
            <TouchableOpacity onPress={chooseImage}>
              <Thumbnail large source={{uri: image}} />
            </TouchableOpacity>
          </View>

          {imageUploading && (
            <ProgressBar progress={uploadStatus} style={styles.progress} />
          )}

          <Form>
            <Item regular style={styles.formItem}>
              <Input
                placeholder="name"
                value={name}
                style={{color: '#eee'}}
                onChangeText={text => setName(text)}
              />
            </Item>
            <Item regular style={styles.formItem}>
              <Input
                placeholder="email"
                value={email}
                style={{color: '#eee'}}
                onChangeText={text => setEmail(text)}
              />
            </Item>
            <Item regular style={styles.formItem}>
              <Input
                placeholder="password"
                value={password}
                secureTextEntry={true}
                style={{color: '#eee'}}
                onChangeText={text => setPassword(text)}
              />
            </Item>
            <Item regular style={styles.formItem}>
              <Input
                placeholder="Instagram user name"
                value={instaUsername}
                style={{color: '#eee'}}
                onChangeText={text => setInstaUsername(text)}
              />
            </Item>
            <Item regular style={styles.formItem}>
              <Input
                placeholder="Your Short Bio"
                value={bio}
                style={{color: '#eee'}}
                onChangeText={text => setBio(text)}
              />
            </Item>
            <Item regular style={styles.formItem}>
              <Input
                placeholder="country"
                value={country}
                style={{color: '#eee'}}
                onChangeText={text => setCountry(text)}
              />
            </Item>
            <Button regular block onPress={doSignUp}>
              <Text>SignUp</Text>
            </Button>
          </Form>
        </ScrollView>
      </Content>
    </Container>
  );
};

SignUp.propTypes = {
  signUp: propTypes.func.isRequired,
};

const mapDispatchToProps = {
  signUp: data => signUp(data),
};

export default connect(null, mapDispatchToProps)(SignUp);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1b262c',
    flex: 1,
    justifyContent: 'flex-start',
  },
  imageContainer: {
    alignItems: 'center',
    marginVertical: 5,
  },
  progress: {width: null, marginBottom: 20},
  formItem: {
    marginBottom: 20,
  },
});
