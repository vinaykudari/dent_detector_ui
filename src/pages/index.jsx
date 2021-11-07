import React from 'react';
import { ThemeProvider } from 'styled-components';
import PropTypes from 'prop-types';
import { lightTheme } from '@constants/index';
import Home from '@composite/Home';
import MetaTags from '@composite/MetaTags';
import { ContextProvider as MobileContextProvider } from '@contexts/MobileContext';

const RootPage = ({ isServer, userAgent }) => {
  return (
    <>
      <MetaTags />
      <ThemeProvider theme={lightTheme}>
        <MobileContextProvider isServer={isServer} userAgent={userAgent}>
          <Home />
        </MobileContextProvider>
      </ThemeProvider>
    </>
  );
};

RootPage.propTypes = {
  isServer: PropTypes.bool.isRequired,
  userAgent: PropTypes.string.isRequired
};

RootPage.getInitialProps = ({ req }) => {
  const isServer = !!req;
  return {
    isServer,
    userAgent: isServer ? req.headers['user-agent'] : ''
  };
};

export default RootPage;
