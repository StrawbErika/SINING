import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  TouchableOpacity
} from 'react-native';
import ImagePicker from "react-native-image-picker";

import Classify from './Classify';

export default class App extends Component {

  state = {
    pickedImage: null,
    topArtist: null
  }

  reset = () => {
    this.setState({
      pickedImage: null
    });
  }

  pickImageHandler = () => {
    ImagePicker.showImagePicker({ title: "Pick a Painting", maxWidth: 800, maxHeight: 600 }, res => {
      if (res.didCancel) {
        console.log("User cancelled!");
      } else if (res.error) {
        console.log("Error", res.error);
      } else {
        this.setState({
          pickedImage: { uri: res.uri }
        });
      }
    });
  }

  resetHandler = () => {
    this.reset();
  }
  activateToast = () => {
    this.setState({
      topArtist: Classify.classify(this.state.pickedImage.uri)
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.getStartedContainer}>
          <Text style={styles.getStartedText}>Sining </Text>
        </View>
        <View style={styles.exitContainer}>
          <TouchableOpacity onPress={this.resetHandler}>
            <View style={styles.circleButton}>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.placeholder}>
          <Image source={this.state.pickedImage} style={styles.previewImage} />
        </View>
        <View style={styles.button}>
          <Button title="Pick Image" onPress={this.pickImageHandler} />
          {this.state.pickedImage != null && <Button title="Proceed" onPress={this.activateToast} />}


        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center"
  },
  getStartedText: {
    fontSize: 50,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 50,
    textAlign: 'center',
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
    marginTop: 80,
  },
  textStyle: {
    fontWeight: "bold",
    fontSize: 30,
    textAlign: "center",
    color: "red",
    marginTop: 10
  },
  placeholder: {
    backgroundColor: "#eee",
    width: 250,
    height: 250,
    marginTop: 30,
  },
  button: {
    width: "80%",
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "space-around"
  },
  previewImage: {
    width: "100%",
    height: "100%"
  },
  exitText: {
    alignItems: 'center',
  },
  exitContainer: {
    top: 140,
    left: 280,
    position: 'absolute',
  },
  circleButton: {
    width: 40,
    height: 40,
    borderRadius: 150 / 2,
    backgroundColor: '#00BCD4',
  }


})