import { fonts, width, colors } from '../../constants';
import { StyleSheet } from 'react-native';

const inpColor = '#616161';
const mainColor = '#424242';
export default StyleSheet.create({
    card: {
        padding: 7,
        // backgroundColor: 'rgba(0,0,0,0.4)',
        marginTop: 10,
        marginBottom: 50,
        shadowColor: 'rgba(0,0,0,0.5)',
        shadowOpacity: 0.5,
        shadowRadius: 20,
        borderRadius: 5,
    },
    titleText: {
        fontFamily: fonts.latoBold,
        fontSize: 18,
        marginBottom: 7,
        color: mainColor
    },
    contentText: {
        fontFamily: fonts.latoRegular,
        fontSize: 16,
        color: inpColor
    },
    button: {
        textAlign: 'center',
        fontFamily: fonts.latoRegular,
        fontSize: 20,
        color: mainColor
    },
    readMore: {
        color: mainColor,
        fontFamily: fonts.latoBold,
        marginTop: 5
    },
    contain: {
        marginBottom: 10,
        paddingHorizontal: 10
    }
})