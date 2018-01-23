import { StyleSheet } from 'react-native';
import { fonts } from '../../constants';

export default StyleSheet.create({
  gridView: {
    paddingTop: 25,
    flex: 1,
  },
  itemContainer: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    borderRadius: 5,
    padding: 10,
    height: 200,
    elevation: 5,
    backgroundColor: '#fff',
    flex: 1
  },
  itemName: {
    fontSize: 15,
    color: '#0f0f0f',
    marginTop: 3
  },
  itemCode: {
    fontWeight: '600',
    fontSize: 12,
    color: '#0f0f0f',
  },
  toolBarText: {
    fontSize: 20,
    textAlign: 'center',
    fontFamily: fonts.ubuntuMedium,
  }
});