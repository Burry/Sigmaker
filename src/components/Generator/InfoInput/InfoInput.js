import React from 'react';
import { string, func, bool } from 'prop-types';
import Form from 'react-bootstrap/Form';
import placeholders from '../placeholders';

const InfoInput = ({ name, ...props }) => (
    <Form.Control placeholder={placeholders[name]} required {...props} />
);

InfoInput.propTypes = {
    name: string.isRequired,
    value: string.isRequired,
    type: string,
    onChange: func.isRequired,
    autoFocus: bool
};

InfoInput.defaultProps = {
    type: 'text',
    autoFocus: false
};

export default InfoInput;
