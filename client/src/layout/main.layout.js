import React, {Component} from 'react';
import {connect} from "react-redux";

import NixApiService from '../lib/nix-api-client';

import {SET_USER} from "../actions/auth.actions";

import LoggedOutLayout from './logged-out.layout';
import LoggedInLayout from './logged-in.layout';
import Loading from '../components/shared/loading';

const mapStateToProps = (state, ownProps) => ({
  user: state.auth.user,
  authToken: state.auth.token,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onUserLoaded: (user) => dispatch(SET_USER(user)),
});

class MainLayoutView extends Component {
  render() {
    if (!this.props.authToken) {
      return (<LoggedOutLayout/>);
    }
    else if (!this.props.user) {
      return (<Loading/>);
    }
    else {
      return (<LoggedInLayout/>);
    }
  }

  componentDidMount() {
    this.fetchUser();
  }

  componentDidUpdate() {
    this.fetchUser();
  }

  fetchUser() {
    if (this.props.authToken && !this.props.user) {
      NixApiService.getUser().then((user) => this.props.onUserLoaded(user))
    }
  }
};

const MainLayout = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MainLayoutView);

export default MainLayout;
