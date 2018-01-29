import React, { Component } from 'react';
import { View } from 'react-native';
import { observer, inject } from 'mobx-react/native';
import PhotoBrowser from 'react-native-photo-browser';

import styles from './styles';

@inject('galleryStore') @observer
export default class GalleryGrid extends Component {
    render() {
        const { allImages } = this.props.galleryStore;
        return (
            <View style={{ flex: 1 }}>

                <PhotoBrowser
                    mediaList={allImages}
                    startOnGrid
                    enableGrid
                    square
                    displayNavArrows
                    onBack={() => { this.props.navigation.goBack() }}
                />
            </View>
        )
    }
    componentWillMount() {
        this.props.galleryStore.fetchImages()
    }
}