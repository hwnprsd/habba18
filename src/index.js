import React, { Component } from 'react';
import {
    View,
    Text,
    Button,
    Animated,
    PanResponder
} from 'react-native';
import { fonts } from './constants';
import { observer, inject } from 'mobx-react/native';
import { SkypeIndicator } from 'react-native-indicators';
import Auth from './components/auth';
import CategoryList from './components/category-list';
import EventList from './components/event-list';
import Timeline from './components/timeline';
import Meme from './components/meme'
import { StackNavigator } from 'react-navigation';

import { height, width } from './constants'
const MainStack = StackNavigator({
    Timeline: { screen: Timeline },
    CategoryList: { screen: CategoryList },
    Meme: { screen: Meme },
    EventList: { screen: EventList },
}, {
        headerMode: 'none'
    })


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


@inject('authStore') @observer
export default class App extends Component {
    state = {
        animatedValueX: 0,
        animatedVelocity: 0
    }
    render() {
        const style = { position: 'absolute', width, height, justifyContent: 'flex-start', zIndex: 5, backgroundColor: 'blue', alignItems: 'center', justifyContent: 'center' }
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
                <View style={{ flex: 1, backgroundColor: 'red' }}>
                </View>

                <Animated.View
                    style={[style, animatedStyle]}
                    {...this._panResponder.panHandlers}
                >
                </Animated.View>
            </View>
        )
    }
    componentWillMount = () => {
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