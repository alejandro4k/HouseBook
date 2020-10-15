import React, {Component} from 'react';
import {
  Animated,
  Dimensions,
  Platform,
  Text,
  View,
  FlatList,
  StyleSheet,
} from 'react-native';
import {Easing} from 'react-native-reanimated';
import Lista from './Screens/Test/Lista';
import Detail from './Screens/Test/Detail';

import PropiedadesList from './Screens/Propiedades/Propiedades';
import Detalle from './Screens/DetallePropiedad/Detalle';
import {enableScreens} from 'react-native-screens';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';

import {NavigationContainer} from '@react-navigation/native';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
enableScreens();
const SharedElementsStack = createSharedElementStackNavigator();


const config = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 50,
    mass: 3,
    overshootClamping: false,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};
const close = {
  animation: 'timing',
  config: {
    duration: 300,
    easing: Easing.linear,
  },
};

const App = ({navigation}) => {
  return (
    <NavigationContainer>
      <SharedElementsStack.Navigator
        initialRouteName="Propiedades"
      /*   screenOptions={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }} */
        
        >
        <SharedElementsStack.Screen
          name="Propiedades"
          component={PropiedadesList}
          options={{headerShown: false}}
        />
        <SharedElementsStack.Screen
          name="DetallePropiedades"
          component={Detalle}
          options={{
            headerShown: false,
            /* cardStyleInterpolator: ({current: {progress}}) => {
              return {
                cardStyle: {
                  opacity: progress,
                },
              };
            }, */
          }}
          sharedElementsConfig={(route, otherRoute, showing) => {
            const {item} = route.params;
            
            if (otherRoute.name === 'Propiedades' && showing) {
             /*  console.log(`item.${item.id}.photo`);
              console.log(`item.${item.id}.titulo`); */
              return [
                {
                  id: `item.${item.id}.photo`,

                },
                {
                  id: `item.${item.id}.titulo`,
 
                },
              ];
            }
          }}
        />
      </SharedElementsStack.Navigator>
    </NavigationContainer>
  );
};

export default App;
