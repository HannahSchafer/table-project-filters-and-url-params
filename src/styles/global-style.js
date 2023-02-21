import { createGlobalStyle } from 'styled-components';
import screen from 'superior-mq';
import { bp, hover } from './helpers';

const GlobalStyle = createGlobalStyle`
  :root {
    /* New Colrs */
    --dark-green: #12252D;
    --brand-teal: #339999;
    --brand-orange: #EF7C52;
    --off-white: #F7F7F6;
    --dark-text: #404040;

    /* Brand Colors */
    --white: #FFF;
    --primary-green: var(--brand-teal);
    --off-green: var(--brand-teal);
    --ultrabright-green: #4ECEBF;
    --light-green: #DFF4F4;
    --orange: var(--brand-orange);
    --dark-orange: #CA3309;
    --yellow: #FD9940;
    --placeholder-gray: #767676;
    --black: #000;
    --border-gray: #BBB;
    --border-light: #DDE9E9;
    --gray-text: #595959;
    --burnt-orange: #ef7c52;
    --bright-orange: #ff8f32;
    --yellow-orange: #ffaf33;

    /* Status Colors */
    --error-red: #AD3514;
    --error-red-dark: #7B1D03;
    --error-red-light: #eed5ce;
    --success-green: #079540;
    --caution-yellow: #F0A410;

    /* Sizes */
    --border-radius: 6px;
    --container-width: 1240px;
    --container-small: 720px;
    --sidebar-width: 208px;
    --form-vertical-space: 24px;
    --impersonation-banner-height: 40px;

    /* Defaults */
    --border: 1px solid var(--border-gray);
    --tooltip-shadow: 2px 2px 12px rgba(0, 0, 0, .12);
    --focus-shadow: 0 4px 8px rgba(8, 56, 80, .16);
    --default-duration: .3s;
    --round-padding: 40px;

    ${screen.below(
      bp.portrait,
      `
      --round-padding: 24px;
    `
    )}

    ${screen.below(
      bp.mobile,
      `
      --round-padding: 16px;
    `
    )}
  }

  *,
  *::before,
  *::after { box-sizing: border-box; }

  body {
    margin: 0;
    font-family: Basier, helvetica, sans-serif;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: var(--black);
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-top: 0;
    font-weight: 600;
    line-height: 1;
    color: inherit;
  }

  h1,
  h2 {
    letter-spacing: -.01em;
  }

  h3,
  h4,
  h5,
  h6 {
    margin-bottom: .5em;
  }

  img { max-width: 100%; }

  figure { margin: 0; }

  form { position: relative; }

  input { outline: none; }

  button,
  a {
    outline: none;
    transition: color .3s;

    &::-moz-focus-inner { border: 0; }

    &:not(:disabled) { cursor: pointer; }
  }

  a {
    color: var(--link-color, var(--primary-green));

    ${hover(`
      color: var(--link-hover-color, var(--dark-green));
    `)}
  }
`;

export default GlobalStyle;
