import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Button,
    TouchableOpacity,
} from 'react-native';
import ImagePicker from "react-native-image-picker";
import { Thread } from 'react-native-threads';

import Classifier from './Classifier';
import Classify from './Classify';
import Loading from './Loading';

export default class HomePage extends Component {

    state = {
        pickedImage: null,
        topArtist: null,
        isLoading: false
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
        console.log("YEs the code changed")
        this.setState({
            isLoading: true
        }, async () => {
            this.setState({
                topArtist: await Classify.classify(this.state.pickedImage.uri),
                // topArtist: 'amorsolo'
            })
        })
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
                    <TouchableOpacity onPress={this.pickImageHandler}>
                        <View style={styles.buttonTouchable}>
                            <Text style={styles.buttonText}> Pick Image</Text>
                        </View>
                    </TouchableOpacity>
                    {
                        this.state.pickedImage != null &&

                        <TouchableOpacity onPress={this.activateToast}>
                            <View style={styles.buttonTouchable}>
                                <Text style={styles.buttonText}> Proceed</Text>
                            </View>

                        </TouchableOpacity>
                    }
                </View>
                <View style={styles.exitContainer}>
                    <TouchableOpacity onPress={this.resetHandler}>
                        <View style={styles.circleButton}>
                            <Text style={styles.exitText}> x </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                {
                    this.state.isLoading && <Loading />
                }
                {this.state.topArtist != null && <Classifier />}
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
        justifyContent: "space-around",
    },
    buttonTouchable: {
        alignItems: 'center',
        width: 100,
        backgroundColor: '#00BCD4',
        borderRadius: 50,
        height: 40
    },
    buttonText: {
        marginTop: 10,
        color: 'white',
        fontSize: 15,
    },
    previewImage: {
        width: "100%",
        height: "100%"
    },
    exitText: {
        marginTop: 5,
        color: 'white',
        fontSize: 15,
    },
    exitContainer: {
        top: 140,
        left: 290,
        position: 'absolute',
    },
    circleButton: {
        alignItems: 'center',
        width: 30,
        height: 30,
        borderRadius: 150 / 2,
        backgroundColor: '#00BCD4',
    }


})