import { extendTheme } from 'native-base';

export const THEME = extendTheme({
  colors: {
    blue: {
      500: '#364D9D',
      200: '#647AC7',
      50: '#647AC71A'
    },
    
    gray: {
      700: '#F7F7F8',
      600: '#EDECEE',
      500: '#D9D8DA',
      400: '#9F9BA1',
      300: '#5F5B62',
      200: '#3E3A40',
      100: '#1A181B'
    },
    white: '#FFFFFF',
    red: {
      500: '#EE7979'
    }
  },
  fonts: {
    body: 'Karla_400Regular',
    heading: 'Karla_700Bold',
  },
  fontSizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
  },
});
