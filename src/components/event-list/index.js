import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import CollapsibleToolbar from 'react-native-collapsible-toolbar';
import { observer, inject } from 'mobx-react/native';
import FastImage from 'react-native-fast-image';
import { UIActivityIndicator } from 'react-native-indicators'
import ElevatedView from 'react-native-elevated-view';

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
    _onEventPress = item => {
        this.props.navigation.navigate('EventDetail', { item });
    }
    _renderContent = () => {
        const { eventsList } = this.props.eventsV2;
        const { width, height } = this.state;
        console.log(this.state)
        return (

            <View style={[styles.gridView, { minHeight: height }]} >
                {eventsList.map((item) => (
                    <ElevatedView elevation={3} key={item.eid} style={styles.mainContainer}>
                        <TouchableOpacity style={[styles.itemContainer]} onPress={this._onEventPress.bind(this, item)} activeOpacity={0.7}>
                            <FastImage source={{ uri: item.url }} style={[styles.image, { width }]} resizeMode="cover" />
                            <View style={[styles.textContainer, { width }]}>
                                <Text style={styles.itemName}>{item.name || ''}</Text>
                            </View>
                        </TouchableOpacity>
                    </ElevatedView>
                ))}
            </View>
        )
    }
    render() {
        const { categoryName, url } = this.props.navigation.state.params;
        const toolBarText = categoryName;
        return (
            <CollapsibleToolbar
                renderContent={this._renderContent}
                renderNavBar={() => <Header collapsable title={toolBarText} left={{ name: "ios-arrow-back", action: this.props.navigation.goBack }} color={"rgba(0,0,0,0)"} />}
                imageSource={url || 'https://lorempixel.com/400/600/'}
                collapsedNavBarBackgroundColor={colors.primaryDark}
                toolBarHeight={200}
            />
        )
    }

}
    // {/*renderNavBar={() => <View style={{ height: 50, flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text style={styles.toolBarText}>{toolBarText}</Text></View>}*/}