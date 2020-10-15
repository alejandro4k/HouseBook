import React, {Component} from 'react';
import {
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Animated,
  SafeAreaView,
} from 'react-native';
import {
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
  Caption,
} from 'react-native-paper';
import {Rating, AirbnbRating} from 'react-native-ratings';
import Populares from './Populares';
import {SharedElement} from 'react-navigation-shared-element';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {dimensionsTheme} from '../theme';
const {ITEM_HEIGHT, ITEM_WITH, RADIUS, Spacing, FULL_SIZE} = dimensionsTheme;

import DATA from '../PropiedadesData.json';

export default function Propiedades({navigation}) {
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const addCommas = (nStr) => {
    nStr += '';
    var x = nStr.split('.');
    var x1 = x[0];
    var x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
      x1 = x1.replace(rgx, '$1' + '.' + '$2');
    }
    return x1 + x2;
  };
  const renderParalaxCarrousel = (item, index) => {
    const inputRange = [
      (index - 1) * FULL_SIZE,
      index * FULL_SIZE,
      (index + 1) * FULL_SIZE,
    ];
    const translateX = scrollX.interpolate({
      inputRange,
      outputRange: [ITEM_WITH, 0, -ITEM_WITH],
    });
    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [1, 1.1, 1],
    });
    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => navigation.push('DetallePropiedades', {item})}>
        <SharedElement
          id={`item.${item.id}.photo`}
          style={StyleSheet.absoluteFillObject}>
          <Animated.Image
            source={{uri: item.urlImg}}
            style={[
              StyleSheet.absoluteFillObject,
              {resizeMode: 'cover', transform: [{scale}]},
            ]}
          />
        </SharedElement>
        <SharedElement id={`item.${item.id}.titulo`}>
          <Animated.Text style={[styles.titulo, {transform: [{translateX}]}]}>
            {item.titulo}
          </Animated.Text>
        </SharedElement>

        <Animated.View style={{transform: [{translateX}]}}>
          <Caption style={[styles.precio, styles.precioContainer]}>
            {'$' + addCommas(item.precio)}
          </Caption>
        </Animated.View>
        <MaterialCommunityIcons
          name="heart-outline"
          color="#0984e3"
          size={30}
          style={{position: 'absolute', bottom: Spacing, left: Spacing}}
        />
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
       
        marginTop: 10,
      }}>
      <Animated.FlatList
        data={DATA.data}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={FULL_SIZE}
        decelerationRate="fast"
        onScroll={Animated.event(
          [
            {
              nativeEvent: {contentOffset: {x: scrollX}},
            },
          ],
          {useNativeDriver: true},
        )}
       
        renderItem={({item, index}) => renderParalaxCarrousel(item, index)}
        keyExtractor={(item) => item.id}
      />

      {/* <TouchableOpacity
        style={StyleSheet.absoluteFillObject}
        onPress={() => navigation.navigate('DetallePropiedades')}>
        <SharedElement id="iconHeart" style={StyleSheet.absoluteFillObject}>
          <MaterialCommunityIcons
            name="heart-outline"
            color="#0984e3"
            size={100}
            style={{position: 'absolute', bottom: Spacing, left: Spacing}}
          />
        </SharedElement>
      </TouchableOpacity> */}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  itemContainer: {
    width: ITEM_WITH,
    height: ITEM_HEIGHT,
    margin: Spacing,
    overflow: 'hidden',
    borderRadius: RADIUS,
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    width: ITEM_WITH * 0.8,
    textTransform: 'uppercase',

    paddingTop: Spacing,
    paddingLeft: Spacing,
  },
  precio: {
    color: '#fff',

    textDecorationLine: 'underline',
    paddingLeft: Spacing,
    fontWeight: 'bold',
  },
  precioContainer: {
    backgroundColor: 'rgba(178, 190, 195, 0.68)',

    borderRadius: 10,
    width: 150,
  },
});
