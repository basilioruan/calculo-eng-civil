import styled, { css } from 'styled-components';

interface ImageBackgroundProps {
  path?: string;
  yAxis?: string;
}

export const MainContainer = styled.div`
  ${() => css`
    width: 100%;
    height: 100%;
  `}
`

export const ImageBackground = styled.div<ImageBackgroundProps>`
  ${({ path }) => css`
    width: 100%;
    height: 100%;

    margin 0 auto;
    background: url(${path}),
  `}
`;
