import React, { Component } from 'react';
import { View, Text, ImageBackground, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import Carousel, { getInputRangeFromIndexes } from 'react-native-snap-carousel';
import { BlurView } from 'react-native-blur';

import BG from '../../images/xbg1.jpg'
import styles from './styles';
import Header from '../header'
import Icon from 'react-native-vector-icons/Ionicons';

const { width, height } = Dimensions.get('window');
const containerWidth = width / 1.2;

export default class AboutUs extends Component {
    _aboutAcharya = () => {
        return (
            <ScrollView style={[styles.scrollView, { width: containerWidth }]} showsVerticalScrollIndicator={false}>
                <Text style={styles.heading}>About Acharya</Text>
                <BlurView blurType="light" style={styles.card}>
                    <Text style={styles.text}>
                        But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure? But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?
                    </Text>
                </BlurView>
            </ScrollView>
        )
    }
    _aboutHabba = () => {
        return (
            <ScrollView style={[styles.scrollView, { width: containerWidth }]} showsVerticalScrollIndicator={false}>
                <Text style={styles.heading}>About Habba</Text>
                <BlurView blurType="light" style={styles.card}>
                    <Text style={styles.text}>
                        But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure? again. But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?
                    </Text>
                </BlurView>
            </ScrollView>
        )
    }
    render() {
        return (
            <ImageBackground source={BG} style={{ height: '100%', width: '100%' }}>

                <Carousel
                    ref={(c) => { this._carousel = c; }}
                    layoutCardOffset={1}
                    style={{ height: '50%' }}
                    containerCustomStyle={{}}
                    data={[this._aboutAcharya, this._aboutHabba]}
                    // scrollInterpolator={stackScrollInterpolator}
                    // slideInterpolatedStyle={stackAnimatedStyles}
                    // useScrollView={true}
                    renderItem={
                        ({ item, index }) =>
                            item()
                    }
                    sliderWidth={width}
                    itemWidth={containerWidth}
                />
                <View style={{ paddingTop: 20, flexDirection: 'row', position: 'absolute', top: 0, width: '100%', height: 70, justifyContent: 'center' }}>
                    
                    <TouchableOpacity
                        onPress={() => { this.props.navigation.goBack() }}
                        style={{ flex: 1, alignSelf: 'stretch', alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{ flex: 1, justifyContent: 'center' }}>
                            <Icon name='ios-arrow-back' style={{ color: 'white', fontSize: 25 }} />
                        </View>
                    </TouchableOpacity>
                    <View style={{flex: 5}} />
                    <View style={{flex: 1}} />
                </View>
            </ImageBackground>
        )
    }
}