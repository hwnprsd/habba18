import { StyleSheet } from 'react-native';
import { width, height, fonts } from '../../constants';

export default StyleSheet.create({
    container: { 
        flex: 1, 
        justifyContent: 'center' ,
        width: width / 1.5, 
        height: height/3.4
    },
    cardContainer: { 
        justifyContent: 'center', 
        alignItems: 'center', 
        backgroundColor: '#040404',
    },
    cardText: { fontSize: 20, margin: 10, fontFamily: fonts.latoRegular, color: '#fff' }
})

