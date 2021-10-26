import { Platform } from 'react-native';

const theme = {
  colors: {
    appBarBackgroundColor: '#24292e',
    appBarTextColor: 'white',
    textSecondary: '#586069',
  },
  fonts: {
    main: Platform.select({
      default: 'san-serif',
      android: 'roboto',
      ios: 'arial',
    }),
  },
};

export default theme;
