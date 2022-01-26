import * as React from 'react';
import { useInput } from '@mui/base';
import { styled } from '@mui/system';

const blue = {
  200: '#80BFFF',
  400: '#3399FF',
};

const StyledInputElement = styled('input')(
  ({ theme }) => `
  width: 360px;
  font-size: 0.875rem;
  font-family: 'Manrope', sans-serif;
  font-weight: 400;
  line-height: 1.5;
  background: ${theme.palette.common.white};
  border: 1px solid ${theme.palette.grey[300]};
  border-radius: 8px;
  padding: 12px 12px;
  transition: all 200ms ease;

  &:hover {
    background: ${theme.palette.grey[100]};
    border-color: ${theme.palette.grey[400]};
  }

  &:focus {
    outline: 2px solid ${blue[200]};
    outline-offset: 2px;
  }
`
);

const CustomInput = React.forwardRef(function CustomInput(props, ref) {
  const { getRootProps, getInputProps } = useInput(props, ref);

  return (
    <div
      {...getRootProps()}
      style={{ display: 'flex', justifyContent: 'center' }}
    >
      <StyledInputElement {...props} {...getInputProps()} />
    </div>
  );
});

export default CustomInput;
