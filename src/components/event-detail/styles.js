import { fonts, width, colors } from '../../constants';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    card: {
        borderRadius: 3,
        padding: 7,
        margin: 10
    },
    titleText: {
        fontFamily: fonts.latoBold,
        fontSize: 18
    },
    contentText: {
        fontFamily: fonts.latoRegular,
        fontSize: 16,
    },
    button: {
        textAlign: 'center',
        fontFamily: fonts.latoRegular,
        fontSize: 20,
        color: colors.primary
    }
})