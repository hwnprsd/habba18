import { StyleSheet } from 'react-native';
import { fonts } from '../../constants';

export default StyleSheet.create({
  gridView: {
    paddingTop: 25,
    flex: 1,
    backgroundColor: "#e5e5e5"
  },
  itemContainer: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    borderRadius: 5,
    paddingBottom: 10,
    paddingLeft: 0,
    height: 145,
    overflow:'hidden',
    backgroundColor: '#fff',
  },
  itemName: {
    fontSize: 15,
    color: '#0f0f0f',
    marginTop: 3
  },
  image: {
    width: 170,
    height: 150,
    flex: 1,
    margin: 0
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