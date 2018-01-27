import React, { Component } from 'react';
import {
    View,
    Text,
    Button,
    Animated,
    PanResponder,
    TouchableOpacity
} from 'react-native';
import { fonts, height, width } from '../../constants';
import { observer, inject } from 'mobx-react/native';
import ElevatedView from 'react-native-elevated-view'

import styles from './styles';

let navigate


const helper = (x, v) => {
    if (v > 0) {
        if (x > 300)
            return 300;
        if (x < 0)
            return 0;
        if (x > 0)
            return 300;
    }
    if (v < 0) {
        if (x < -300)
            return -300;
        if (x < 0)
            return -300;
        if (x > 0)
            return 0
    }
    if (v === 0) {
        if (x < -300)
            return -300;
        if (x > 300)
            return 300;
    }
    return 0;
}

const AnimatedElevatedView = Animated.createAnimatedComponent(ElevatedView);

const Item = (props) => {
    const { text, right, nav } = props;
    return (
        <TouchableOpacity style={styles.itemContainer}>
            <Text
                style={[styles.itemText, { textAlign: right ? 'right' : 'left' }]}
                onPress={nav && (() => navigate(nav))}
            >{text}
            </Text>
        </TouchableOpacity>
    )
}


const List = () => {
    return (
        <View style={{ flex: 2, flexDirection: 'row' }}>
            <View style={{ flex: 3 }}>
                <View style={{ flex: 1 }}></View>
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <View style={{ justifyContent: 'space-around', paddingLeft: 10 }}>
                        <Item text="Feed" nav="Feed" />
                        <Item text="Events" nav="CategoryList" />
                        <Item text="Register" />
                        <Item text="Maps" />
                        <Item text="Timeline" nav="Timeline" />
                    </View>
                </View>
                <View style={{ flex: 1 }}></View>
            </View>
            <View style={{ flex: 3 }}>
                <View style={{ flex: 1 }}></View>
                <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center' }}>
                    <View style={{ justifyContent: 'space-around', paddingRight: 10 }}>
                        <Item text="Gallery" right nav="Gallery" />
                        <Item text="Notifications" right />
                        <Item text="About us" right />
                        <Item text="Devs" right/>
                        <Item text="Logout" right />
                    </View>

                </View>
                <View style={{ flex: 1 }}></View>
            </View>

        </View>
    )
}

export default class ResideMenu extends Component {
    state = {
        animatedValueX: 0,
        animatedVelocity: 0
    }
    render() {
        const style = { width, height, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }
        // const animatedStyle = { transform: this.animatedValue.getTranslateTransform() }
        const animatedStyle = {
            transform: [
                {
                    translateX: this.animatedValue.x.interpolate({
                        inputRange: [-200, -50, 0, 50, 200],
                        outputRange: [-60, 0, 0, 0, 60]
                    })
                },
                {
                    scale: this.animatedValue.x.interpolate({
                        inputRange: [-200, -50, 0, 50, 200],
                        outputRange: [0.8, 1, 1, 1, 0.8]
                    })
                }
            ]
        }

        return (
            <View style={{ flex: 1, flexDirection: 'row' }}>
                <View style={{ flex: 1, backgroundColor: '#e2e1e0' }}>
                    <List />
                </View>
                <AnimatedElevatedView
                    elevation={7}
                    style={[animatedStyle, style, { position: 'absolute' }]}
                    {...this._panResponder.panHandlers}
                >
                    <Text>AHASHASH</Text>
                </AnimatedElevatedView>
            </View>
        )
    }
    componentWillMount = () => {
        navigate = this.props.navigation.navigate
        this.animatedValue = new Animated.ValueXY();
        this.animatedValue.x.addListener(v => { this.state.animatedValueX = v.value });
        this._panResponder = PanResponder.create({
            // Ask to be the responder:
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

            onPanResponderGrant: (evt, gestureState) => {
                this.animatedValue.setOffset({ x: this.state.animatedValueX });
                this.animatedValue.setValue({ x: 0, y: 0 }); //Initial value
            },
            onPanResponderMove: Animated.event([
                null,
                { dx: this.animatedValue.x, vx: this.state.animatedVelocity }
            ]),
            onPanResponderTerminationRequest: (evt, gestureState) => true,
            onPanResponderRelease: (evt, gestureState) => {
                Animated.parallel([
                    Animated.spring(this.animatedValue.x, {
                        toValue: helper(parseInt(this.state.animatedValueX), parseFloat(gestureState.vx)),
                        useNativeDriver: true
                    })
                ]).start()
                this.animatedValue.flattenOffset();


            },
            onPanResponderTerminate: (evt, gestureState) => {
            },
            onShouldBlockNativeResponder: (evt, gestureState) => {
                return true;
            },
        });
    };


}