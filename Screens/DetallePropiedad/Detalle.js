import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Image,
} from 'react-native';
import {dimensionsTheme} from '../theme';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {SharedElement} from 'react-native-shared-element';

const {ITEM_HEIGHT, ITEM_WITH, RADIUS, Spacing, FULL_SIZE} = dimensionsTheme;

const Detalle = ({navigation, route}) => {
  const {item} = route.params;
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.goBack}>
        <MaterialCommunityIcons
          name="keyboard-backspace"
          size={50}
          color="#fff"
        />
      </TouchableOpacity>
      <SharedElement
        id={`item.${item.id}.photo`}
        style={StyleSheet.absoluteFillObject}>
        <Image
          source={{uri: item.urlImg}}
          style={[StyleSheet.absoluteFillObject, {resizeMode: 'cover'}]}
        />
      </SharedElement>
      <SharedElement id={`item.${item.id}.titulo`}>
        <Text style={[styles.titulo]}>{item.titulo}</Text>
      </SharedElement>
      {/* <SharedElement id="iconHeart" style={StyleSheet.absoluteFillObject}>
          <MaterialCommunityIcons
            name="heart-outline"
            color="#0984e3"
            size={100}
            style={{position: 'absolute', top: Spacing, right:Spacing}}
          />
        </SharedElement> */}
    </SafeAreaView>
  );
};

/* Detalle.sharedElements = (route, otherRoute, showing) => {
  const {item} = route.params;
  return [`item.${item.id}.photo`];
}; */

export default Detalle;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
  goBack: {
    paddingHorizontal: Spacing,

    zIndex: 2,
  },
  titulo: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    width: ITEM_WITH * 0.8,
    textTransform: 'uppercase',

    paddingTop: Spacing,
    paddingLeft: Spacing * 2,
  },
});
