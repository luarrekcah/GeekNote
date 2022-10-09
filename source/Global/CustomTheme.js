import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from './colorScheme';

const CustomTheme = () => {
  const [color, setColor] = React.useState(Colors.purpledark);
  AsyncStorage.getItem('colorScheme').then(data => {
    console.log(data);
    /* if (data === null || data === '') {
      console.log('ta null mankkj');
      setColor(Colors.blacktheme);
    } else {
      console.log('bora de switch');
      switch (data) {
        case 'blacktheme':
          setColor(Colors.blacktheme);
          return Colors.blacktheme;
        case 'ligththeme':
          setColor(Colors.lightheme);
          return Colors.lightheme;
        case 'purpledark':
          setColor(Colors.purpledark);
          return Colors.purpledark;
        case 'darkness':
          setColor(Colors.darkness);
          return Colors.darkness;
        default:
          setColor(Colors.blacktheme);
          return Colors.blacktheme;
      }
    }*/
  });

  console.log('retorn');
  return color;
};

export default CustomTheme;
