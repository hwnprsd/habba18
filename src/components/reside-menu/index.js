import React, { Component } from 'react';
import {
    View,
    Text,
    Button,
    Animated,
    PanResponder,
    TouchableOpacity,
    ImageBackground,
    TouchableWithoutFeedback,
    Dimensions,
    StatusBar,
    Easing
} from 'react-native';
import { fonts, backgroundImage } from '../../constants';
import { observer, inject } from 'mobx-react/native';
import ElevatedView from 'react-native-elevated-view'
import BG from '../../images/xred.jpg'

import styles from './styles';

let navigate

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



export default class ResideMenu extends Component {
    state = {
        animatedValueX: 0,
        animatedVelocity: 0,
        resideState: 0,
        height: Dimensions.get("window").height,
        width: Dimensions.get("window").width
    }
    handler = dims => this.setState(dims.window);
    List = () => {
        const { width, height } = this.state;
        return (
            <ImageBackground source={BG} style={{ width, height }} resizeMode={'cover'}>
                <StatusBar translucent backgroundColor='rgba(0,0,0,0)' />
                <View style={{ flex: 2, flexDirection: 'row' }}>
                    <View style={{ flex: 3 }}>
                        <View style={{ flex: 1 }}></View>
                        <View style={{ flex: 1, justifyContent: 'center' }}>
                            <View style={{ justifyContent: 'space-around', paddingLeft: 10 }}>
                                <Item text="Feed" nav="Feed" />
                                <Item text="Events" nav="CategoryList" />
                                <Item text="Register" nav="Register" />
                                <Item text="Maps" nav="Maps" />
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
                                <Item text="Notifications" right nav="Notification" />
                                <Item text="About us" right />
                                <Item text="Devs" right />
                                <Item text="Logout" right />
                            </View>

                        </View>
                        <View style={{ flex: 1 }}></View>
                    </View>

                </View>
            </ImageBackground>
        )
    }
    render() {
        const { width, height } = this.state;
        const style = {
            width, height, alignItems: 'center', justifyContent: 'center', 
            shadowOpacity: 0.3,
            shadowRadius: 20,
            shadowColor: 'rgba(0,0,0,0.7)',
            backgroundColor: 'rgba(0,0,0,0.1)',
        }
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
                    <this.List />
                </View>
                <Animated.View
                    style={[animatedStyle, style, { position: 'absolute' }]}
                    {...this._panResponder.panHandlers}
                >
                    <ImageBackground source={BG} style={style} resizeMode={'cover'}>
                        <View>
                            <Text>AHASHASH</Text>
                        </View>
                    </ImageBackground>
                </Animated.View>
            </View>
        )
    }

    _resetReside = () => {
        Animated.spring(this.animatedValue.x, {
            toValue: 0,
            useNativeDriver: true
        }).start()
    }
    _helper = (x, v) => {
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
            if (this.state.resideState === 0)
                return 300
            else
                return 0
        }
        return 0;
    }
    _stateHelper = (x, v) => {
        let resideState = this._helper(x, v);
        this.setState({
            resideState
        });
        return resideState;
    }
    componentWillMount = () => {
        Dimensions.addEventListener("change", this.handler);
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
                Animated.sequence([
                    // Animated.decay(this.animatedValue.x, {
                    //     velocity:  gestureState.vx, // velocity from gesture release
                    //     deceleration: 0.997,
                    //     useNativeDriver: true
                    // }),
                    Animated.spring(this.animatedValue.x, {
                        velocity: gestureState.vx,
                        overshootClamping: true,
                        toValue: this._stateHelper(parseInt(this.state.animatedValueX), parseFloat(gestureState.vx)),
                        useNativeDriver: true,
                        easing: Easing.linear
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
    componentWillUnmount() {
        Dimensions.removeEventListener("change", this.handler);
        this.animatedValue.x.removeAllListeners();


    }
}