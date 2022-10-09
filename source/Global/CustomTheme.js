import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from './colorScheme';

const CustomTheme = () => {
  const [color, setColor] = React.useState(Colors.darkness);
  AsyncStorage.getItem('colorScheme').then(data => {
    setColor(Colors[data]);
  });

  return color;
};

export default CustomTheme;
