import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { ReactComponent as Logo } from './logo.svg';
import { ReactComponent as LogoText } from './logo-text.svg';

const CustomNavbar = () => (
    <Container>
        <Navbar className="px-0">
            <Navbar.Brand
                as={Link}
                to="/"
                className={classNames('d-flex', 'align-items-center')}
                aria-label="Sigmaker"
            >
                <Logo height={40} className="mr-2" />
                <LogoText height={20} />
            </Navbar.Brand>
        </Navbar>
    </Container>
);

export default CustomNavbar;
