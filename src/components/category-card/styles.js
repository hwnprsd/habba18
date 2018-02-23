import { StyleSheet } from 'react-native';
import { width, height, fonts } from '../../constants';

export default StyleSheet.create({
    container: {
        justifyContent: 'center',
        paddingBottom: 18,
        flex: 1,

    },
    cardContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#040404',
        shadowOpacity: 0.3,
        shadowRadius: 20,
    },
    cardText: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 10,
        // backgroundColor: 'rgba(0,0,0,0.2)',
    },
    text: {
        textAlign: 'left',
        fontSize: 28,
        fontFamily: fonts.latoRegular,
        color: '#fff'
    },
    shadow: {
        position: 'absolute',
        top: 0,
        bottom: 25,
        shadowColor: 'black',
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 10 }, 
        shadowRadius: 10,
        borderRadius: 8
    },
    radiusMask: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 8,
        backgroundColor: 'white'
    },
    imageContainer: {
        marginBottom: -1, // Prevent a random Android rendering issue
        backgroundColor: 'white',
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
    },
    image: {
        ...StyleSheet.absoluteFillObject,
    }
})

