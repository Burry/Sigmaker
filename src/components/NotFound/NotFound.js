import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import Helmet from 'react-helmet';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerQuestion } from '@fortawesome/pro-solid-svg-icons';

const NotFound = () => (
    <Container className={classNames('py-5', 'text-center')}>
        <Helmet>
            <title>Not Found</title>
        </Helmet>
        <Row>
            <Col>
                <FontAwesomeIcon
                    icon={faMapMarkerQuestion}
                    size="5x"
                    className="mb-4 text-muted"
                />
                <h1>Oops!</h1>
                <p className="lead mb-4">
                    Looks like this page doesn&apos;t exist.
                </p>
                <Button as={Link} to="/" variant="primary">
                    Go Home
                </Button>
            </Col>
        </Row>
    </Container>
);

export default NotFound;
