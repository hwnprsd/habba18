import React, { Component } from 'react';
import { View, Text, Button, ImageBackground, ScrollView, FlatList, Image, Animated, TouchableOpacity } from 'react-native';
import LottieView from 'lottie-react-native';
import { BlurView } from 'react-native-blur'
import Icon from 'react-native-vector-icons/Ionicons';

import BG from '../../images/xbg1.jpg'
import styles from './styles';

const img = 'http://www.scaryforkids.com/pics/look-at-me.jpg';
const devs = [
    {
        name: 'Chirag DK',
        branch: 'CSE',
        designation: 'Android developer',
        gmail: 'chiragsastry@gmail.com',
        phone: '12345',
        image: require('../../images/devs/Chirag.jpg')
    }, {
        name: 'Aditya Das',
        branch: 'CSE',
        designation: 'Android developer',
        gmail: 'aditya.das8.ad@gmail.com',
        phone: '12345',
        image: require('../../images/devs/Adi.jpg')
    }, {
        name: 'Prateek Hegde',
        branch: 'Mechatronics',
        designation: 'Web developer',
        gmail: 'prateekhegde12@gmail.com',
        image: require('../../images/devs/Prateek.jpg'),
        phone: '12345',
    },{
        name: 'Arjun M',
        branch: 'CSE',
        designation: 'Motion graphic designer',
        gmail: 'arjunptm@gmail.com',
        image: require('../../images/devs/Arjun.jpg'),
        phone: '12345',
    },{
        name: 'Ashwin Prasad',
        branch: 'ISE',
        designation: 'React Native developer',
        gmail: 'd3fkonmusic@gmail.com',
        image: require('../../images/devs/Ashwin.jpg'),
        phone: '12345',
    },{
        name: 'Ankur Vinekar',
        branch: 'CSE',
        designation: 'UI/UX developer',
        gmail: 'ankurvinekar@gmail.com',
        image: require('../../images/devs/Ankur.jpg'),
        phone: '12345',
    },{
        name: 'Raghav CS',
        branch: 'ISE',
        designation: 'Android developer',
        gmail: 'csraghav7@gmail.com',
        image: require('../../images/devs/Raghav.jpg'),
        phone: '12345',
    },{
        name: 'Rajat Porwal',
        branch: 'ISE',
        designation: 'Android developer',
        image: require('../../images/devs/Rajat.jpg'),
        gmail: 'rajat.beis.15@acharya.ac.in',
        phone: '12345',
    },{
        name: 'Ananth N Bhat',
        branch: 'CSE',
        designation: 'Web developer',
        image: require('../../images/devs/Bhatta.jpg'),
        gmail: 'ananth.becs.14@acharya.ac.in',
        phone: '12345',
    },{
        name: 'Prashanth P',
        branch: 'ISE',
        designation: 'Web developer',
        image: require('../../images/devs/Prashanth.jpg'),
        gmail: 'ananth.becs.14@acharya.ac.in',
        phone: '12345',
    }]

export default class Auth extends Component {
    componentDidMount() {
        this.reactAnim.play();
    }
    _animatedValue = new Animated.Value(0);
    _renderItem = ({ item }) => (
        <BlurView blurType="light" style={styles.card}>
            <Image source={item.image} style={styles.img} />
            <View style={styles.textCol}>
                <Text style={[styles.text, styles.name]}>{item.name}</Text>
                <Text style={styles.text}>{item.designation}</Text>
                <Text style={styles.text}>{item.branch}</Text>
            </View>
        </BlurView>
    )
    onScroll = Animated.event([{
        nativeEvent: {
            contentOffset: {
                y: this._animatedValue
            }
        }
    }]);
    render() {
        const interpolatedValue = this._animatedValue.interpolate({
            inputRange: [0, 100, 150],
            outputRange: [0, 0, 1],
            extrapolate: 'clamp'
        })
        return (
            <ImageBackground source={BG} style={{ width: '100%', height: '100%' }}>
                <FlatList
                    style={styles.scrollView}
                    ListHeaderComponent={() => <Text style={styles.heading}>Devs</Text>}
                    ListFooterComponent={this._footerComponent}
                    data={devs}
                    keyExtractor={(_, i) => i}
                    renderItem={this._renderItem}
                    onScroll={this.onScroll}
                />
                <View style={{ paddingTop: 20, flexDirection: 'row', position: 'absolute', top: 0, width: '100%', height: 70, justifyContent: 'center' }}>
                    <TouchableOpacity
                        onPress={() => { this.props.navigation.goBack() }}
                        style={{ flex: 1, alignSelf: 'stretch', alignItems: 'center', justifyContent: 'center' }}>
                        <Animated.View style={{ flex: 1, justifyContent: 'center', opacity: (1 - interpolatedValue) }}>
                            <Icon name='ios-arrow-back' style={{ color: 'white', fontSize: 25 }} />
                        </Animated.View>
                    </TouchableOpacity>
                    <View style={{ flex: 5, alignItems: 'center', justifyContent: 'center' }}>
                        <Animated.View style={{ opacity: interpolatedValue }}>
                        </Animated.View>
                    </View>
                    <View style={{ flex: 1 }} />
                </View>
                <Animated.View style={{ position: 'absolute', top: 0, width: '100%', height: 70, opacity: interpolatedValue }}>
                    <BlurView style={{ paddingTop: 20, flexDirection: 'row', position: 'absolute', top: 0, width: '100%', height: 70, justifyContent: 'center' }}>
                        <TouchableOpacity
                            onPress={() => { this.props.navigation.goBack() }}
                            style={{ flex: 1, alignSelf: 'stretch', alignItems: 'center', justifyContent: 'center' }}>
                            <View style={{ flex: 1, justifyContent: 'center' }}>
                                <Icon name='ios-arrow-back' style={{ color: 'white', fontSize: 25 }} />
                            </View>
                        </TouchableOpacity>
                        <View style={{ flex: 5, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={styles.eventName}>Developers</Text>
                        </View>
                        <View style={{ flex: 1 }} />
                    </BlurView>
                </Animated.View>
            </ImageBackground>
        )
    }
    _footerComponent = () => (
        <View style={{ flexDirection: 'column', alignItems: 'center', marginTop: 10 }}>
            <BlurView blurType="light" style={styles.logoCard}>

                <LottieView
                    ref={animation => {
                        this.reactAnim = animation;
                    }}
                    source={require('./lottie/react.json')}
                    style={{ height: 100, width: 100, alignSelf: 'center' }}
                    loop
                />
            </BlurView>
            <Text style={[{ textAlign: 'center' }, styles.text]}>Powered by React Native</Text>
            <Text style={[{ textAlign: 'center' }, styles.text, styles.text2]}>Habba 2018 iOS 1.02</Text>
        </View>
    )
}

