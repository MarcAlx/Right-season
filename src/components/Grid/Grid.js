import React, { Component } from 'react';
import "./Grid.less"

import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import Item from '../Item/Item';

import MuiGrid from 'material-ui/Grid';

import { GridList, GridListTile } from 'material-ui/GridList';
import Subheader from 'material-ui/List/ListSubheader';

import i18n from 'i18next';

class Grid extends Component {
  constructor(props){
    super(props);
  }
  
  handleSearch(event) {
    console.log(event.target.value);
  }

  render() {
    let vegetables = this.props.vegetables.map(
      (item) => <Item key={item.name} data={item}/>
    );
    let fruits = this.props.fruits.map(
      (item) => <Item key={item.name} data={item}/>
    );
    let cereals = this.props.cereals.map(
      (item) => <Item key={item.name} data={item}/>
    );
    let mushrooms = this.props.mushrooms.map(
      (item) => <Item key={item.name} data={item}/>
    );
    return (
        <div className="contentGrid">
            <MuiGrid container>
              <GridList xs={12} sm={12} md={12} lg={12} className={vegetables.length>0 ? "" : "hidden"}>
                  <GridListTile className="header" key="Subheader">
                      <Subheader component="div">{i18n.t('categories.vegetables')}</Subheader>
                  </GridListTile>
                  {vegetables}
              </GridList>
              <GridList xs={12} sm={12} md={12} lg={12} className={fruits.length>0 ? "" : "hidden"}>
                  <GridListTile className="header" key="Subheader">
                      <Subheader component="div">{i18n.t('categories.fruits')}</Subheader>
                  </GridListTile>
                  {fruits}
              </GridList>
              <GridList xs={12} sm={12} md={12} lg={12} className={mushrooms.length>0 ? "" : "hidden"}>
                  <GridListTile className="header" key="Subheader">
                      <Subheader component="div">{i18n.t('categories.mushrooms')}</Subheader>
                  </GridListTile>
                  {mushrooms}
              </GridList>
              <GridList xs={12} sm={12} md={12} lg={12} className={cereals.length>0 ? "" : "hidden"}>
                  <GridListTile className="header" key="Subheader">
                      <Subheader component="div">{i18n.t('categories.cereals')}</Subheader>
                  </GridListTile>
                  {cereals}
              </GridList>
              {
                (cereals.length===0 && mushrooms.length===0 && fruits.length===0 && cereals.length===0) ?
                <div className="noResults">{i18n.t('grid.noResults')}</div>
                :
                <div/>
              }
            </MuiGrid>
        </div>
    );
  }
}

Grid.propTypes={
  vegetables:PropTypes.array,
  fruits:PropTypes.array,
  mushrooms:PropTypes.array,
  cereals:PropTypes.array
};

const mapStateToProps = (state) => {
  return {
    vegetables:state.currentData.vegetables,
    fruits:state.currentData.fruits,
    cereals:state.currentData.cereals,
    mushrooms:state.currentData.mushrooms,
  };
};

export default connect(mapStateToProps)(Grid);
