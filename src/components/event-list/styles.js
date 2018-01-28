import { StyleSheet } from 'react-native';
import { fonts, width, height } from '../../constants';

export default StyleSheet.create({
  gridView: {
    paddingTop: 25,
    flex: 1,
  },
  itemContainer: {
    alignItems: 'center',
    borderRadius: 3,
    padding: 0,
    height: 145,
    flex: 1,
    width: width/2.2,
    overflow:'hidden',
    backgroundColor: '#fff',
  },
  itemName: {
    fontSize: 15,
    color: '#0f0f0f',
    fontFamily: fonts.latoRegular,
    margin: 5
  },
  image: {
    width: width/2.2,
    alignSelf: 'center',
    height: 150,
    flex: 1,
  },

  itemCode: {
    fontWeight: '600',
    fontSize: 12,
    color: '#0f0f0f',
  },
  toolBarText: {
    fontSize: 24,
    textAlign: 'center',
    fontFamily: fonts.latoLight,
    color: "#fff"
  }
});