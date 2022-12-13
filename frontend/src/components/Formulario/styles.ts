import styled, { css } from 'styled-components';

export const MainContainer = styled.div`
  ${() => css`
    width: 100%;
    height: 100%;

    .form-group {
      margin-bottom: 2rem;
    }

    p { 
      font-weight: bold;
    }

    .classes {
      display: flex;
      .select-options {
        margin-left: 1.6rem;
        margin-top: 1.6rem;
        width: 25%;
      }
    }

    .variables {
      display: flex;
      margin-top: 2rem;

      .number-input {
        margin-left: 1.6rem;
        .md {
          width: 45%;
        }
      }
    }
  `}
`
