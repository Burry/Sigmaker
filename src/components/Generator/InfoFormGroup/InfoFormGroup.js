import React from 'react';
import {
    string,
    shape,
    bool,
    oneOfType,
    arrayOf,
    func,
    node
} from 'prop-types';
import classNames from 'classnames';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import InfoInput from '../InfoInput';

const AddOn = ({ type, text, children }) => {
    const InputGroupAddon = InputGroup[type];
    if (!children) return null;
    return text ? (
        <InputGroupAddon>
            <InputGroup.Text>{children}</InputGroup.Text>
        </InputGroupAddon>
    ) : (
        <InputGroupAddon as={children} />
    );
};

AddOn.propTypes = {
    type: string.isRequired,
    text: oneOfType([string, bool]).isRequired,
    children: oneOfType([node, arrayOf(node)])
};

AddOn.defaultProps = {
    children: null
};

const InfoFormGroup = ({
    name,
    input,
    onChange,
    required,
    disabled,
    customInput: CustomInput,
    append,
    appendText,
    prepend,
    prependText,
    ...props
}) => {
    const normalizedName = name
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, str => str.toUpperCase());
    const inputProps = { name, input, onChange, required, disabled, ...props };
    return (
        <Form.Group as={Form.Row} controlId={name} className="my-3">
            {required || disabled ? (
                <Form.Label column sm={3} lg={4}>
                    <span className="pl-sm-4">{normalizedName}</span>
                </Form.Label>
            ) : (
                <Col
                    sm={3}
                    lg={4}
                    className={classNames('d-flex', 'align-items-center')}
                >
                    <Form.Check
                        custom
                        checked={input.enabled}
                        type="checkbox"
                        name={name}
                        id={`${name}-checkbox`}
                        aria-label={`Enable ${name}`}
                        label={normalizedName}
                        onChange={onChange}
                    />
                </Col>
            )}
            <Col>
                {CustomInput ? (
                    <CustomInput {...inputProps} />
                ) : (
                    <InputGroup>
                        <AddOn type="Prepend" text={prependText}>
                            {prepend || prependText}
                        </AddOn>
                        <InfoInput {...inputProps} />
                        <AddOn type="Append" text={appendText}>
                            {append || appendText}
                        </AddOn>
                    </InputGroup>
                )}
            </Col>
        </Form.Group>
    );
};

InfoFormGroup.propTypes = {
    name: string.isRequired,
    input: shape({}).isRequired,
    onChange: func.isRequired,
    required: bool,
    disabled: bool,
    customInput: oneOfType([node, arrayOf(node), func]),
    append: oneOfType([node, arrayOf(node), func]),
    appendText: oneOfType([node, arrayOf(node), func]),
    prepend: oneOfType([node, arrayOf(node), func]),
    prependText: oneOfType([node, arrayOf(node), func])
};

InfoFormGroup.defaultProps = {
    required: false,
    disabled: false,
    customInput: null,
    append: null,
    appendText: null,
    prepend: null,
    prependText: null
};

export default InfoFormGroup;
