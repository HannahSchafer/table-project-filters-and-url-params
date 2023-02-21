import styled from 'styled-components';
import PropTypes from 'prop-types';

const VisuallyHidden = styled.div`
  position: absolute;
  top: 0;
  left: -999px;
  clip: rect(0, 0, 0, 0);
  pointer-events: none;
`;

VisuallyHidden.propTypes = {
  as: PropTypes.string,
};

export default VisuallyHidden;
