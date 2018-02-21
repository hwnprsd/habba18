import React, { Component } from 'react';
import {
    View,
    Text,
    Button,
    FlatList,
    WebView,
    Image,
    TouchableWithoutFeedback,
    Modal,
    ImageBackground,
    TouchableOpacity,
    Animated,
    StatusBar
} from 'react-native';
import PopupDialog from 'react-native-popup-dialog';
import FitImage from 'react-native-fit-image';
import ElevatedView from 'react-native-elevated-view'
import LinearGradient from 'react-native-linear-gradient';
import { UIActivityIndicator } from 'react-native-indicators';
import { BlurView } from 'react-native-blur';
import { observer, inject } from 'mobx-react/native';
import LottieView from 'lottie-react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import Header from '../header';
import Loading from '../loading';
import Error from '../error';
import { width } from '../../constants';
import styles from './styles';
import BG from '../../images/xbg1.jpg'

const uri = 'https://unsplash.com/photos/32ZvquJMY80'
// import styles from './styles';
@inject('feedStore') @observer
export default class Auth extends Component {
    state = {
        video: "jl1ONpVYih8",
        modalVisible: false
    }
    _animatedValue = new Animated.Value(0);
    onScroll = Animated.event([{
        nativeEvent: {
            contentOffset: {
                y: this._animatedValue
            }
        }
    }]);
    _renderItem = ({ item }) => {
        isImageURL = item.resources.slice(0, 4) === "http";
        console.log(item.resources, isImageURL)
        uri = isImageURL ? item.resources : `https://i.ytimg.com/vi/${item.resources}/hqdefault.jpg`
        return (
            <BlurView blurType="light" style={[styles.elevatedCard, { flex: 1 }]} >
                <View style={{ padding: 5 }}>
                    <Text style={styles.headingText}>{item.heading || ''}</Text>
                    <Text style={styles.captionText}>{item.caption || ''}</Text>
                </View>
                <TouchableWithoutFeedback onPress={() => {
                    if (item.resources.slice(0, 4) !== "http") {
                        this.setState({
                            video: item.resources
                        });
                        this.openModal();
                    }
                }}>
                    <View>
                        <FitImage source={{ uri: uri || 'https://cloud.netlifyusercontent.com/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/68dd54ca-60cf-4ef7-898b-26d7cbe48ec7/10-dithering-opt.jpg' }} indicator={true} style={{}} />
                        {/* <FitImage source={{ uri }} style={{ height: 108 * 2, width: 192 * 2 }} /> */}
                        {!isImageURL &&
                            <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center' }}>
                                <Image source={require('../../icons/play.png')} style={{ height: 16.7 * 3, width: 24 * 3, }} />
                            </View>
                        }
                    </View>
                </TouchableWithoutFeedback>
            </BlurView>
        )
    }
    closeModal() {
        this.setState({ modalVisible: false });
    }
    openModal() {
        this.setState({ modalVisible: true })
    }
    render() {

        onShouldStartLoadWithRequest = (navigator) => {
            this.videoPlayer.stopLoading(); //Some reference to your WebView to make it stop loading that URL
            return false;

        }
        if (this.props.feedStore.errorPresent)
            return (
                <Error back={() => { this.props.navigation.goBack() }} />
            )
        if (this.props.feedStore.isFeedFetching)
            return (
                <Loading />
            )
        const interpolatedValue = this._animatedValue.interpolate({
            inputRange: [0, 100, 150],
            outputRange: [0, 0, 1],
            extrapolate: 'clamp'
        })
        return (
            <View style={{ flex: 1 }} >
                {/* <LinearGradient
                    // start={{ x: 0, y: 1 }}
                    // end={{ x: 1, y: 1 }}
                    colors={['#43cea2', '#185a9d']}
                    style={{
                        height: '40%', width: '100%'
                    }}>
                </LinearGradient> */}
                <ImageBackground source={BG} style={{ width: '100%', height: '100%' }} resizeMode='cover'>
                    <StatusBar barStyle="light-content" />
                    <FlatList
                        onScroll={this.onScroll}
                        data={this.props.feedStore.allFeed}
                        style={styles.scrollView}
                        renderItem={this._renderItem}
                        keyExtractor={i => i.id}
                        ListHeaderComponent={() => (
                            <View style={{ padding: 10 }}>
                                <Text style={[{ textAlign: 'center' }, styles.text]}>
                                    News Feed
                                    </Text>
                            </View>
                        )}
                    />
                    <Modal
                        visible={this.state.modalVisible}
                        animationType={'slide'}
                        onRequestClose={() => this.closeModal()}
                        transparent
                    >
                        <BlurView blurType="light" style={{ flex: 1, justifyContent: 'center' }}>
                            <View style={{ height: '45%', width: '100%' }}>

                                <WebView
                                    ref={(ref) => { this.videoPlayer = ref; }}
                                    onShouldStartLoadWithRequest={this.onShouldStartLoadWithRequest} //for iOS
                                    onNavigationStateChange={this.onShouldStartLoadWithRequest} //for Android
                                    javaScriptEnabled={true}
                                    // source={{ html: `<iframe width="250" height="200" src="https://www.youtube.com/embed/${this.state.video}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>` }}
                                    source={{ uri: `https://www.youtube.com/embed/${this.state.video}` }}
                                />
                                <TouchableWithoutFeedback onPress={() => { this.setState({ modalVisible: false }) }}>
                                    <View>
                                        <Text style={styles.closeText}>Close</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                        </BlurView>
                    </Modal>
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
                                <Text style={styles.eventName}>News Feed</Text>
                            </View>
                            <View style={{ flex: 1 }} />
                        </BlurView>
                    </Animated.View>
                </ImageBackground>
            </View >
        )
    }
    componentWillMount() {
        this.props.feedStore.fetchFeed()
    }
}