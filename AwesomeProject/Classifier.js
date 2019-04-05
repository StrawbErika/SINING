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
import { Icon } from 'react-native-elements'
import { Actions } from 'react-native-router-flux';

const allArtists = [["Juan Luna", require("./assets/images/Juan_Luna.png"), "luna", "Juan_Luna"], ["Fernando Amorsolo", require("./assets/images/Fernando_Amorsolo.png"), "amorsolo", "Fernando_Amorsolo"], ["Carlos Francisco", require("./assets/images/Carlos_Francisco.png"), "francisco", "Botong_Francisco"], ["Benedicto Cabrera", require("./assets/images/Benedicto_Cabrera.png"), "cabrera", "Benedicto_Cabrera"]];
export default class Classifier extends Component {
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props)
        const finalArray = this.splitString(this.props.artist)
        console.log(finalArray)
        this.state = {
            // majorArtist: allArtists[this.getArtistIndex(this.props.artist, allArtists)],
            majorArtist: finalArray[0],
        }
    }

    getArtistIndex = (artist, list) => {
        output = 0
        for (i = 0; i < list.length; i++) {
            if (list[i][2] === artist) {
                output = i
            }
        }
        return (output)
    }
    splitString = (string) => {
        var array = string.split(" ")
        var wholeArray = []
        for (var i = 0; i < array.length; i = i + 2) {
            if (parseInt(array[i + 1], 10) != 0) {
                wholeArray.push({ artist: array[i], count: parseInt(array[i + 1], 10) })
            }
        }
        wholeArray.sort((a, b) => (a.count < b.count) ? 1 : -1)
        return this.mergeList(wholeArray, allArtists)
    }
    mergeList = (obj, list) => {
        var official = []
        for (var j = 0; j < obj.length; j = j + 1) {
            for (var i = 0; i < list.length; i = i + 1) {
                if (list[i][2] == obj[j].artist) {
                    list[i].push(obj[j].count)
                    official.push(list[i])
                }
            }
        }                //2
        return official
    }
    handleClick = () => {
        this.splitString(this.props.artist)
        // const url = ('https://en.wikipedia.org/wiki/'.concat(this.state.majorArtist[3]))
        // Linking.openURL(url).catch((err) => console.error('An error occurred', err));
    }
    render() {
        const goToHomePage = () => {
            Actions.homePage({ load: false })
        }
        return (
            <View style={styles.container}>

                <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                    <View style={styles.backText} >
                        <TouchableOpacity onPress={goToHomePage}>
                            <Icon size={30} name="left" color='#00BCD4' type="antdesign" />
                        </TouchableOpacity>
                    </View>
                    <View>
                        <Text style={styles.results}> Artist</Text>
                    </View>
                    <View style={styles.majorArtistContainer}>
                        <View style={styles.majorArtistImageContainer}>
                            <Image
                                source={this.state.majorArtist[1]}
                                style={styles.majorArtistImage}
                            />
                            <TouchableOpacity style={styles.helpLink} value={this.state.majorArtist[3]} onPress={this.handleClick}>
                                <Text style={styles.helpLinkText}> {this.state.majorArtist[0]}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </View >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    majorArtistContainer: {
        alignItems: 'center',
        marginTop: -10,
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
    results: {
        fontFamily: "AnjelScript",
        fontSize: 100,
        lineHeight: 100,
        color: '#00BCD4',
        marginLeft: 25,
        marginTop: 80
    },
    helpLink: {
        marginVertical: 10,
    },
    helpLinkText: {
        fontSize: 30,
    },
    backText: {
        fontSize: 20,
        position: 'absolute',
        marginTop: 30,
        marginLeft: 25
    },
});
