import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Body, Right, Button, Icon, Title, Text, Header} from 'native-base';

import {connect} from 'react-redux';
import propTypes from 'prop-types';
import {signOut} from '../action/auth';

const CustomHeader = ({signOut, authState, navigation}) => {
  return (
    <Header
      androidStatusBarColor="#0f4c7f"
      style={{backgroundColor: '#0f4c7f'}}>
      <Body>
        <Title>Social App</Title>
      </Body>
      <Right>
        {authState.isAuthenticated && (
          <>
            <Button
              transparent
              iconLeft
              onPress={() => {
                console.log("Add post clicked")
                navigation.navigate('AddPost');
              }}>
              <Text style={{color: '#fdcb9e'}}>Add Post</Text>
            </Button>
            <Button
              transparent
              iconLeft
              onPress={() => {
                signOut();
              }}>
              <Icon name="log-out-outline" style={{color: 'red'}} />
            </Button>
          </>
        )}
      </Right>
    </Header>
  );
};

CustomHeader.propTypes = {
  signOut: propTypes.func.isRequired,
  authState: propTypes.object.isRequired,
};

const mapStateToProps = state => ({
  authState: state.auth,
});

const mapDispatchToProps = {
  signOut,
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomHeader);

const styles = StyleSheet.create({});
