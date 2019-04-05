import React, { Component } from 'react';
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Dimensions,
    Linking
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
        // console.log(finalArray)
        this.state = {
            // majorArtist: allArtists[this.getArtistIndex(this.props.artist, allArtists)],
            majorArtist: finalArray[0],
            minorArtists: finalArray.slice(1)
            // majorArtist: allArtists[0],
            // minorArtists: allArtists.slice(1)

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
            wholeArray.push({ artist: array[i], count: parseInt(array[i + 1], 10) })
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
        const url = ('https://en.wikipedia.org/wiki/'.concat(this.state.majorArtist[3]))
        Linking.openURL(url).catch((err) => console.error('An error occurred', err));
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
                    <View style={styles.minorArtistContainer}>
                        {
                            this.state.minorArtists.map((artistList, index) => {
                                return (
                                    <View style={styles.artistContainer} key={index}>
                                        <Image
                                            source={artistList[1]}
                                            style={styles.minorArtistImage}
                                        />
                                        <View>
                                            <Text style={styles.artistText} > {artistList[0]}</Text>
                                            <Text style={styles.numberText} > {artistList[4]}/9</Text>
                                        </View>
                                    </View>

                                )
                            })
                        }
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
        marginTop: 50,
        // marginBottom: 10,
        // backgroundColor: '#0ff',
    },
    majorArtistImageContainer: {
        width: 300,
        resizeMode: 'contain',
        alignItems: 'center',
        // backgroundColor: '#0f0',
    },
    majorArtistImage: {
        width: 170,
        height: 170,
        resizeMode: 'contain',
        marginTop: 3,
        // marginLeft: -10,
    },
    results: {
        fontFamily: "AnjelScript",
        fontSize: 80,
        lineHeight: 80,
        color: '#00BCD4',
        marginLeft: 70,
        marginTop: 60
    },
    helpLink: {
        marginVertical: 5,
    },
    helpLinkText: {
        fontSize: 45,
        fontFamily: "AnjelScript",
        color: '#00BCD4',
    },
    backText: {
        fontSize: 20,
        position: 'absolute',
        marginTop: 20,
        marginLeft: 25
    },
    minorArtistImage: {
        width: 80,
        height: 80,
        resizeMode: 'contain',
        marginTop: 10,
        // marginLeft: -10,
    },
    minorArtistContainer: {
        width: Dimensions.get('window').width,
        resizeMode: 'contain',
        // alignItems: 'center',
        marginLeft: 30,
    },
    artistContainer: {
        flex: 1,
        flexDirection: 'row'
    },
    artistText: {
        fontFamily: "CaviarDreams",
        fontSize: 20,
        marginTop: 15
    },
    numberText: {
        fontFamily: "CaviarDreams",
        fontSize: 20,
        marginTop: 10
    }
});
