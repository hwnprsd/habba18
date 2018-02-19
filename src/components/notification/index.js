import React, { Component } from 'react';
import { View, Text, ScrollView, FlatList, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { BlurView } from 'react-native-blur';
import ElevatedView from 'react-native-elevated-view';
import LinearGradient from 'react-native-linear-gradient';
import MaterialsIcon from 'react-native-vector-icons/MaterialIcons';
import { inject, observer } from 'mobx-react/native';

import styles from './styles';
import BG from '../../images/xbg1.jpg'

@inject('notificationStore') @observer
export default class Notifs extends Component {
    _renderItem = ({ item }) => {
        console.log(item);
        return (
            <ElevatedView elevation={5} style={styles.elevatedCard}>
                <BlurView blurType='light' style={{ flex: 1 }} >
                    <View style={{ padding: 10 }}>
                        <Text style={[styles.textName]}>
                            {item.name}
                        </Text>
                        <Text style={[styles.textMessage]}>
                            {item.message}
                        </Text>
                    </View>
                </BlurView>
            </ElevatedView>
        )
    }
    render() {
        const { isFetching, _notificationList } = this.props.notificationStore;
        if (isFetching) {
            return <Text>LOADING</Text>
        }
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
                    showsVerticalScrollIndicator={false}
                    data={_notificationList}
                    style={styles.scrollView}
                    ListFooterComponent={() => <View style={{ height: 300 }} />}
                    ListHeaderComponent={() => (
                        <ElevatedView elevation={5} style={[styles.elevatedCard, { marginBottom: 10 }]}>
                            <BlurView blurType='light' style={{ flex: 1 }} >
                                <View style={{ padding: 10 }}>
                                    <Text style={[{ textAlign: 'center' }, styles.text]}>
                                        Notifications
                                    </Text>
                                </View>
                            </BlurView>
                        </ElevatedView>
                    )}
                    renderItem={this._renderItem}
                    keyExtractor={(item) => item.id}
                />
            </ImageBackground>
        )
    }
    componentWillMount() {
        this.props.notificationStore.fetchNotifications()
    }
}