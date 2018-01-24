import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';

import styles from './styles';
import { width } from '../../constants';

export default class EventCard extends Component {
    _onCardPress = () => {
        this.props.setIndex(this.props.item.id);
        this.props.navigate('EventList', {categoryName: this.props.item.name});
    }
    render() {
        return (
            <TouchableOpacity style={styles.container} onPress={this._onCardPress}>
                <View style={styles.cardContainer}>
                    <View style={{}}>
                        <FastImage
                            source={{ uri: this.props.item.url || "http://www.nelsonvenues.co.nz/uploads/1/0/1/2/101257066/event-placeholder_1_orig.jpg" }}
                            // style={{ width: width / 1.4, height: 250 }}
                            style={{width: 250, height: 300}}
                            resizeMode={'cover'}
                        />
                    </View>
                    <Text style={styles.cardText}>
                        {this.props.item.name}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }
}