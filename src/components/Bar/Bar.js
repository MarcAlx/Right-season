import React, { Component } from 'react';
import "./Bar.less"

import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';

import { connect } from 'react-redux';
import { search, filter, setInfoDrawerState } from '../../actions/AppActions';

import PropTypes from 'prop-types';

import IconButton from 'material-ui/IconButton';
import InfoIcon from 'material-ui-icons/Info';
import { MenuItem } from 'material-ui/Menu';
import Select from 'material-ui/Select';

import i18n from 'i18next';

class Bar extends Component {
  constructor(props){
    super(props);
    this.handleSearch=this.handleSearch.bind(this);
  }
  
  handleSearch(event) {
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
    let months = [1,2,3,4,5,6,7,8,9,10,11,12];
    let thisMonth = new Date().getMonth()+1;
    let nextMonth = (thisMonth+1)%12;
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
          <Select
            value={this.props.filterString.toString()}
            onChange={(evt)=>{
              this.props.doFilter(evt.target.value.split(',').map((month)=> parseInt(month)));
            }}
            >
            <MenuItem key="tm" value={[thisMonth].toString()}>{i18n.t('searchbar.filter.thismonth')+' ('+i18n.t("monthIndexes."+thisMonth)+')'}</MenuItem>
            <MenuItem key="nm" value={[nextMonth].toString()}>{i18n.t('searchbar.filter.nextmonth')+' ('+i18n.t("monthIndexes."+nextMonth)+')'}</MenuItem>
            <MenuItem key="all" value={months.toString()}>{i18n.t('searchbar.filter.allyear')}</MenuItem>
            {months.map((month)=>{
              if(month!=thisMonth && month!=nextMonth){
                return <MenuItem key={[month].toString()} value={month}>{i18n.t("monthIndexes."+month)}</MenuItem>;
              }
            })}
          </Select>
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
  doFilter: PropTypes.func.isRequired,
  setInfoDrawerState: PropTypes.func.isRequired,
  infoDrawerOpen:PropTypes.bool,
  filterString:PropTypes.array
};

const mapStateToProps = (state) => {
  console.log(state);
  return {
    input:state.input,
    filterString:state.filter,
    infoDrawerOpen:state.infoDrawerOpen
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    search: (input) => dispatch(search(input)),
    doFilter: (f) => dispatch(filter(f)),
    setInfoDrawerState: (open) => dispatch(setInfoDrawerState(open))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Bar);
