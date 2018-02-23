import React, { Component } from 'react';
import { StatusBar, StyleSheet, View, Platform, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors } from '../../constants'

class Constants {
    static AppbarHeight = Platform.OS === 'ios' ? 43 : 50;
    static StatusbarHeight = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
    static HeaderHeight = this.AppbarHeight + this.StatusbarHeight;
}

export default class Navbar extends Component {
    state = {
        lastLeftPress: 0,
    };
    _iconSize = 25;
    _renderLeft = (color) => {
        let { left } = this.props;
        if (!left)
            return (<View />);
        return (
            <TouchableOpacity
                onPress={() => { left.action ? left.action() : false }}
                style={{ flex: 1, alignSelf: 'stretch', alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <Icon name={left.name} style={{ color, fontSize: this._iconSize }} />
                </View>
            </TouchableOpacity>
        )
    };
    _renderRight = (color) => {
        let { right } = this.props;
        if (!right)
            return (<View />);
        return (
            <TouchableOpacity underlayColor={'rgba(1,1,1,0.1)'} onPress={() => {
                right.action ? right.action() : false
            }} style={{ flex: 1, alignSelf: 'stretch', alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <Icon name={right.name} style={{ color, fontSize: this._iconSize }} />
                </View>
            </TouchableOpacity>
        )
    };

    render() {
        return (
            <View style={{backgroundColor: this.props.color || colors.primaryDark}}>
                <View style={[styles.container, {marginTop:this.props.collapsable? 0: Constants.StatusbarHeight}]}>
                    <View style={styles.left}>
                        {this._renderLeft("#fff")}
                    </View>
                    <View style={styles.body}>
                        <Text style={{
                            fontFamily: 'Lato-Light',
                            textAlign: 'center',
                            fontSize: 24,
                            color: "#fff"
                        }}>{this.props.title}</Text>
                    </View>
                    <View style={styles.right}>
                        {this._renderRight("#fff")}
                    </View>
                </View>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    layout: {
        backgroundColor: colors.primaryDark
    },
    container: {
        height: Constants.AppbarHeight,
        flexDirection: 'row',
    },
    left: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    body: {
        flex: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    right: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
})