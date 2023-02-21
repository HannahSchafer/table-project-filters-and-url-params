import { createTheme } from 'react-data-table-component';

const theme = {
  white: '#fff',
  black: '#16191a',
  darkBlack: '#0f1111',
  gray: '#515151',
  darkGray: '#3e3e3e',
  lightGray: '#f4f4f4',
  error: '#ef1717',
  focusOutline: '2px dotted #949494',
  gridCols: 12,
};

// Theme for react-data-table-component
createTheme('BL', {
  text: {
    primary: theme.navy,
    secondary: theme.gray,
  },
  divider: {
    default: theme.navy,
  },
});

export default theme;
