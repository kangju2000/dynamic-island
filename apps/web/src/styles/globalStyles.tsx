import { Global, css } from '@emotion/react';

export function GlobalStyles() {
  return (
    <Global
      styles={css`
        html,
        body {
          width: 100%;
          height: 100%;
          -ms-overflow-style: none;
          -webkit-tap-highlight-color: transparent;
        }
        #root {
          width: 100%;
          height: 100%;
          background-color: #202020;
          color: white;
        }
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
          border: none;
          outline: none;
        }
        ::-webkit-scrollbar {
          display: none;
        }
      `}
    />
  );
}
