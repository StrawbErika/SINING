import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import React from 'react';
// import BadInstagramCloneApp from './BadInstagramCloneApp';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>


          <View style={styles.getStartedContainer}>
            <Text style={styles.getStartedText}>
              Sining!
            </Text>
          </View>
          {/* <BadInstagramCloneApp /> */}

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
              title='Camera'
            /
            >

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
              title='Gallery'
            />

          </View>

        </ScrollView>

      </View>
    );
  }
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

});
