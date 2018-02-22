import React, { Component } from 'react';
import {
    View,
    Text,
    ImageBackground,
    Dimensions,
    FlatList,
    TouchableOpacity,
    StatusBar,
    Animated
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { BlurView } from 'react-native-blur';
import Icon from 'react-native-vector-icons/Ionicons';

import BG from '../../images/xbg1.jpg'
import styles from './styles';
import Header from '../header'

const { width, height } = Dimensions.get('window');
const containerWidth = width / 1.1;
const aboutUs = `

     About

    ￼

    " Nurturing Aspirations Supporting Growth "

    The Sanskrit word "Acharya", which means "TEACHER", epitomizes the quintessential values of our institution, where traditional respect for teachers is of paramount importance. At our 28th year, we at Acharya Institutes, Bangalore are proud to be the choice of students from around the world.

    Growing Stature of Acharya

     120 acres of WiFi Campus
     13 Educational Institutions
     15 research centers
     Nearly 100 programs in over 50 Academic Streams
     Over 12,000 students for 70 countries
     1000+ teaching, technical and administration staff
     Affiliated to VTU, BU, RGUHS and KSLU
     Approved by AICTE, Council of Architecture, KSNC, INC, NCTE, PCI and Bar Council of India
     NBA, NAAC accredited
     Technical and Academic association with leading industry and corporate
     Collaboration with many academic and research organizations

    We are –
    A student centric campus that attracts over 4000 aspiring youth each year from across the globe.
    We have –
    An atmosphere of academic excellence that draws best teaching faculty into it
    We instill –
    Time tested values in grooming youth into responsible human beings
    We create –
    An encouraging and competitive environment that enables academic growth 

    Our Motto
    "Nurturing Aspirations Supporting Growth"

    Our Vision
    "Acharya Institutes, Committed to the cause of value-based education in all disciplines, envisions itself as a fountainhead of innovative human enterprise, with inspirational initiatives for Academic Excellence"
`;
const aboutHabba = `
Acharya Habba is the annual techno-cultural fest organised by Acharya Institutes, Bangalore. Spanning over a duration of a month, it draws about 25,000+ students from more than 300 colleges across Karnataka
`
export default class AboutUs extends Component {
    _animatedValue = new Animated.Value(0);
    _aboutAcharya = () => {
        return (
            <FlatList onScroll={this.onScroll} style={[styles.scrollView, { width: containerWidth }]} showsVerticalScrollIndicator={false}
                data={[1]}
                keyExtractor={() => 1}
                renderItem={() => (
                    <View>
                        <Text style={styles.heading}>About Acharya</Text>
                        <BlurView blurType="light" style={styles.card}>
                            <Text style={styles.text}>
                                {aboutUs}
                            </Text>
                        </BlurView>
                    </View>
                )}
            />
        )
    }
    _aboutHabba = () => {
        return (
            <FlatList onScroll={this.onScroll} style={[styles.scrollView, { width: containerWidth }]} showsVerticalScrollIndicator={false}
                data={[1]}
                keyExtractor={() => 1}
                renderItem={() => (
                    <View>
                        <Text style={styles.heading}>About Habba</Text>
                        <BlurView blurType="light" style={styles.card}>
                            <Text style={styles.text}>
                                {aboutHabba}
                            </Text>
                        </BlurView>
                    </View>
                )}
            />
        )
    }
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
            <ImageBackground source={BG} style={{ height: '100%', width: '100%' }}>
                <StatusBar barStyle="light-content" />

                <Carousel
                    ref={(c) => { this._carousel = c; }}
                    layoutCardOffset={0}
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
                            <Text style={styles.eventName}>About us</Text>
                        </View>
                        <View style={{ flex: 1 }} />
                    </BlurView>
                </Animated.View>
            </ImageBackground>
        )
    }
}