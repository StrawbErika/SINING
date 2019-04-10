import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import { Icon } from 'react-native-elements'
import ImagePicker from "react-native-image-picker";
import { Thread } from 'react-native-threads';
import { Actions } from 'react-native-router-flux';

import Classify from './Classify';
import Loading from './Loading';


export default class HomePage extends Component {

    state = {
        topArtist: null,
        pickedImage: null,
        isLoading: this.props.load,
        proceedShow: false,
        showButton: true
    }

    performTimeConsumingTask = async () => {
        return new Promise((resolve) =>
            setTimeout(
                () => { resolve('result') },
                // 100
                3500
            )
        );
    }
    async componentDidMount() {
        const data = await this.performTimeConsumingTask();

        if (data !== null) {
            this.setState({ isLoading: false });
        }
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
                    pickedImage: { uri: res.uri },
                    proceedShow: true
                });
            }
        });
    }
    goToHomePage = () => {
        Actions.classifier({ artist: this.state.topArtist._55 })
        this.setState({
            isVisible: true,
        })

    }
    resetHandler = () => {
        this.reset();
    }
    activateToast = () => {
        this.setState({
            topArtist: Classify.classify(this.state.pickedImage.uri),
            isVisible: true,
            showButton: false
        })
    }
    setModalVisible(visible) {
        this.setState({ isVisible: visible });
    }
    render() {
        if (this.state.isLoading) {
            return <Loading />;
        }
        return (
            <View style={styles.container}>
                <View style={styles.getStartedContainer}>
                    <Text style={styles.getStartedText}>Sining </Text>
                </View>
                <View style={styles.placeholder}>
                    <Image source={this.state.pickedImage} style={styles.previewImage} />
                </View>
                {this.state.showButton &&
                    <View style={styles.button}>
                        <TouchableOpacity onPress={this.pickImageHandler}>
                            {/* <TouchableOpacity onPress={this.goToHomePage}> */}
                            <View style={styles.buttonTouchable}>
                                <Text style={styles.buttonText}> Pick Image</Text>
                            </View>
                        </TouchableOpacity>
                        {
                            this.state.proceedShow &&

                            <TouchableOpacity onPress={this.activateToast}>
                                <View style={styles.buttonTouchable}>
                                    <Text style={styles.buttonText}> Proceed</Text>
                                </View>
                            </TouchableOpacity>
                        }
                    </View>
                }
                <View style={styles.exitContainer}>
                    <TouchableOpacity onPress={this.resetHandler}>
                        <View style={styles.circleButton}>
                            <View style={styles.icon}>
                                <Icon color="white" size={17} name="delete" type="antdesign" />
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
                {this.state.topArtist != null &&
                    <View style={styles.button}>
                        <TouchableOpacity onPress={this.goToHomePage}>
                            <View style={styles.resultsTouchable}>
                                <Text style={styles.buttonText}> Results </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        backgroundColor: '#ffff',
        height: Dimensions.get('window').height,
    },
    getStartedText: {
        fontFamily: "AnjelScript",
        fontSize: 100,
        color: 'rgba(96,100,109, 1)',
        lineHeight: 100,
        textAlign: 'center',
        color: '#00BCD4',
    },
    getStartedContainer: {
        width: "100%",
        alignItems: 'center',
        marginLeft: 45,
        marginTop: 80,
    },
    placeholder: {
        backgroundColor: "#eee",
        width: 250,
        height: 250,
        marginTop: 0,
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
        fontFamily: "CaviarDreams",
        marginTop: 10,
        color: 'white',
        fontSize: 15,
    },
    previewImage: {
        width: "100%",
        height: "100%"
    },
    exitContainer: {
        top: 170,
        left: 290,
        position: 'absolute',
    },
    icon: {
        marginTop: 5
    },
    circleButton: {
        alignItems: 'center',
        width: 30,
        height: 30,
        borderRadius: 150 / 2,
        backgroundColor: '#00BCD4',
    },
    resultsTouchable: {
        alignItems: 'center',
        width: 100,
        backgroundColor: '#00BCD4',
        borderRadius: 50,
        height: 40
    }

})