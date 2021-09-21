import React from 'react';
import styled from 'styled-components';
import { CmpWithChildren } from '$types';

const StyledDrawer = styled('div')<{ width: number }>`
  ${(props) => props.theme.breakpoints.up('md')} {
    width: ${(props) => props.width}px;
    flex-shrink: 0;
  }
`;

export const DrawerWrapper: CmpWithChildren<{ width: number }> = ({ children, width }) => {
  return <StyledDrawer width={width}>{children}</StyledDrawer>;
};
