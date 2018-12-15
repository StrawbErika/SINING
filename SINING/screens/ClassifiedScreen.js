import React from 'react';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
    ProgressBarAndroid,
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

export default class ClassifiedScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };

    render() {
        return (
            <View style={styles.container}>
                <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                    <View style={styles.majorArtistContainer}>
                        <Image
                            source={require('../assets/images/jl.png')}
                            style={styles.majorArtistImage}
                        />
                        <TouchableOpacity style={styles.helpLink}>
                            <Text style={styles.helpLinkText}> Juan Luna</Text>
                        </TouchableOpacity>
                        <View style={styles.majorProgressContainer}>
                            <View>
                                <ProgressBarAndroid
                                    styleAttr="Horizontal"
                                    indeterminate={false}
                                    progress={0.5}
                                    color="#000"
                                    style={styles.majorProgressBar}
                                />
                            </View>
                            <View >
                                <Text> 50% </Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.minorArtistContainer}>
                        <View style={styles.minorArtists}>
                            <Image
                                source={require('../assets/images/jl.png')}
                                style={styles.minorArtistImage}
                            />

                            <View style={styles.artistsProgressContainer}>
                                <View style={styles.artistName}>
                                    <Text> Fernando Amorsolo </Text>
                                </View>

                                <View style={styles.minorProgressContainer}>
                                    <View>
                                        <ProgressBarAndroid
                                            styleAttr="Horizontal"
                                            indeterminate={false}
                                            progress={0.1}
                                            color="#000"
                                            style={styles.minorProgressBar}
                                        />
                                    </View>
                                    <View >
                                        <Text> 10% </Text>
                                    </View>
                                </View>

                            </View>
                        </View>

                        <View style={styles.minorArtists}>
                            <Image
                                source={require('../assets/images/jl.png')}
                                style={styles.minorArtistImage}
                            />

                            <View style={styles.artistsProgressContainer}>
                                <View style={styles.artistName}>
                                    <Text> Fernando Amorsolo </Text>
                                </View>

                                <View style={styles.minorProgressContainer}>
                                    <View>
                                        <ProgressBarAndroid
                                            styleAttr="Horizontal"
                                            indeterminate={false}
                                            progress={0.2}
                                            color="#000"
                                            style={styles.minorProgressBar}
                                        />
                                    </View>
                                    <View >
                                        <Text> 20% </Text>
                                    </View>
                                </View>

                            </View>
                        </View>

                        <View style={styles.minorArtists}>
                            <Image
                                source={require('../assets/images/jl.png')}
                                style={styles.minorArtistImage}
                            />

                            <View style={styles.artistsProgressContainer}>
                                <View style={styles.artistName}>
                                    <Text> Fernando Amorsolo </Text>
                                </View>

                                <View style={styles.minorProgressContainer}>
                                    <View>
                                        <ProgressBarAndroid
                                            styleAttr="Horizontal"
                                            indeterminate={false}
                                            progress={0.2}
                                            color="#000"
                                            style={styles.minorProgressBar}
                                        />
                                    </View>
                                    <View >
                                        <Text> 20% </Text>
                                    </View>
                                </View>

                            </View>
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
    minorArtistContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
        // backgroundColor: '#0ff',x
    },
    minorArtists: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    minorArtistImage: {
        width: 70,
        height: 70,
        resizeMode: 'contain',
        marginTop: 3,
        marginRight: 5,
        marginLeft: 15,
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
    minorProgressContainer: {
        flex: 1,
        flexDirection: 'row',
    },
    minorProgressBar: {
        paddingBottom: 0,
        transform: [{ scaleY: 3.2 }],
        height: 7,
        width: 225,
        marginTop: 6,
        paddingRight: 10,
        // backgroundColor: '#ff0',
    },
});
