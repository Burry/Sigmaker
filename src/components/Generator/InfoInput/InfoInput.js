import React from 'react';
import { shape, string, bool, oneOfType, node, arrayOf } from 'prop-types';
import Form from 'react-bootstrap/Form';

const InfoInput = ({
    input: { enabled, value, placeholder },
    disabled,
    children,
    ...props
}) => (
    <Form.Control
        value={value}
        placeholder={placeholder}
        disabled={disabled || !enabled}
        {...props}
    >
        {children}
    </Form.Control>
);

InfoInput.propTypes = {
    input: shape({}).isRequired,
    type: string,
    disabled: bool,
    children: oneOfType([node, arrayOf(node)])
};

InfoInput.defaultProps = {
    type: 'text',
    disabled: false,
    children: null
};

export default InfoInput;
