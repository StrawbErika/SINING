import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button
} from 'react-native';
import ImagePicker from "react-native-image-picker";


export default class App extends Component {

  state = {
    pickedImage: null
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
        console.log('heyyyy')
        this.setState({
          pickedImage: { uri: res.uri }
        });
        console.log(this.state.pickedImage)

      }
    });
  }

  resetHandler = () => {
    this.reset();
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.getStartedContainer}>
          <Text style={styles.getStartedText}>Sining </Text>
        </View>
        <View style={styles.placeholder}>
          <Image source={this.state.pickedImage} style={styles.previewImage} />
        </View>
        <View style={styles.button}>

          <Button title="Pick Image" onPress={this.pickImageHandler} />

          <Button title="Reset" onPress={this.resetHandler} />

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


})