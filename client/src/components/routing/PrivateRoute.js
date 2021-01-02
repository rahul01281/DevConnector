import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, auth, ...rest }) => (
  <Route {...rest} render={props =>
      !auth.loading && !auth.isAuthenticated ? 
      ( <Redirect to="/login" /> ) : 

      ( <Component {...props} /> )
    }
  />
);

const mapStateToProps = state => ({
    auth: state.auth //pull in all the state that is in the auth reducer
})

export default connect(mapStateToProps)(PrivateRoute);
