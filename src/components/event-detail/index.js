import React, { Component } from 'react';
import { 
    StatusBar, 
    View, 
    Text, 
    Dimensions, 
    ScrollView, 
    TouchableOpacity, 
    Animated,
    Linking
} from 'react-native';
import { inject, observer } from 'mobx-react/native';
import ElevatedView from 'react-native-elevated-view';
import CollapsibleToolbar from 'react-native-collapsible-toolbar';
import FastImage from 'react-native-fast-image';
import Swiper from 'react-native-swiper';
import openMap from 'react-native-open-maps';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import { BlurView } from 'react-native-blur'
import Icon from 'react-native-vector-icons/Ionicons';
import { Divider } from 'react-native-elements'

import { colors, fonts } from '../../constants';
import Header from '../header';
import styles from './styles';


@inject('eventsV2') @observer
export default class EventDetails extends Component {
    state = Dimensions.get("window");
    handler = dims => this.setState(dims.window);
    _animatedValue = new Animated.Value(0);

    componentWillMount() {
        Dimensions.addEventListener("change", this.handler);
    }

    componentWillUnmount() {
        // Important to stop updating state after unmount
        Dimensions.removeEventListener("change", this.handler);
    }

    _onRegisterPress = () => {
        this.props.eventsV2.setEventIndex(this.state.currIndex);
        this.props.closeModal();
        this.props.navigate('Register')
    }
    _renderContent = item => {
        const { height, width } = this.state;
        const { description, rules, numb, eventhead, amount, pmoney, lat, lang, name } = item;
        // const interpolatedValue = this._animatedValue.interpolate({
        //     inputRange: [0, height / 4, height / 3],
        //     outputRange: [0, 1],
        //     extrapolate: 'clamp'
        // })
        return (
            <View style={{ flex: 1 }} key={i++}>
                <StatusBar translucent backgroundColor='rgba(0,0,0,0)' />
                <ScrollView
                    onScroll={this.onScroll}
                    style={{ flex: 1, paddingTop: 50, paddingHorizontal: 10, paddingBottom: 50 }}
                    showsVerticalScrollIndicator={false}
                >
                    <View>
                        <FastImage source={{ uri: item.url }} style={{ width: width - 20, height: height / 3 }} resizeMode="cover" />
                        <TouchableOpacity onPress={this.props.closeModal} style={{ position: 'absolute', left: 0, }}>
                            <Icon onPress={this.props.closeModal} name='ios-arrow-back' style={{ color: 'white', fontSize: 22, margin: 10 }} />
                        </TouchableOpacity>
                    </View>
                    <BlurView style={[styles.card]} blurType="light" >
                        <View style={styles.contain}>
                            <Text style={styles.titleText}>Description</Text>
          
                                <Text style={styles.contentText}>{description || ''}</Text>
                        </View>
                        {/* </BlurView> */}
                        {/* <BlurView blurType="light" style={styles.card} > */}
                        <View style={styles.contain}>
                            <Text style={styles.titleText}>Rules & Regulations</Text>
                           
                                <Text style={styles.contentText}>{rules || ''}</Text>
                        </View>
                        {/* </BlurView> */}
                        {/* <BlurView style={styles.card} blurType="light"> */}
                        <View style={styles.contain}>
                            <Text style={styles.titleText}>Contact Number</Text>
                            <Text style={styles.contentText}>{eventhead || ''} - {numb || ''}</Text>
                        </View>
                        {/* </BlurView> */}
                        {/* <BlurView style={styles.card} blurType="light" > */}
                        <View style={styles.contain}>
                            <Text style={styles.titleText}>Amount</Text>
                            <Text style={styles.contentText}>{'Registration'} - {amount || ''}</Text>
                            <Text style={styles.contentText}>{'Prize Money'} - {pmoney || ''}</Text>
                        </View>
                        {/* </BlurView> */}
                        {/* <BlurView style={styles.card} blurType="light" > */}
                        <View style={styles.contain}>
                            <TouchableOpacity activeOpacity={0.7} onPress={this._onRegisterPress}>
                                <Text style={styles.button}>Register</Text>
                            </TouchableOpacity>
                        </View>
                        {/* </BlurView> */}
                        {/* <BlurView style={[styles.card, { marginBottom: 50 }]} blurType="light"> */}
                        <View style={styles.contain}>
                            <TouchableOpacity activeOpacity={0.7} onPress={() => { 
                                // openMap({ latitude: lat, longitude: lang }) 
                                Linking.openURL(`http://maps.apple.com/?ll=${lat},${lang}`)
                                
                                }}>
                                <Text style={styles.button}>Navigate to event</Text>
                            </TouchableOpacity>
                        </View>
                    </BlurView>

                </ScrollView>
                {/* <Animated.View style={{ position: 'absolute', top: 0, opacity: interpolatedValue, width: '100%' }}>
                    <VibrancyView style={{ flex: 1, flexDirection: 'row', padding: 10, width: '100%', justifyContent: 'center' }}>
                        <Text style={{ color: 'white', alignSelf: 'center', fontSize: 22, }}>
                            Event Name
                        </Text>
                        <TouchableOpacity onPress={this.props.closeModal} style={{ position: 'absolute', left: 0, }}>
                            <Icon onPress={this.props.closeModal} name='ios-arrow-back' style={{ color: 'white', fontSize: 22, margin: 10 }} />
                        </TouchableOpacity>
                    </VibrancyView>
                </Animated.View> */}

            </View>
        )
    }
    onScroll = Animated.event([{
        nativeEvent: {
            contentOffset: {
                y: this._animatedValue
            }
        }
    }]);
    _renderItem = (item, id) => {
        const { name, url } = item;
        const { height, width } = this.state;
        // xreturn (
        //     <CollapsibleToolbar
        //         key={id}
        //         renderContent={this._renderContent.bind(this, item)}
        //         renderNavBar={() => <Header collapsable title={name} left={{ name: "ios-arrow-back", action: this.props.navigation.goBack }} color={"rgba(0,0,0,0)"} />}
        //         imageSource={url || 'https://i.ytimg.com/vi/ScMzIvxBSi4/maxresdefault.jpg'}
        //         collapsedNavBarBackgroundColor={colors.primaryDark}
        //         toolBarHeight={300}
        //     />
        return (
            <ParallaxScrollView
                key={i++}
                backgroundColor="rgba(0,0,0,0)"
                contentBackgroundColor="#fff"
                backgroundSpeed={10}
                style={{ borderRadius: 5, }}
                parallaxHeaderHeight={height / 2}
                renderForeground={() => (
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        {/* <Text style={styles.stickyHeader}>{name}</Text> */}
                    </View>
                )}
                renderBackground={() => (
                    <FastImage source={{ uri: url }} style={{ width, height: height / 2 }} resizeMode="cover" />
                )}
                renderStickyHeader={() => <Header collapsable title={name} left={{ name: "ios-arrow-back", action: this.props.closeModal }} />}
                stickyHeaderHeight={70}
            >
                {this._renderContent(item)}
            </ParallaxScrollView>

        )
    }
    render() {
        // const { item, eventsList, index } = this.props.navigation.state.params;
        const { item, eventsList, index } = this.props;
        const id = item ? item.index : 0;
        return (
            <Swiper
                index={index || id}
                loop={false}
                showsPagination={false}
                loadMinimal bounces
                onIndexChanged={i => this.setState({ currIndex: i })}
                paginationStyle={{
                    position: 'absolute',
                    bottom: 0
                }}
                // activeDot={
                //     <View style={{backgroundColor: '#000', opacity: 0.5,width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3,}} />
                // }
                showsButtons
                nextButton={
                    <Text style={{ color: 'rgba(0,0,0,0.3)', fontSize: 30 }}>›</Text>
                }
                prevButton={
                    <Text style={{ color: 'rgba(0,0,0,0.3)', fontSize: 30 }}>‹</Text>
                }
            >
                {eventsList.map((event, id) => {
                    return this._renderContent(event)
                })}
            </Swiper>

        )
    }
    componentWillMount() {
        const { item, index } = this.props;
        const id = item ? item.index : 0;
        this.setState({ currIndex: index || id })
    }
    componentDidMount() {

    }
}