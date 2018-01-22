import React, { Component } from 'react';
import { View, Text, Image, Dimensions } from 'react-native';

import styles from './styles';

const { width } = Dimensions.get('window');

export default class EventCard extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.cardContainer}>
                    <View style={{}}>
                        <Image
                            source={{ uri: this.props.item.imgUri || "http://www.nelsonvenues.co.nz/uploads/1/0/1/2/101257066/event-placeholder_1_orig.jpg" }}
                            style={{ width: width / 1.4, height: 250 }}
                        />
                    </View>
                    <Text style={styles.cardText}>
                        {this.props.item.name}
                    </Text>
                </View>
            </View>
        )
    }
}