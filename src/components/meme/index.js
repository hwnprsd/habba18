import React, {Component} from 'react'
import {View, Text, FlatList, Image} from 'react-native'
import {observer, inject} from 'mobx-react/native'

import Header from '../header'
// import styles from './styles'

@inject('memeStore')@observer
export default class Meme extends Component {
    _renderItem = ({item}) => {
        return(
            <View style={{flex: 1}}>
                <Text>{item.name}</Text>
                <View style={{flex: 1}}>
            <Image source={{uri: item.image}} style={{width: 654/3, height: 571/4}} />
                </View>
            <Text>{item.caption}</Text>
            </View>
        )
    }
    render() {
        return (
            <FlatList
                style={{flex: 1}}
                ListHeaderComponent={() => <Header
                    title={'Meme'}
                    color="#000"
                    left={{
                    name: 'ios-arrow-back'
                }}/>}
                data={this.props.memeStore.allMemes}
                keyExtractor={i => i.id}
                renderItem={this._renderItem}
            />
        )
    }
    componentWillMount() {
        this.props.memeStore.fetchMemes();
    }
}
