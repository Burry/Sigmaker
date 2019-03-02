// eslint-ignore

import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { MemoryRouter as Router } from 'react-router-dom';
import InfoFormGroup from './InfoFormGroup';

it('renders without crashing', () => {
    const div = document.createElement('div');
    const Component = () => (
        <Router>
            <InfoFormGroup />
        </Router>
    );
    render(<Component />, div);
    unmountComponentAtNode(div);
});
