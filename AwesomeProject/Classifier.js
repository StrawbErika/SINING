import React from 'react';
import {
    ProgressBarAndroid,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Linking,
} from 'react-native';
const allArtists = [["Juan Luna", 0.5, require("./assets/images/Juan_Luna.png")], ["Fernando Amorsolo", 0.3, require("./assets/images/Fernando_Amorsolo.png")], ["Carlos Francisco", 0.15, require("./assets/images/Carlos_Francisco.png")], ["Benedicto Cabrera", 0.05, require("./assets/images/Benedicto_Cabrera.png")]];
export default class ClassifiedScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };
    constructor() {
        super()

        this.state = {
            majorArtist: allArtists,
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                    <View style={styles.majorArtistContainer}>
                        <Image
                            source={this.state.majorArtist[2]}
                            style={styles.majorArtistImage}
                        />

                        <TouchableOpacity style={styles.helpLink} value={this.state.majorArtist} onPress={this._handleMajorArtistPress}>
                            <Text style={styles.helpLinkText}> {this.state.majorArtist[0]}</Text>
                        </TouchableOpacity>
                        <View style={styles.majorProgressContainer}>
                            <View>
                                <ProgressBarAndroid
                                    styleAttr="Horizontal"
                                    indeterminate={false}
                                    progress={this.state.majorArtist[1]}
                                    color="#000"
                                    style={styles.majorProgressBar}
                                />
                            </View>
                            <View >
                                <Text> {this.state.majorArtist[1] * 100}% </Text>
                            </View>
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
        marginTop: 30,
        marginBottom: 10,
        // backgroundColor: '#ff0',
    },
    majorArtistImage: {
        width: 150,
        height: 150,
        resizeMode: 'contain',
        marginTop: 3,
        marginLeft: -10,
    },
    helpLink: {
        marginVertical: 5,
    },
    helpLinkText: {
        fontSize: 20,
    },
    majorProgressContainer: {
        flex: 1,
        flexDirection: 'row',
        width: 330
    },
    majorProgressBar: {
        paddingBottom: 0,
        transform: [{ scaleY: 3.2 }],
        height: 7,
        width: 310,
        marginTop: 6,
        paddingRight: 10,
    },
    artistsProgressContainer: {
        flex: 1,
        flexDirection: 'column',
        marginLeft: 8,
    },
    artistName: {
        // backgroundColor: '#0f0',
        marginTop: 5,
        marginBottom: 32,
    },
});
