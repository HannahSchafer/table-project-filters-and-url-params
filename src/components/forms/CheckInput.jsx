import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import screen from 'superior-mq';
import { bp } from 'styles/helpers';
import VisuallyHidden from 'components/VisuallyHidden';

const CheckWrap = styled.div`
  vertical-align: top;
  display: inline-block;
  text-align: left;

  ${screen.below(
    bp.portrait,
    `
    display: block;
  `
  )}


`;

const StyledCheck = styled.input`
  &:checked,
  &:not(:checked) {
  }

  &:focus + label::before {
    box-shadow: 0 0 6px var(--primary-green);
  }

  + label::after {
    background: url('/images/check.svg');
    background-position: center;
    transition: all 0.3s ease;
    z-index: 1;
    transform: scale(0);
    opacity: 0;
  }

  &:checked + label::after {
    opacity: 1;
    transform: scale(1);
  }
`;

const LabelText = ({ boldLabel = false, hideLabel, children, ...props }) =>
  hideLabel ? (
    <VisuallyHidden as="span" {...props}>
      {children}
    </VisuallyHidden>
  ) : (
    <span {...props} style={{ fontWeight: props.boldLabel ? 500 : undefined }}>
      {children}
    </span>
  );

const CheckInput = React.forwardRef(
  (
    {
      name,
      onChange,
      onBlur,
      id,
      label,
      checked,
      className,
      hideLabel,
      boldLabel = false,
      ...props
    },
    ref
  ) => (
    <CheckWrap className={className}>
      <StyledCheck
        name={name}
        id={id}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        onBlur={onBlur}
        ref={ref}
        {...props}
      />
      <label htmlFor={id}>
        <LabelText boldLabel={boldLabel} hideLabel={hideLabel}>
          {label}
        </LabelText>
      </label>
    </CheckWrap>
  )
);

CheckInput.propTypes = {
  name: PropTypes.string,
  checked: PropTypes.bool,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  id: PropTypes.string,
  label: PropTypes.string,
  hideLabel: PropTypes.bool,
  className: PropTypes.string,
};

export default CheckInput;
