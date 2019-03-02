import React from 'react';
import {
    string,
    oneOfType,
    object,
    array,
    arrayOf,
    func,
    bool,
    node
} from 'prop-types';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import InfoInput from '../InfoInput';

const AddOn = ({ type, children }) => {
    const InputGroupAddon = InputGroup[type];
    return children ? (
        <InputGroupAddon>
            <InputGroup.Text>{children}</InputGroup.Text>
        </InputGroupAddon>
    ) : null;
};

AddOn.propTypes = {
    type: string.isRequired,
    children: oneOfType([node, arrayOf(node)])
};

AddOn.defaultProps = {
    children: null
};

const InfoFormGroup = ({
    name,
    icon,
    value,
    type,
    onChange,
    autoFocus,
    append,
    prepend,
    ...props
}) => (
    <Form.Group as={Form.Row} controlId={name}>
        <Form.Label column sm={4}>
            <FontAwesomeIcon icon={icon} fixedWidth className="mr-2" />
            {name.charAt(0).toUpperCase() + name.slice(1)}
        </Form.Label>
        <Col>
            <InputGroup>
                <AddOn type="Prepend">{prepend}</AddOn>
                {prepend && <InputGroup.Prepend />}
                <InfoInput
                    name={name}
                    value={value}
                    autoFocus={autoFocus}
                    onChange={onChange}
                    {...props}
                />
                <AddOn type="Append">{append}</AddOn>
            </InputGroup>
        </Col>
    </Form.Group>
);

InfoFormGroup.propTypes = {
    name: string.isRequired,
    icon: oneOfType([object, array, string]).isRequired,
    value: string.isRequired,
    type: string,
    onChange: func.isRequired,
    autoFocus: bool,
    append: node,
    prepend: node
};

InfoFormGroup.defaultProps = {
    type: 'text',
    autoFocus: false,
    append: null,
    prepend: null
};

export default InfoFormGroup;
