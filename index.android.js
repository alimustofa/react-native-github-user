/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  Image,
  Button,
  Alert,
  Modal,
  TouchableOpacity,
  View
} from 'react-native';

export default class githubUserApp extends Component {
  state = {
    modalVisible: false,
    found: false,
    text: '',
    ava: '',
  }

  onChangeUname = (text) => {
    this.setState({ text });
  }

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  }

  onButtonPress = () => {
    fetch(`https://api.github.com/users/${this.state.text}`)
      .then(res => res.json())
      .then(data => {
        if (!data.message) {
          this.setState({ ava: data.avatar_url, found: true });
        } else {
          this.setState({ found: false });
        }

        this.setModalVisible(true);
      })
      .catch((error) => { console.warn(error) });
  }

  render() {
    let modalContent;

    if (this.state.found) {
      modalContent = (
        <Image
          style={{width: 500, height: 500}}
          source={{ uri: this.state.ava }}
        />
      )
    } else {
      modalContent = (
        <Text>No user found</Text>
      )
    }

    return (
      <View style={styles.container}>
        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={ ()=> {}}>
            <View
              style={{
                flex: 1,
                marginTop: 22,
                justifyContent: 'center',
                alignItems: 'center'}}>
              <View>
                <Text>{modalContent}</Text>

                <TouchableOpacity onPress={() => {
                  this.setModalVisible(!this.state.modalVisible)
                }}>

                </TouchableOpacity>
                <Button
                  onPress={() => {
                    this.setModalVisible(!this.state.modalVisible)
                  }}
                  title="Close"
                />

              </View>
            </View>
        </Modal>

        <Text style={styles.welcome}>
          G I T H U B
        </Text>
        <Text style={styles.instructions}>
          Users
        </Text>
        <Image
          style={{width: 50, height: 50}}
          source={{uri: 'https://cdn4.iconfinder.com/data/icons/iconsimple-logotypes/512/github-512.png'}}
        />

        <TextInput
          value={this.state.text}
          onChangeText={ this.onChangeUname }
          style={styles.input}
        />
        <Button
          onPress={ this.onButtonPress }
          title="Search"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    padding: 10,
    margin: 10,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    marginBottom: 5,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 15,
  },
  input: {
    textAlign: 'center',
    color: '#333333',
    padding: 15,
    alignSelf: 'stretch',
    borderColor: 'black',
  },
});

AppRegistry.registerComponent('githubUserApp', () => githubUserApp);
