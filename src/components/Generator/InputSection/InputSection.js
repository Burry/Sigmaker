import React, { useState } from 'react';
import { string, bool, oneOfType, arrayOf, node } from 'prop-types';
import classNames from 'classnames';
import Collapse from 'react-bootstrap/Collapse';
import Card from 'react-bootstrap/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/pro-solid-svg-icons';
import styles from './InputSection.module.scss';

const InputSection = ({ title, collapse, children }) => {
    const [collapsed, setCollapsed] = useState(collapse);

    const handleCollapse = () => setCollapsed(!collapsed);

    return (
        <Card as="section">
            <Card.Header
                className={classNames(
                    styles.header,
                    'px-3',
                    'py-2',
                    'd-flex',
                    'align-items-center',
                    'justify-content-between',
                    'bg-light'
                )}
                onClick={handleCollapse}
            >
                <b>{title}</b>
                <small>
                    <FontAwesomeIcon
                        icon={collapsed ? faChevronUp : faChevronDown}
                    />
                </small>
            </Card.Header>
            <Collapse in={!collapsed}>
                <Card.Body>{children}</Card.Body>
            </Collapse>
        </Card>
    );
};

InputSection.propTypes = {
    title: string.isRequired,
    collapse: bool,
    children: oneOfType([node, arrayOf(node)]).isRequired
};

InputSection.defaultProps = {
    collapse: false
};

export default InputSection;
