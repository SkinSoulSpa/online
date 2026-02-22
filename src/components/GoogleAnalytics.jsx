import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ReactGA from 'react-ga4';

// TODO: Replace with your actual Google Analytics Measurement ID (starts with G-)
const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX'; 

const GoogleAnalytics = () => {
  const location = useLocation();

  useEffect(() => {
    if (GA_MEASUREMENT_ID !== 'G-XXXXXXXXXX') {
      ReactGA.initialize(GA_MEASUREMENT_ID);
    }
  }, []);

  useEffect(() => {
    if (GA_MEASUREMENT_ID !== 'G-XXXXXXXXXX') {
      ReactGA.send({ hitType: "pageview", page: location.pathname + location.search });
    }
  }, [location]);

  return null;
};

export default GoogleAnalytics;
