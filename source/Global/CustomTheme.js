import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from './colorScheme';

const CustomTheme = () => {
  const [color, setColor] = React.useState(Colors.blacktheme);
  AsyncStorage.getItem('colorScheme').then(data => {
    if (data === null || data === '') {
      setColor(Colors.blacktheme);
    } else {
      switch (data) {
        case 'blacktheme':
          setColor(Colors.blacktheme);
          break;
        case 'ligththeme':
          setColor(Colors.lightheme);
          break;
        case 'purpledark':
          setColor(Colors.purpledark);
          break;
        default:
          setColor(Colors.blacktheme);
          break;
      }
    }
  });

  return color;
};

export default CustomTheme;
