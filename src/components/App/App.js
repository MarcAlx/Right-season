import React, { Component } from 'react';
import "./App.less"

import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import { blue } from 'material-ui/colors';

import { connect } from 'react-redux';
import { search } from '../../actions/AppActions';

import PropTypes from 'prop-types';

const theme = createMuiTheme({
  palette: {
    primary: blue
  },
});

class App extends Component {
  constructor(props){
    super(props);
    this.handleSearch=this.handleSearch.bind(this);
  }
  
  handleSearch(event) {
    console.log(event.target.value);
    this.props.search(event.target.value);
  }

  render() {
    console.log("render");
    return (
      <MuiThemeProvider theme={theme}>      
        <AppBar position="static">
          <Toolbar>
            <Typography type="title" color="inherit">
              Title 
              <TextField
                id="searchText"
                label="searchText"
                onChange={(e) => this.handleSearch(e, 'searchText')}
                margin="normal"
              />
            </Typography>
          </Toolbar>
        </AppBar>
      </MuiThemeProvider>
    );
  }
}

App.propTypes={
  search: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return {
    input:state.input
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    search: (input) => dispatch(search(input))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
