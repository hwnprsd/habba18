import React, { Component } from 'react';
import { View, Text, FlatList, Image } from 'react-native';
import { observer, inject } from 'mobx-react/native';
import { UIActivityIndicator } from 'react-native-indicators';

import Header from '../header'
import styles from './styles'

@inject('memeStore') @observer
export default class Meme extends Component {
    _renderItem = ({ item }) => {
        return (
            <View style={styles.container}>
                <Text style={styles.authorName}>{item.name}</Text>
                <View style={{ flex: 1 }} style={styles.image}>
                    <Image source={{ uri: item.image }} style={{ width: 654 / 3, height: 571 / 4 }} />
                </View>
                <Text style={styles.caption}>{item.caption}</Text>
            </View>
        )
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <Header
                    title={'Meme'}
                    left={{
                        name: 'ios-arrow-back',
                        action: this.props.navigation.goBack
                    }} />
                {this.props.memeStore.isMemeFetching &&
                    <UIActivityIndicator animating />
                }
                <FlatList
                    ListHeaderComponent={() => <View style={{ marginTop: 15 }} />}
                    data={this.props.memeStore.allMemes}
                    keyExtractor={i => i.id}
                    renderItem={this._renderItem}
                />
            </View>
        )
    }
    componentWillMount() {
        this.props.memeStore.fetchMemes();
    }
}
