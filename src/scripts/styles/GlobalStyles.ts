import { createGlobalStyle } from 'styled-components';

import { theme } from './theme';

export const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'Open Sans Light';
    font-style: normal;
    font-weight: 300;
    src: local('Open Sans Light'), local('OpenSans-Light'),
      url('/assets/fonts/OpenSans-Light.woff2') format('woff2');
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  ::selection {
    background-color: ${theme.colors.lightGrey};
  }

  html,
  body {
    height: 100%;
    width: 100%;
  }

  html {
    background-color: ${theme.colors.darkGrey};
    color: ${theme.colors.white};
    font-size: 16px;
  }

  body {
    font: 300 1em/1.5 ${theme.fonts.primary};
  }

  @media all and (min-width: 2000px) {
    html {
      font-size: 20px;
    }
  }

  hr {
    border: 0;
    border-top: 1px solid ${theme.colors.lightGrey};
    height: 0;
    width: 100%;
  }

  a {
    color: ${theme.colors.white};
    cursor: pointer;
    text-decoration: none;
  }

  ul {
    list-style: none;
  }

  h1,
  h2 {
    font-weight: 300;
    transition: font-size 0.3s;
  }

  h2 {
    font-size: 2em;
  }

  .copy {
    cursor: pointer;
  }

  .btn {
    background: none;
    border: 1px solid ${theme.colors.lightGrey};
    cursor: pointer;
    color: ${theme.colors.white};
    font: inherit;
    font-size: 0.85em;
    padding: 0.25em 0.5em;
  }

  @keyframes shiftUp {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
