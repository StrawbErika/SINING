import React, { Component } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Linking,
} from 'react-native';
const allArtists = [["Juan Luna", require("./assets/images/Juan_Luna.png"), "luna"], ["Fernando Amorsolo", require("./assets/images/Fernando_Amorsolo.png"), "amorsolo"], ["Carlos Francisco", require("./assets/images/Carlos_Francisco.png"), "francisco"], ["Benedicto Cabrera", require("./assets/images/Benedicto_Cabrera.png"), "cabrera"]];
export default class App extends Component {
  static navigationOptions = {
    header: null,
  };
  constructor() {
    super()
    this.state = {
      majorArtist: allArtists[0],
    }
  }

  // reset = (props) => {
  // }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View>
            <TouchableOpacity style={styles.helpLink} value={this.state.majorArtist} onPress={this._handleMajorArtistPress}>
              <Text style={styles.backText}> Back </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.majorArtistContainer}>
            <View style={styles.majorArtistImageContainer}>
              <Image
                source={this.state.majorArtist[1]}
                style={styles.majorArtistImage}
              />
              <TouchableOpacity style={styles.helpLink} value={this.state.majorArtist} onPress={this._handleMajorArtistPress}>
                <Text style={styles.helpLinkText}> {this.state.majorArtist[0]}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View >
    );
  }
}
_handleMajorArtistPress = (e) => {
  Linking.openURL('https://google.com')
  // console.log("HEY")
  // WebBrowser.openBrowserAsync(
  //     'https://en.wikipedia.org/wiki/Juan_Luna'
  // );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  majorArtistContainer: {
    alignItems: 'center',
    marginTop: 85,
    marginBottom: 10,
    // backgroundColor: '#0ff',
  },
  majorArtistImageContainer: {
    width: 300,
    resizeMode: 'contain',
    alignItems: 'center',
    // backgroundColor: '#0f0',
  },
  majorArtistImage: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
    marginTop: 3,
    // marginLeft: -10,
  },
  helpLink: {
    marginVertical: 20,
  },
  helpLinkText: {
    fontSize: 30,
  },
  backText: {
    fontSize: 20,
    marginLeft: 20
  },
});
