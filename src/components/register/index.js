import React, { Component } from 'react';
import { StatusBar, View, Text, ScrollView, ActionSheetIOS, TouchableOpacity, ImageBackground, Animated } from 'react-native';
import { BlurView } from 'react-native-blur';
import ElevatedView from 'react-native-elevated-view';
import LinearGradient from 'react-native-linear-gradient';
import MaterialsIcon from 'react-native-vector-icons/MaterialIcons';
import { Button } from 'react-native-elements'
import { inject, observer } from 'mobx-react/native';
import { Sae } from 'react-native-textinput-effects';
import { Dropdown } from 'react-native-material-dropdown';
import Icon from 'react-native-vector-icons/Ionicons';

import BG from '../../images/xbg1.jpg'
import Loading from '../loading';
import styles from './styles';

@inject('eventsV2') @observer
export default class Register extends Component {
    state = {
        userName: this.props.eventsV2._userDetails.userName,
        userEmail: this.props.eventsV2._userDetails.userEmail,
        collegeName: this.props.eventsV2._userDetails.collegeName
    }
    _animatedValue = new Animated.Value(0);
    _onCatActionPress = () => {
        let len = this.props.eventsV2.categoryList.length;
        ActionSheetIOS.showActionSheetWithOptions({
            options: [...this.props.eventsV2.categoryList.map(c => c.name), 'Cancel'],
            title: 'Choose an category',
            cancelButtonIndex: len
        },
            (buttonIndex) => {
                if (len === buttonIndex) {
                    return;
                }
                this.props.eventsV2.setEventIndex(0);
                this.props.eventsV2.setCategory({
                    index: buttonIndex,
                    name: this.props.eventsV2.categoryList[buttonIndex].name || ''
                })
            })
    };
    _onEventActionPress = () => {
        console.log(this.props.eventsV2.eventsList.length)
        let arr = this.props.eventsV2.eventsList.length === 0 ? [{ name: 'N/A' }] : this.props.eventsV2.eventsList;
        let len = this.props.eventsV2.eventsList.length;
        ActionSheetIOS.showActionSheetWithOptions({
            options: [...arr.map(c => c.name), 'Cancel'],
            title: 'Choose an event',
            cancelButtonIndex: arr.length
        },
            (buttonIndex) => {
                if (len === buttonIndex) {
                    return;
                }
                this.props.eventsV2.setEventIndex(buttonIndex);
            })
    };
    _onRegisterPress = (amount, eventName) => {
        const { userName, userEmail, userMobile, collegeName } = this.state;
        this.props.eventsV2.setUserDetails({
            userName,
            userEmail,
            userMobile,
            collegeName
        });
        // this.props.eventsV2.register({})
    }
    onScroll = Animated.event([{
        nativeEvent: {
            contentOffset: {
                y: this._animatedValue
            }
        }
    }]);
    render() {
        const inpColor = '#616161';
        const iconColor = '#424242';
        const { isFetching } = this.props.eventsV2;
        if (isFetching)
            return <Loading />
        const interpolatedValue = this._animatedValue.interpolate({
            inputRange: [0, 20, 30],
            outputRange: [0, 0, 1],
            extrapolate: 'clamp'
        })

        const { eventIndex, selectedCategory, categoryList, eventsList, _userDetails } = this.props.eventsV2;
        const { userName, userEmail, collegeName, userMobile } = _userDetails;
        let _userName = userName === '' ? undefined : userName;
        let _userEmail = userEmail === '' ? undefined : userEmail;
        let _userMobile = userMobile === '' ? undefined : userMobile;
        let _collegeName = collegeName === '' ? undefined : collegeName;
        return (
            <ImageBackground style={{ flex: 1, width: '100%', height: '100%' }} source={BG}>

                <StatusBar barStyle="light-content" />
                <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView} onScroll={this.onScroll}>

                    <Text style={[{ textAlign: 'center' }, styles.text]}>Registration</Text>

                    <BlurView blurType='light' style={[styles.elevatedCard, { flex: 1 }]} >
                        <View style={{ padding: 10 }}>

                            <Sae
                                onChangeText={userName => { this.setState({ userName }) }}
                                style={{ backgroundColor: 'rgba(0,0,0,0)', marginTop: 20, marginBottom: 5 }}
                                label={'Name'}
                                iconClass={MaterialsIcon}
                                iconName={'person'}
                                iconColor={iconColor}
                                labelStyle={styles.textLabel}
                                inputStyle={{ color: inpColor }}
                                defaultValue={_userName}
                            />
                            <Sae
                                onChangeText={collegeName => { this.setState({ collegeName }) }}
                                style={{ backgroundColor: 'rgba(0,0,0,0)', marginBottom: 5 }}
                                label={'College'}
                                iconClass={MaterialsIcon}
                                iconName={'school'}
                                iconColor={iconColor}
                                labelStyle={styles.textLabel}
                                inputStyle={{ color: inpColor }}
                                defaultValue={_collegeName}
                            />
                            <Sae
                                onChangeText={userEmail => { this.setState({ userEmail }) }}
                                style={{ backgroundColor: 'rgba(0,0,0,0)' }}
                                label={'Email'}
                                iconClass={MaterialsIcon}
                                iconName={'mail'}
                                iconColor={iconColor}
                                labelStyle={styles.textLabel}
                                inputStyle={{ color: inpColor }}
                                defaultValue={_userEmail}
                            />
                            <Sae
                                onChangeText={userMobile => { this.setState({ userMobile }) }}
                                style={{ backgroundColor: 'rgba(0,0,0,0)' }}
                                label={'Contact Info'}
                                iconClass={MaterialsIcon}
                                iconName={'call'}
                                iconColor={iconColor}
                                labelStyle={styles.textLabel}
                                inputStyle={{ color: inpColor }}
                                defaultValue={_userMobile}
                            />
                            <TouchableOpacity onPress={this._onCatActionPress} style={styles.touchable}>
                                <Text style={styles.textLabel}>
                                    Select category
                                </Text>
                                <Text style={styles.textValue}>
                                    {categoryList[selectedCategory.index].name || ''}
                                </Text>

                            </TouchableOpacity>
                            <TouchableOpacity onPress={this._onEventActionPress} style={styles.touchable}>
                                <Text style={styles.textLabel}>
                                    Select Event
                                </Text>
                                <Text style={styles.textValue}>
                                    {eventsList[eventIndex] ? eventsList[eventIndex].name : 'N/A'}
                                </Text>
                            </TouchableOpacity>
                            <View style={styles.touchable}>
                                <Text style={styles.textLabel}>
                                    Registration Amount
                                </Text>
                                <Text style={styles.textValue}>
                                    {eventsList[eventIndex] ? eventsList[eventIndex].amount : 'N/A'}
                                </Text>
                            </View>
                            <Button
                                onPress={this._onRegisterPress.bind(this, eventsList[eventIndex].amount, eventsList[eventIndex].name)}
                                title="Register"
                                buttonStyle={{
                                    backgroundColor: "white",
                                    width: 150,
                                    height: 45,
                                    borderColor: "transparent",
                                    borderWidth: 0,
                                    borderRadius: 50,
                                    alignSelf: 'center',
                                    marginTop: 20
                                }}
                                textStyle={[styles.text, { fontSize: 20, color: '#4ecdc4' }]}
                                containerStyle={{ marginTop: 20 }}
                            />
                        </View>
                    </BlurView>
                </ScrollView>
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
                            {/* <Text style={styles.eventName}>Notifications</Text> */}
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
                            <Text style={styles.eventName}>Register</Text>
                        </View>
                        <View style={{ flex: 1 }} />
                    </BlurView>
                </Animated.View>
            </ImageBackground>
        )
    }
}