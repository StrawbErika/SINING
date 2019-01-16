import Camera from 'react-native-camera';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  CameraRoll,
  PermissionsAndroid
} from 'react-native';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  state = {
    photos: []
  }
  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.getStartedContainer}>
            <Text style={styles.getStartedText}>
              Sining!
            </Text>
          </View>

          <View style={styles.getStartedContainerButtons}>
            <Button
              buttonStyle={{
                backgroundColor: "rgba(92, 99,216, 1)",
                width: 250,
                height: 45,
                borderColor: "transparent",
                borderWidth: 0,
                borderRadius: 5
              }}
              containerStyle={{ marginTop: 30 }}
              icon={
                <Icon
                  name='arrow-right'
                  size={15}
                  color='white'
                />
              }
              onPress={this.takePicture}

              title='Camera'
            /
            >
            <Camera
              ref={(cam) => {
                this.camera = cam;
              }}
              style={styles.preview}>
              <Text style={styles.capture} onPress={this.takePicture.bind(this)}>[CAPTURE]</Text>
            </Camera>
            <Button
              buttonStyle={{
                backgroundColor: "rgba(92, 99,216, 1)",
                width: 250,
                height: 45,
                borderColor: "transparent",
                borderWidth: 0,
                borderRadius: 5
              }}
              containerStyle={{ marginTop: 10 }}
              icon={
                <Icon
                  name='arrow-right'
                  size={15}
                  color='white'
                />
              }
              onPress={this._handleButtonPress}
              title='Gallery'
            />
            <ScrollView>
              {this.state.photos.map((p, i) => {
                return (
                  <Image
                    key={i}
                    style={{
                      width: 300,
                      height: 100,
                    }}
                    source={{ uri: p.node.image.uri }}
                  />
                );
              })}
            </ScrollView>

          </View>

        </ScrollView>

      </View>
    );
  }
  takePicture() {
    const options = {};
    //options.location = ...
    this.camera.capture({ metadata: options })
      .then((data) => console.log(data))
      .catch(err => console.error(err));
  }
  _handleButtonPress = async () => {
    console.log('hey')
    try {
      console.log('heyy')

      const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          'title': 'Photos Permission',
          'message': 'Cool Photo App needs access to your camera so you can take awesome pictures.'
        }
      )

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        alert("You can use the camera")
        CameraRoll.getPhotos({
          first: 20,
          assetType: 'Photos',
        })
          .then(r => {
            this.setState({ photos: r.edges });
            console.log('somethin')
          })
          .catch((err) => {
            console.log("noop")
            console.log(err)
            //Error Loading Images
          });
      } else {
        alert("Camera permission denied")
      }
    } catch (err) {
      console.warn(err)
    }




  };


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
    marginTop: 150,
    backgroundColor: '#fff',
  },
  getStartedContainerButtons: {
    alignItems: 'center',
  },
  getStartedText: {
    fontSize: 50,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 50,
    textAlign: 'center',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
  }
});
