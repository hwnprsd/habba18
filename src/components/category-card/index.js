import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, Dimensions } from 'react-native';
import FastImage from 'react-native-fast-image';
import FitImage from 'react-native-fit-image';
import ElevatedView from 'react-native-elevated-view';
import { ParallaxImage } from 'react-native-snap-carousel';

import styles from './styles';

export default class EventCard extends Component {
    state = Dimensions.get("window");
    handler = dims => this.setState(dims.window);

    componentWillMount() {
        Dimensions.addEventListener("change", this.handler);
    }

    componentWillUnmount() {
        Dimensions.removeEventListener("change", this.handler);
    }
    _onEventPress = item => {
        this.props.navigation.navigate('EventDetail', { item });
    }
    _onCardPress = () => {
        const { index, item } = this.props;
        this.props.setIndex({ index: index, name: item.name });
        this.props.navigate('EventList', { categoryName: item.name, url: item.url });
    }
    render() {
        const { width, height } = this.state;
        let _width = width / 1.5;
        let _height = height / 1.7
        // return (
        //     <TouchableOpacity style={[styles.container, { width: width / 1.5, height: height / 1.8 }]} onPress={this._onCardPress} activeOpacity={0.7}>
        //         <View elevation={10} style={styles.cardContainer}>
        //             <View style={{}}>
        //                 <FastImage
        //                     source={{ uri: this.props.item.url || 'https://i.ytimg.com/vi/ScMzIvxBSi4/maxresdefault.jpg' }}
        //                     style={{ width: width / 1.5, height: height / 1.8 }}
        //                     // style={{width: 250, height: 300, overflow: 'hidden'}}
        //                     resizeMode={'cover'}
        //                 />
        //             </View>
        //             <View style={styles.cardText}>
        //                 <Text style={styles.text}>
        //                     {this.props.item.name || ''}
        //                 </Text>
        //                 <Text style={[styles.text, { fontSize: 15 }]}>
        //                     {this.props.item.length + ' Events' || ''}
        //                 </Text>
        //             </View>
        //         </View>
        //     </TouchableOpacity>
        // )
        return (
            <TouchableOpacity
                style={{ width: _width, height: _height, flex: 1, justifyContent: 'center', }}
                onPress={this._onCardPress} activeOpacity={1}
            >
                <View>
                    <ParallaxImage
                        source={{ uri: this.props.item.url }}
                        style={{ width: _width, height: _height, }}
                        containerStyle={{ width: _width, height: _height, }}
                        resizeMode="cover"
                        {...this.props.parallaxProps}
                    />
                    <View style={styles.cardText}>
                        <Text style={styles.text}>
                            {this.props.item.name || ''}
                        </Text>
                        <Text style={[styles.text, { fontSize: 15 }]}>
                            {this.props.item.length + ' Events' || ''}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}