import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';
import FitImage from 'react-native-fit-image';
import ElevatedView from 'react-native-elevated-view';

import styles from './styles';
import { width, height } from '../../constants';

export default class EventCard extends Component {
    _onCardPress = () => {
        const {index, item} = this.props;
        this.props.setIndex({ index: index, name: item.name });
        this.props.navigate('EventList', { categoryName: item.name, url: item.url });
    }
    render() {
        return (
            <TouchableOpacity style={styles.container} onPress={this._onCardPress} activeOpacity={0.7}>
                <ElevatedView elevation={10} style={styles.cardContainer}>
                    <View style={{}}>
                        <FastImage
                            source={{ uri: this.props.item.url || 'https://i.ytimg.com/vi/ScMzIvxBSi4/maxresdefault.jpg' }}
                            style={{ width: width / 1.5, height: height / 1.8 }}
                            // style={{width: 250, height: 300, overflow: 'hidden'}}
                            resizeMode={'cover'}
                        />
                    </View>
                    <View style={styles.cardText}>
                        <Text style={styles.text}>
                            {this.props.item.name || ''}
                        </Text>
                        <Text style={[styles.text, { fontSize: 15 }]}>
                            {this.props.item.length + ' Events' || ''}
                        </Text>
                    </View>
                </ElevatedView>
            </TouchableOpacity>
        )
    }
}