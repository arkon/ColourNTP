export const theme = {
  colors: {
    white: '#fff',
    darkGrey: '#111',
    grey: '#292929',
    lightGrey: '#6b6b6b',
  },
  zIndex: {
    below: -1,
    default: 0,
    above: 1,
    sidebar: 10,
    top: 20,
  },
  fonts: {
    primary: "'Open Sans Light', 'Helvetica', 'Arial', sans-serif",
  },
} as const;

export type Theme = typeof theme;
