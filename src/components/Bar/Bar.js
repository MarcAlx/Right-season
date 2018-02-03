import React, { Component } from 'react';
import "./Bar.less"

import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';

import { connect } from 'react-redux';
import { search, setInfoDrawerState } from '../../actions/AppActions';

import PropTypes from 'prop-types';

import IconButton from 'material-ui/IconButton';
import InfoIcon from 'material-ui-icons/Info';

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

  handleDrawerOpen() {
    this.props.setInfoDrawerState(true);
  }

  render() {
    let menuButtonClass = "menuButton";
    if(this.props.infoDrawerOpen==true){
      menuButtonClass+=" hidden";
    }
    return (
      <AppBar position="fixed" className="topBar">
        <Toolbar>
          <Typography type="title" color="inherit" >
            {i18n.t('appName')}
          </Typography>
          <TextField
              className="searchInput"
              id="searchText"
              label={i18n.t('searchbar.placeholder')}
              onChange={(e) => this.handleSearch(e, 'searchText')}
              margin="normal"
            />
          <Typography color="inherit" className="spacer">
          </Typography>
          <IconButton
                color="inherit"
                aria-label="TODO"
                onClick={() => this.handleDrawerOpen()}
                className={menuButtonClass}
              >
                <InfoIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    );
  }
}

Bar.propTypes={
  search: PropTypes.func.isRequired,
  setInfoDrawerState: PropTypes.func.isRequired,
  infoDrawerOpen:PropTypes.bool
};

const mapStateToProps = (state) => {
  console.log(state);
  return {
    input:state.input,
    infoDrawerOpen:state.infoDrawerOpen
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    search: (input) => dispatch(search(input)),
    setInfoDrawerState: (open) => dispatch(setInfoDrawerState(open))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Bar);
