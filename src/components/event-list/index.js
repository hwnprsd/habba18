import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Dimensions, Modal, TouchableHighlight, Animated } from 'react-native';
import CollapsibleToolbar from 'react-native-collapsible-toolbar';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import { observer, inject } from 'mobx-react/native';
import FastImage from 'react-native-fast-image';
import FitImage from 'react-native-fit-image';
import { UIActivityIndicator } from 'react-native-indicators'
import ElevatedView from 'react-native-elevated-view';
import Swiper from 'react-native-swiper';
import EventDetail from '../event-detail';
import { BlurView, VibrancyView } from 'react-native-blur';
import Icon from 'react-native-vector-icons/Ionicons';

import Header from '../header'
import styles from './styles';
import { colors } from '../../constants';
i = 0;
@inject('eventsV2') @observer
export default class EventList extends Component {
    state = Dimensions.get("window");
    _animatedValue = new Animated.Value(0);
    handler = dims => this.setState(dims.window);

    componentWillMount() {
        Dimensions.addEventListener("change", this.handler);
    }

    componentWillUnmount() {
        // Important to stop updating state after unmount
        Dimensions.removeEventListener("change", this.handler);
    }
    _onEventPress = (item, eventsList) => {
        this.setState({
            modalProps: {
                item,
                eventsList,
                closeModal: this._closeModal
            },
            modalVisible: true
        })
        // this.props.navigation.navigate('EventDetail', { item, eventsList });
    }
    _closeModal = () => {
        this.setState({
            modalVisible: false
        })
    }
    _renderContent = (item, index) => {
        const { _mainList } = this.props.eventsV2;
        const { width, height } = this.state;
        const eventsList = _mainList[index][item].slice();
        let oldList = [];
        let list = [];
        let counter = 0;
        let c = 0;
        for (let i = 0; i < eventsList.length; i++) {
            const curr = {
                ...eventsList[i],
                index: i
            }
            if (eventsList.length === 2 && i === 0) {
                oldList.push(curr);
            }
            else if (eventsList.length === 2 && i == 1) {
                oldList.push(curr);
                list.push(oldList);
                oldList = [];
            }
            else
                switch (counter) {
                    case 0:
                        if (oldList.length !== 0) {
                            list.push(oldList);
                            oldList = [];
                        }
                        list.push(curr);
                        counter = 1;
                        break;
                    case 1:
                        oldList.push(curr);
                        counter = 2;
                        break;
                    case 2:
                        oldList.push(curr);
                        counter = 0;
                        break;
                }

        }
        if (oldList.length !== 0) {
            oldList.unshift(list.pop());
            list.push(oldList);
            oldList = [];
        }

        return (
            <View style={[styles.gridView, { minHeight: height }]} >

                <Modal
                    visible={this.state.modalVisible || false}
                    animationType={'slide'}
                    onRequestClose={() => this._closeModal()}
                    transparent
                    animationType={'fade'}
                >
                    <View style={{ flex: 1 }}>
                        <BlurView style={{ flex: 1 }} blurType='light' blurAmount={2} />
                        <View style={{ flex: 1, position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}>
                            <EventDetail {...this.state.modalProps} navigate={this.props.navigation.navigate} />
                        </View>
                    </View>
                </Modal>
                {list.map((item, idx) => {
                    if (!Array.isArray(item))
                        return (
                            <View key={idx} style={styles.mainContainer}>
                                <TouchableOpacity style={[styles.itemContainer]} onPress={this._onEventPress.bind(this, item, eventsList)} activeOpacity={1}>
                                    <FastImage source={{ uri: item.url }} style={[styles.image, { width }]} resizeMode="cover" />
                                    <VibrancyView style={[styles.textContainer, { width }]}>
                                        <Text style={styles.itemName}>{item.name || ''}</Text>
                                    </VibrancyView>
                                </TouchableOpacity>
                            </View>
                        )
                    return (
                        <View key={idx} style={styles.mainContainer3}>
                            {item.map((subItem, idx2) => (
                                <View key={idx2} style={[styles.mainContainer2, { flex: 1 }]}>
                                    <TouchableOpacity style={[styles.itemContainer]} onPress={this._onEventPress.bind(this, subItem, eventsList)} activeOpacity={1}>
                                        <FastImage source={{ uri: subItem.url }} style={[styles.image, { width: width / 2 }]} resizeMode="cover" />
                                        <VibrancyView style={[styles.textContainer, { width }]}>
                                            <Text style={styles.itemName}>{subItem.name || ''}</Text>
                                        </VibrancyView>
                                    </TouchableOpacity>
                                </View>
                            ))}
                        </View>
                    )
                })}
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

    _renderItem = ({ item, index }) => {
        const { width, height } = this.state;
        const { categoryName, url } = this.props.navigation.state.params;
        const toolBarText = categoryName;
        const interpolatedValue = this._animatedValue.interpolate({
            inputRange: [0, height / 3, height / 2],
            outputRange: [0, 0, 1],
            extrapolate: 'clamp'
        })
        return (
            <View style={{ flex: 1 }}>

                <ParallaxScrollView
                    onScroll={this.onScroll}
                    key={i++}
                    backgroundColor="rgba(0,0,0,0)"
                    contentBackgroundColor="#fff"
                    backgroundSpeed={10}
                    parallaxHeaderHeight={height / 2}
                    // renderScrollComponent={() => <Animated.View />}
                    renderForeground={() => (
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={styles.stickyHeader}>{item.name}</Text>
                        </View>
                    )}
                    renderBackground={() => (
                        <FastImage source={{ uri: item.url }} style={{ width, height: height / 2 }} resizeMode="cover" />
                    )}

                >
                    {this._renderContent(item.name, index)}

                </ParallaxScrollView>

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
                            <Text style={styles.eventName}>{item.name}</Text>
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
                            <Text style={styles.eventName}>{item.name}</Text>
                        </View>
                        <View style={{ flex: 1 }} />
                    </BlurView>
                </Animated.View>
            </View>
        )
    }

    render() {
        const { categoryList, selectedCategory: { name, index }, setCategory } = this.props.eventsV2;
        return (
            <this._renderItem item={categoryList[index]} index={index} />
            // <Swiper
            //     index={index}
            //     loop={false}
            //     showsPagination={false}
            //     loadMinimal
            //     onIndexChanged={i => { setCategory({ name: categoryList[i].name, index: i }) }}
            // >
            //     {categoryList.map((category, id) => this._renderItem(category, id))}
            // </Swiper>
        )
    }
    componentWillUnmount() {
        this.setState({
            modalVisible: false
        })
    }
}
    // {/*renderNavBar={() => <View style={{ height: 50, flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text style={styles.toolBarText}>{toolBarText}</Text></View>}*/}