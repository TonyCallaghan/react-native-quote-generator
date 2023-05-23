import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const appStyles = StyleSheet.create({
  container: {
    paddingTop: 100,
    paddingBottom: 50,
  },
  colors: [
    {
      initialBgColor: 'goldenrod',
      bgColor: '#222',
      nextBgColor: '#222',
    },
    {
      initialBgColor: 'goldenrod',
      bgColor: '#222',
      nextBgColor: 'yellowgreen',
    },
    {
      initialBgColor: '#222',
      bgColor: 'yellowgreen',
      nextBgColor: 'midnightblue',
    },
    {
      initialBgColor: 'yellowgreen',
      bgColor: 'midnightblue',
      nextBgColor: 'turquoise',
    },
    {
      initialBgColor: 'midnightblue',
      bgColor: 'turquoise',
      nextBgColor: 'goldenrod',
    },
    {
      initialBgColor: 'turquoise',
      bgColor: 'goldenrod',
      nextBgColor: '#222',
    },
    {
      initialBgColor: 'goldenrod',
      bgColor: '#222',
      nextBgColor: 'yellowgreen',
    },
  ],
  width: width,
});