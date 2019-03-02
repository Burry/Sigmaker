import React, { useState } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import classNames from 'classnames';
import PhoneNumber from 'awesome-phonenumber';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faUserTag,
    faEnvelope,
    faPhone,
    faCheck,
    faClipboard
} from '@fortawesome/pro-solid-svg-icons';
import InfoInput from './InfoInput';
import InfoFormGroup from './InfoFormGroup';
import Signature, { signatureHeader } from './Signature';
import styles from './Generator.module.scss';

const newPhoneNumber = value => new PhoneNumber(value, 'US');
const phoneNumber = value =>
    newPhoneNumber(value).getNumber('national') || value;
const phoneUri = value =>
    newPhoneNumber(value).getNumber('rfc3966') || `tel:${value}`;

const Generator = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [role, setRole] = useState('');
    const [roleEnabled, setRoleEnabled] = useState(true);
    const [email, setEmail] = useState('');
    const [emailEnabled, setEmailEnabled] = useState(true);
    const [phone, setPhone] = useState('');
    const [phoneEnabled, setPhoneEnabled] = useState(true);
    const [copied, setCopied] = useState(false);

    const ConnectedSignature = (
        <Signature
            contact={{
                firstName: { enabled: true, value: firstName },
                lastName: { enabled: true, value: lastName },
                role: { enabled: roleEnabled, value: role },
                email: { enabled: emailEnabled, value: email },
                phone: { enabled: phoneEnabled, value: phone },
                phoneUri: { enabled: true, value: phoneUri(phone) }
            }}
        />
    );

    const signatureString =
        signatureHeader + renderToStaticMarkup(ConnectedSignature);

    const handleChange = setState => ({ target: { value } }) => {
        setState(value);
        setCopied(false);
    };
    const handleChangeFirstName = handleChange(setFirstName);
    const handleChangeLastName = handleChange(setLastName);
    const handleChangeRole = handleChange(setRole);
    const handleChangeEmail = handleChange(setEmail);
    const handleChangePhone = ({ target: { value } }) => {
        setPhone(phoneNumber(value));
        setCopied(false);
    };

    const handleCopied = event => {
        if (event.preventDefault) event.preventDefault();
        setCopied(true);
    };

    return (
        <Container className={classNames('mt-4', 'mb-5')}>
            <Form onSubmit={handleCopied}>
                <Row>
                    <Col md={{ size: 6 }} lg={{ size: 5 }}>
                        <h1>Contact Information</h1>
                        <Form.Group as={Form.Row} controlId="firstName">
                            <Form.Label column sm={3}>
                                Name
                            </Form.Label>
                            <Col className="pr-2">
                                <InfoInput
                                    name="firstName"
                                    id="firstName"
                                    value={firstName}
                                    autoFocus
                                    onChange={handleChangeFirstName}
                                />
                            </Col>
                            <Col className="pl-2">
                                <InfoInput
                                    name="lastName"
                                    id="lastName"
                                    value={lastName}
                                    onChange={handleChangeLastName}
                                />
                            </Col>
                        </Form.Group>
                        <InfoFormGroup
                            name="role"
                            icon={faUserTag}
                            value={role}
                            enabled={roleEnabled}
                            handlers={{
                                onCheck: () => setRoleEnabled(!roleEnabled),
                                onChange: handleChangeRole
                            }}
                        />
                        <InfoFormGroup
                            name="email"
                            icon={faEnvelope}
                            value={email}
                            enabled={emailEnabled}
                            handlers={{
                                onCheck: () => setEmailEnabled(!emailEnabled),
                                onChange: handleChangeEmail
                            }}
                        />
                        <InfoFormGroup
                            name="phone"
                            icon={faPhone}
                            value={phone}
                            type="tel"
                            enabled={phoneEnabled}
                            handlers={{
                                onCheck: () => setPhoneEnabled(!phoneEnabled),
                                onChange: handleChangePhone
                            }}
                            prepend="US"
                        />
                    </Col>
                    <Col md={{ size: 6 }} lg={{ size: 7 }}>
                        <h1>Preview</h1>
                        <Card
                            body
                            className={classNames(styles.preview, 'mb-4')}
                        >
                            {ConnectedSignature}
                        </Card>
                        <div
                            className={classNames(
                                'mb-2',
                                'd-flex',
                                'align-items-center',
                                'justify-content-between'
                            )}
                        >
                            <h1 className="mb-0">HTML Signature</h1>
                            <CopyToClipboard
                                text={signatureString}
                                onCopy={handleCopied}
                            >
                                <Button
                                    type="submit"
                                    variant={copied ? 'success' : 'primary'}
                                >
                                    <FontAwesomeIcon
                                        icon={copied ? faCheck : faClipboard}
                                        fixedWidth
                                        className="mr-2"
                                    />
                                    {copied ? 'Copied' : 'Copy'}
                                </Button>
                            </CopyToClipboard>
                        </div>
                        <Card
                            as="pre"
                            body
                            bg="secondary"
                            border="secondary"
                            className={classNames(
                                styles.code,
                                'mb-0',
                                'pre-scrollable'
                            )}
                        >
                            {signatureString}
                        </Card>
                    </Col>
                </Row>
            </Form>
        </Container>
    );
};

export default Generator;
