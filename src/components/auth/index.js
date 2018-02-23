import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';
import { SkypeIndicator } from 'react-native-indicators';
import { observer, inject } from 'mobx-react/native';

@inject('authStore') @observer
export default class Auth extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Icon.Button name="facebook" backgroundColor="#d34836" onPress={this.props.authStore.initGoogleLogin}>
                    <Text style={{ fontFamily: 'Arial', fontSize: 15, color: 'white' }}>Login with Google!</Text>
                    {this.props.authStore.isLoading && <SkypeIndicator animating />}
                </Icon.Button>
            </View>
        )
    }
}