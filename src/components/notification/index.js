import React, { Component } from 'react';
import { View, Text, ScrollView, FlatList, TouchableOpacity, Image, ImageBackground, Animated } from 'react-native';
import { BlurView } from 'react-native-blur';
import ElevatedView from 'react-native-elevated-view';
import LinearGradient from 'react-native-linear-gradient';
import MaterialsIcon from 'react-native-vector-icons/MaterialIcons';
import { inject, observer } from 'mobx-react/native';
import Icon from 'react-native-vector-icons/Ionicons';

import Loading from '../loading';
import styles from './styles';
import BG from '../../images/xbg1.jpg'

@inject('notificationStore') @observer
export default class Notifs extends Component {
    _animatedValue = new Animated.Value(0);
    _renderItem = ({ item }) => {
        console.log(item);
        return (
            <BlurView blurType='light' style={[styles.elevatedCard, { flex: 1 }]} >
                <View style={{ padding: 10 }}>
                    <Text style={[styles.textName]}>
                        {item.name}
                    </Text>
                    <Text style={[styles.textMessage]}>
                        {item.message}
                    </Text>
                </View>
            </BlurView>
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
        const { isFetching, _notificationList } = this.props.notificationStore;
        if (isFetching) {
            return <Loading />
        }
        const interpolatedValue = this._animatedValue.interpolate({
            inputRange: [0, 100, 150],
            outputRange: [0, 0, 1],
            extrapolate: 'clamp'
        })
        return (
            <ImageBackground style={{ flex: 1, width: '100%', height: '100%' }} source={BG}>
                {/* <LinearGradient
                    // start={{ x: 0, y: 1 }}
                    // end={{ x: 1, y: 1 }}
                    colors={['#43cea2', '#185a9d', '#fff']}
                    style={{
                        height: '100%', width: '100%'
                    }}>
                </LinearGradient> */}

                <FlatList
                    onScroll={this.onScroll}
                    showsVerticalScrollIndicator={false}
                    data={_notificationList}
                    style={styles.scrollView}
                    ListFooterComponent={() => <View style={{ height: 300 }} />}
                    ListHeaderComponent={() => (
                        <View style={{ padding: 10 }}>
                            <Text style={[{ textAlign: 'center' }, styles.text]}>
                                Notifications
                                    </Text>
                        </View>
                    )}
                    renderItem={this._renderItem}
                    keyExtractor={(item) => item.id}
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
                            <Text style={styles.eventName}>Notifications</Text>
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
                            <Text style={styles.eventName}>Notifications</Text>
                        </View>
                        <View style={{ flex: 1 }} />
                    </BlurView>
                </Animated.View>
            </ImageBackground>
        )
    }
    componentWillMount() {
        this.props.notificationStore.fetchNotifications()
    }
}