import React from 'react';
import styled, { keyframes } from 'styled-components';
import { position } from 'polished';
import screen from 'superior-mq';
import { bp } from 'styles/helpers';

const rotate = keyframes`
  0% {
    transform: rotate(135deg);
  }
  100% {
    transform: rotate(495deg);
  }
`;

const Spinner = styled.div`
  margin: auto;
  border: var(--stroke) solid rgba(0, 0, 0, 0.2);
  border-left: var(--stroke) solid var(--color);
  transform: translateZ(0);
  animation: ${rotate} 0.8s infinite linear;

  &,
  &::after {
    border-radius: 50%;
    width: var(--size);
    height: var(--size);
  }
`;

const StyledLoading = styled.div`
  ${(props) =>
    position('fixed', 0, 0, 0, props.noSideBar ? 0 : 'var(--sidebar-width)')}
  --size: 3rem;
  --stroke: 3px;
  --color: var(--primary-green);
  display: flex;
  background-color: #fff;

  ${screen.below(
    bp.tablet,
    `
    left: 0;
  `
  )}
`;

const Loading = ({ className, noSideBar }) => (
  <StyledLoading className={className} noSideBar={noSideBar}>
    <Spinner />
  </StyledLoading>
);

export const SmallLoading = styled(Loading)`
  position: relative;
  width: 100%;
  min-height: 200px;
  left: initial;
`;

export default Loading;
