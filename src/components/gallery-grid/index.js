import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import PopupDialog from 'react-native-popup-dialog';
import GridView from 'react-native-super-grid';
import FastImage from 'react-native-fast-image';
import Header from '../header';
import { width, height } from '../../constants';
import { observer, inject } from 'mobx-react/native';
import PhotoBrowser from 'react-native-photo-browser';
import Gallery from '../gallery';

import styles from './styles';

@inject('galleryStore') @observer
export default class GalleryGrid extends Component {
    render() {
        const { allImages } = this.props.galleryStore;
        return (
            <View style={{flex: 1}}>
        
                <PhotoBrowser
                    mediaList={allImages}
                    startOnGrid
                    enableGrid
                    square
                    displayNavArrows
                    onBack={() => {this.props.navigation.goBack()}}
                />
            </View>
        )
    }
    componentWillMount() {
        this.props.galleryStore.fetchImages()
    }
}