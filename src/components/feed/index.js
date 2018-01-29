import React, { Component } from 'react';
import { View, Text, Button, FlatList, WebView, Image, TouchableWithoutFeedback, ActivityIndicator } from 'react-native';
import PopupDialog from 'react-native-popup-dialog';
import FitImage from 'react-native-fit-image';
import ElevatedView from 'react-native-elevated-view'
import { UIActivityIndicator } from 'react-native-indicators';

import Header from '../header';
import { width } from '../../constants';
import { observer, inject } from 'mobx-react/native';
import styles from './styles';


// import styles from './styles';
@inject('feedStore') @observer
export default class Auth extends Component {
    state = {
        video: "jl1ONpVYih8"
    }
    _renderItem = ({ item }) => {
        isImageURL = item.resources.slice(0, 4) === "http";
        console.log(item.resources, isImageURL)
        uri = isImageURL ? item.resources : `https://i.ytimg.com/vi/${item.resources}/hqdefault.jpg`
        return (
            <ElevatedView style={styles.postContainer} elevation={5}>
                <View style={styles.text}>
                    <Text style={styles.headingText}>{item.heading}</Text>
                    <Text style={styles.captionText}>{item.caption}</Text>
                </View>
                <TouchableWithoutFeedback onPress={() => {
                    if (item.resources.slice(0, 4) !== "http") {
                        this.setState({
                            video: item.resources
                        });
                        this.popupDialog.show();
                    }
                }}>
                    <View>
                        <FitImage source={{ uri }} indicator={true} style={{}} />
                        {/* <FitImage source={{ uri }} style={{ height: 108 * 2, width: 192 * 2 }} /> */}
                        {!isImageURL &&
                            <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center' }}>
                                <Image source={require('../../icons/play.png')} style={{ height: 16.7 * 3, width: 24 * 3, }} />
                            </View>
                        }
                    </View>
                </TouchableWithoutFeedback>
            </ElevatedView>
        )
    }
    render() {
        onShouldStartLoadWithRequest = (navigator) => {
            this.videoPlayer.stopLoading(); //Some reference to your WebView to make it stop loading that URL
            return false;

        }
        if(this.props.feedStore.isFeedFetching)
            return <UIActivityIndicator animating />
        return (
            <View style={{ flex: 1 }} >
                <Header title={'Feed'} left={{ name: 'ios-arrow-back', action: this.props.navigation.goBack }} />
                <FlatList
                    data={this.props.feedStore.allFeed}
                    renderItem={this._renderItem}
                    keyExtractor={i => i.id}
                />
                <PopupDialog
                    style={{}}
                    ref={(popupDialog) => { this.popupDialog = popupDialog; }}
                    onDismissed={() => { this.setState({ video: "x" }) }}
                >
                    <WebView
                        ref={(ref) => { this.videoPlayer = ref; }}
                        style={{}}
                        onShouldStartLoadWithRequest={this.onShouldStartLoadWithRequest} //for iOS
                        onNavigationStateChange={this.onShouldStartLoadWithRequest} //for Android
                        javaScriptEnabled={true}
                        // source={{ html: `<iframe width="250" height="200" src="https://www.youtube.com/embed/${this.state.video}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>` }}
                        source={{ uri: `https://www.youtube.com/embed/${this.state.video}` }}
                    />
                </PopupDialog>
            </View >
        )
    }
    componentWillMount() {
        this.props.feedStore.fetchFeed()
    }
}