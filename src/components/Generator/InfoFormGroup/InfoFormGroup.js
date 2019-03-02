import React from 'react';
import {
    string,
    shape,
    oneOfType,
    arrayOf,
    func,
    bool,
    node
} from 'prop-types';
import classNames from 'classnames';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
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
    type,
    value,
    enabled,
    handlers: { onCheck, onChange },
    append,
    prepend,
    ...props
}) => (
    <Form.Group as={Form.Row} controlId={name}>
        <Col sm={3} className={classNames('d-flex', 'align-items-center')}>
            <Form.Check
                custom
                checked={enabled}
                type="checkbox"
                id={`${name}-checkbox`}
                label={name.charAt(0).toUpperCase() + name.slice(1)}
                onChange={onCheck}
            />
        </Col>
        <Col>
            <InputGroup>
                <AddOn type="Prepend">{prepend}</AddOn>
                {prepend && <InputGroup.Prepend />}
                <InfoInput
                    name={name}
                    value={value}
                    disabled={!enabled}
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
    type: string,
    value: string.isRequired,
    enabled: bool.isRequired,
    handlers: shape({
        onCheck: func.isRequired,
        onChange: func.isRequired
    }).isRequired,
    append: node,
    prepend: node
};

InfoFormGroup.defaultProps = {
    type: 'text',
    append: null,
    prepend: null
};

export default InfoFormGroup;
