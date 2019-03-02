import React from 'react';
import Helmet from 'react-helmet';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navbar from '../Navbar';
import Generator from '../Generator';
import NotFound from '../NotFound';
import Footer from '../Footer';
import withAnalytics from '../withAnalytics';
import './App.scss';

const App = () => (
    <BrowserRouter>
        <>
            <Navbar />
            <Helmet
                defaultTitle={process.env.REACT_APP_TITLE}
                titleTemplate={`${process.env.REACT_APP_TITLE} » %s`}
            />
            <Switch>
                <Route path="/" component={Generator} />
                <Route component={NotFound} />
            </Switch>
            <Footer />
        </>
    </BrowserRouter>
);

export default withAnalytics(App);
