import React from 'react';
import styled from 'styled-components';

const CenterVertically = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
`;

const CenterHorizontally = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const CenterContent = React.forwardRef<
  HTMLDivElement,
  { children?: React.ReactNode | undefined }
>(({ children }, ref) => (
  <CenterVertically ref={ref}>
    <CenterHorizontally>{children}</CenterHorizontally>
  </CenterVertically>
));
