import { Global, css } from '@emotion/react';

export function GlobalStyles() {
  return (
    <Global
      styles={css`
        @font-face {
          font-family: 'SF Pro';
          src: url(./fonts/SF-Pro-Display-Regular.otf) format('opentype');
        }

        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
          border: none;
          outline: none;
          font-family: 'SF Pro', sans-serif;
        }

        html,
        body {
          width: 100%;
          height: 100%;
          -ms-overflow-style: none;
          -webkit-tap-highlight-color: transparent;
        }
        svg {
          vertical-align: middle;
        }
        #root {
          width: 100%;
          height: 100%;
          background-color: #202020;
          color: white;
        }

        ::-webkit-scrollbar {
          display: none;
        }
      `}
    />
  );
}
