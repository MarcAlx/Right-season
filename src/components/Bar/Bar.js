import React, { Component } from 'react';
import "./Bar.less"

import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';

import { connect } from 'react-redux';
import { search } from '../../actions/AppActions';

import PropTypes from 'prop-types';

import i18n from 'i18next';

class Bar extends Component {
  constructor(props){
    super(props);
    this.handleSearch=this.handleSearch.bind(this);
  }
  
  handleSearch(event) {
    console.log(event.target.value);
    this.props.search(event.target.value);
  }

  render() {
    return (
      <AppBar position="static">
        <Toolbar>
          <Typography type="title" color="inherit">
            <TextField
              id="searchText"
              label={i18n.t('searchbar.placeholder')}
              onChange={(e) => this.handleSearch(e, 'searchText')}
              margin="normal"
            />
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }
}

Bar.propTypes={
  search: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    input:state.input,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    search: (input) => dispatch(search(input))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Bar);
