import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import PopupDialog from 'react-native-popup-dialog';
import GridView from 'react-native-super-grid';
import FastImage from 'react-native-fast-image';
import Header from '../header';
import { width, height } from '../../constants';
import { observer, inject } from 'mobx-react/native';
import Gallery from '../gallery';

import styles from './styles';

@inject('galleryStore') @observer
export default class GalleryGrid extends Component {
    state={
        show: false,
        id: 0
    }
    render() {
        const { allImages } = this.props.galleryStore;
        console.log(this.state.id)
        return (
            <View style={{flex: 1}}>
            <Header title={'Image Gallery'} left={{name: 'ios-arrow-back', action: this.props.navigation.goBack}} />
                <GridView
                    itemDimension={115}
                    items={allImages}
                    style={[styles.gridView, { height }]}
                    renderItem={(item) => (
                        <TouchableOpacity style={[styles.itemContainer]} onPress={() => this.setState({show: true, id: item.index})} >
                            <FastImage source={{ uri: item.source.uri }} style={styles.image} resizeMode="cover" />
                        
                        </TouchableOpacity>
                    )}
                />
                <PopupDialog
                show={this.state.show}
                    height={height}
                    style={{}}
                    ref={(popupDialog) => { this.popupDialog = popupDialog; }}
                    onDismissed={() => { this.setState({ show: false }) }}
                >
                    <Gallery images={allImages} index={this.state.id} nav={() => {
                        this.setState({show: false})
                    }} />
                </PopupDialog>
            </View>
        )
    }
}