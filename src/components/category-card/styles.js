import { StyleSheet } from 'react-native';
import { width, height, fonts } from '../../constants';

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        width: width / 1.5,
        height: height / 1.8
    },
    cardContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#040404',
    },
    cardText: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 10,
        backgroundColor: 'rgba(0,0,0,0.33)',
    },
    text: {
        textAlign: 'left',
        fontSize: 20,
        fontFamily: fonts.latoRegular,
        color: '#fff'
    }
})

