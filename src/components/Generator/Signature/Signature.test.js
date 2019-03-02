// eslint-ignore

import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { MemoryRouter as Router } from 'react-router-dom';
import Signature from './Signature';

it('renders without crashing', () => {
    const div = document.createElement('div');
    const Component = () => (
        <Router>
            <Signature />
        </Router>
    );
    render(<Component />, div);
    unmountComponentAtNode(div);
});
