import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import CollapsibleToolbar from 'react-native-collapsible-toolbar';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import { observer, inject } from 'mobx-react/native';
import FastImage from 'react-native-fast-image';
import FitImage from 'react-native-fit-image';
import { UIActivityIndicator } from 'react-native-indicators'
import ElevatedView from 'react-native-elevated-view';
import Swiper from 'react-native-swiper';

import Header from '../header'

import styles from './styles';
import { colors } from '../../constants';

@inject('eventsV2') @observer
export default class EventList extends Component {
    state = Dimensions.get("window");
    handler = dims => this.setState(dims.window);

    componentWillMount() {
        Dimensions.addEventListener("change", this.handler);
    }

    componentWillUnmount() {
        // Important to stop updating state after unmount
        Dimensions.removeEventListener("change", this.handler);
    }
    _onEventPress = (item, eventsList) => {
        this.props.navigation.navigate('EventDetail', { item, eventsList });
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
                {list.map((item, idx) => {
                    if (!Array.isArray(item))
                        return (
                            <View key={idx} style={styles.mainContainer}>
                                <TouchableOpacity style={[styles.itemContainer]} onPress={this._onEventPress.bind(this, item, eventsList)} activeOpacity={1}>
                                    <FastImage source={{ uri: item.url }} style={[styles.image, { width }]} resizeMode="cover" />
                                    <View style={[styles.textContainer, { width }]}>
                                        <Text style={styles.itemName}>{item.name || ''}</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        )
                    return (
                        <View key={idx} style={[{ flexDirection: 'row', paddingHorizontal: 2.5, marginVertical: 2.5 }]}>
                            {item.map((subItem, idx2) => (
                                <View key={idx2} style={[styles.mainContainer2, { flex: 1 }]}>
                                    <TouchableOpacity style={[styles.itemContainer]} onPress={this._onEventPress.bind(this, subItem, eventsList)} activeOpacity={1}>
                                        <FastImage source={{ uri: subItem.url }} style={[styles.image, { width: width / 2 }]} resizeMode="cover" />
                                        <View style={[styles.textContainer, { width }]}>
                                            <Text style={styles.itemName}>{subItem.name || ''}</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            ))}
                        </View>
                    )
                })}
            </View>
        )
    }
    _renderItem = (item, index) => {
        const { categoryName, url } = this.props.navigation.state.params;
        const toolBarText = categoryName;
        return (
            // <CollapsibleToolbar
            //     key={index}
            //     renderContent={this._renderContent.bind(this, item.name, index)}
            //     renderNavBar={() => <Header collapsable title={item.name} left={{ name: "ios-arrow-back", action: this.props.navigation.goBack }} color={"rgba(0,0,0,0)"} />}
            //     imageSource={item.url || 'https://lorempixel.com/400/600/'}
            //     collapsedNavBarBackgroundColor={colors.primaryDark}
            //     toolBarHeight={200}
            //     showsVerticalScrollIndicator={false}
            // />
            <ParallaxScrollView
                backgroundColor="rgba(0,0,0,0)"
                contentBackgroundColor="#fff"
                backgroundSpeed={10}
                parallaxHeaderHeight={300}
                // renderScrollComponent={() => <Animated.View />}
                renderForeground={() => (
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={styles.stickyHeader}>{item.name}</Text>
                    </View>
                )}
                renderBackground={() => (
                    <FitImage source={{ uri: item.url }} />
                )}
                renderStickyHeader={() => <Header collapsable title={item.name} left={{ name: "ios-arrow-back", action: this.props.navigation.goBack }} />}
                stickyHeaderHeight={60}
            >
                {this._renderContent(item.name, index)}
            </ParallaxScrollView>
        )
    }

    render() {
        const { categoryList, selectedCategory: { name, index }, setCategory } = this.props.eventsV2;
        return (
            <Swiper
                index={index}
                loop={false}
                showsPagination={false}
                loadMinimal
                onIndexChanged={i => { setCategory({ name: categoryList[i].name, index: i }) }}
            >
                {categoryList.map((category, id) => this._renderItem(category, id))}
            </Swiper>
        )
    }

}
    // {/*renderNavBar={() => <View style={{ height: 50, flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text style={styles.toolBarText}>{toolBarText}</Text></View>}*/}