import { StyleSheet } from 'react-native';
import { fonts } from '../../constants';

export default StyleSheet.create({
    elevatedCard: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.3)',
        margin: 30, width: '90%',
        height: '100%',
        alignSelf: 'center',
        marginBottom: 300,
        shadowColor: 'rgba(0,0,0,0.4)',
        shadowOpacity: 0.7,
        shadowRadius: 20,
    },
    scrollView: {
        position: 'absolute',
        top: 0,
        paddingTop: 100,
        flex: 1,
        width: '100%',
        height: '100%'
    },
    text: {
        fontFamily: fonts.latoRegular,
        color: 'white',
        fontSize: 30,
    },
    textValue: {
        fontFamily: fonts.latoRegular,
        color: '#e5e5e5',
        fontSize: 18
    },
    textLabel: {
        fontFamily: fonts.latoBold,
        color: 'white',
        fontSize: 13,
        marginBottom: 10
    },
    textItem: {
        fontFamily: fonts.latoRegular,
        fontSize: 10,
    },
    touchable: {
        marginVertical: 5 
    }
})