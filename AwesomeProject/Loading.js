import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Dimensions
} from 'react-native';

export default class Loading extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.getStartedText}>
                    Sining </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        backgroundColor: '#00BCD4',
        position: "absolute"
    },
    getStartedText: {
        width: "100%",
        fontFamily: "AnjelScript",
        marginLeft: 20,
        marginTop: 220,
        fontSize: 100,
        lineHeight: 100,
        textAlign: 'center',
        color: '#ffff',
    },
})