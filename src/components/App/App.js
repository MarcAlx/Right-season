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

import Item from '../Item/Item';

import { GridList, GridListTile } from 'material-ui/GridList';
import Subheader from 'material-ui/List/ListSubheader';

import i18n from 'i18next';

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
    let vegetables = this.props.vegetables.map(
      (item) => <Item key={item.name} data={item}/>
    );
    let fruits = this.props.fruits.map(
      (item) => <Item key={item.name} data={item}/>
    );
    return (
      <MuiThemeProvider theme={theme}>   
        <div className="App">
          <h1>{i18n.t('title')}</h1>
          <AppBar position="static">
            <Toolbar>
              <Typography type="title" color="inherit">
                <TextField
                  id="searchText"
                  label="searchText"
                  onChange={(e) => this.handleSearch(e, 'searchText')}
                  margin="normal"
                />
              </Typography>
            </Toolbar>
          </AppBar>
          <GridList>
            <GridListTile className="header" key="Subheader" cols={4}>
              <Subheader component="div">Légumes</Subheader>
            </GridListTile>
            {vegetables}
          </GridList>
          <GridList>
            <GridListTile className="header" key="Subheader" cols={4}>
              <Subheader component="div">Fruits</Subheader>
            </GridListTile>
            {fruits}
          </GridList>
        </div>
      </MuiThemeProvider>
    );
  }
}

App.propTypes={
  search: PropTypes.func.isRequired,
  vegetables:PropTypes.array,
  fruits:PropTypes.array
};

const mapStateToProps = (state) => {
  return {
    input:state.input,
    vegetables:state.vegetables,
    fruits:state.fruits
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    search: (input) => dispatch(search(input))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
