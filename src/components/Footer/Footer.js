import React from 'react';
import classNames from 'classnames';
import Container from 'react-bootstrap/Container';
import packageInfo from '../../../package.json';

const Footer = () => (
    <Container
        as="footer"
        className={classNames('my-4', 'text-center', 'text-muted')}
    >
        &copy; {new Date().getFullYear()}{' '}
        <a
            href="https://grantburry.com"
            target="_blank"
            rel="noopener noreferrer"
        >
            Grant Burry
        </a>
        <span className="mx-2">&middot;</span>
        {process.env.NODE_ENV === 'development' ? (
            <span className="text-danger">Development Mode</span>
        ) : (
            'All rights reserved'
        )}
        <br />
        Version {packageInfo.version}
    </Container>
);

export default Footer;
