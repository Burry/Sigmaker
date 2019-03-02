import React, { useEffect } from 'react';
import { shape, string } from 'prop-types';
import { Analytics } from 'aws-amplify';

// Configure Pinpoint analytics

const withAnalytics = WrappedComponent => {
    const AnalyticsComponent = ({ user: { id } }) => {
        useEffect(() => {
            const commonConfig = {
                enable: true,
                provider: 'AWSPinpoint',
                ...(id ? { attributes: { user: id } } : {})
            };
            if (process.env.NODE_ENV !== 'development') {
                // Session Tracking
                Analytics.autoTrack('session', commonConfig);

                // Page View Tracking
                Analytics.autoTrack('pageView', {
                    eventName: 'pageView',
                    type: 'SPA',
                    ...commonConfig
                });

                // Page Event Tracking
                Analytics.autoTrack('event', {
                    events: ['click', 'hover'],
                    selectorPrefix: 'data-event-',
                    ...commonConfig
                });
            }
        });
        return <WrappedComponent />;
    };

    AnalyticsComponent.propTypes = {
        user: shape({
            id: string
        })
    };

    AnalyticsComponent.defaultProps = {
        user: {
            id: null
        }
    };

    return AnalyticsComponent;
};

export default withAnalytics;
