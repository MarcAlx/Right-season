import React, { Component } from 'react';
import "./Bar.less"

import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import Grid from 'material-ui/Grid';

import { connect } from 'react-redux';
import { search, filter, setInfoDrawerState, setSource } from '../../actions/AppActions';

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

    let sources = [];
    for(let src in this.props.allData){
      sources.push(<MenuItem key={src} value={src}>{src}</MenuItem>);
    }
    return (
      <AppBar position="fixed" className="topBar">
        <Toolbar>
          <Grid className="root" container spacing={0}>
            <Grid item xs={6} sm={6} md={3} lg={3}>
              <Typography xs={12} type="title" color="inherit" >
                {i18n.t('appName')}
              </Typography>
            </Grid>
            <Grid item xs={6} sm={6} md={3} lg={3}>
              <Select className="sourceSelect"
                value={this.props.source.toString()}
                onChange={(evt)=>{
                  this.props.setSource(evt.target.value);
                }}
                >
                {sources}
              </Select>
            </Grid>
            <Grid item xs={6} sm={6} md={3} lg={3}>
              <TextField
                  className="searchInput"
                  id="searchText"
                  label={i18n.t('searchbar.placeholder')}
                  onChange={(e) => this.handleSearch(e, 'searchText')}
                  margin="normal"
              />
            </Grid>
            <Grid item xs={6} sm={6} md={3} lg={3}>
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
            </Grid>
          </Grid>
          <Grid className="drawerButtonContainer" item xs={1} sm={1} md={2} lg={2}>
              <IconButton
                      color="inherit"
                      aria-label="TODO"
                      onClick={() => this.handleDrawerOpen()}
                      className={menuButtonClass}
                    >
                  <InfoIcon />
              </IconButton>
            </Grid>
        </Toolbar>
      </AppBar>
    );
  }
}

Bar.propTypes={
  search: PropTypes.func.isRequired,
  doFilter: PropTypes.func.isRequired,
  setInfoDrawerState: PropTypes.func.isRequired,
  infoDrawerOpen: PropTypes.bool,
  filterString: PropTypes.array,
  allData: PropTypes.object,
  source: PropTypes.string,
  setSource: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  console.log(state);
  return {
    input:state.input,
    filterString:state.filter,
    infoDrawerOpen:state.infoDrawerOpen,
    allData:state.allData,
    source:state.source
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    search: (input) => dispatch(search(input)),
    doFilter: (f) => dispatch(filter(f)),
    setSource: (source)=> dispatch(setSource(source)),
    setInfoDrawerState: (open) => dispatch(setInfoDrawerState(open))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Bar);
