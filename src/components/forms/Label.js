import { rem } from 'polished';
import styled from 'styled-components';

const Label = styled.label`
  display: inline-block;
  margin-bottom: 8px;
  font-size: ${rem(15)};
  font-weight: 500;

  ${(props) =>
    props.hideLabel &&
    `
      position: absolute;
      pointer-events: none;
      clip: rect(0 0 0 0);
      overflow: hidden;
    `}
`;

export default Label;
