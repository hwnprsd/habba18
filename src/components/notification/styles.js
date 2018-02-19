import { StyleSheet } from 'react-native';
import { fonts } from '../../constants';

textColor = '#e4e4e4';

export default StyleSheet.create({
    elevatedCard: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.25)',
        width: '90%',
        marginVertical: 2.5,
        height: '100%',
        alignSelf: 'center',
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
        color: textColor,
        fontSize: 30,
    },
    textValue: {
        fontFamily: fonts.latoRegular,
        color: '#e5e5e5',
        fontSize: 18
    },

    textName: {
        fontSize: 20,
        color: textColor,
        fontFamily: fonts.latoBold
    },
    textMessage: {
        fontSize: 13,
        color: textColor,
        fontFamily: fonts.latoRegular
    }
})