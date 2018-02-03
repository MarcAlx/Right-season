import React, { Component } from 'react';
import "./Grid.less"

import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import Item from '../Item/Item';

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
        <div>
            <GridList>
            <GridListTile className="header" key="Subheader" cols={4}>
                <Subheader component="div">{i18n.t('categories.vegetables')}</Subheader>
            </GridListTile>
            {vegetables}
            </GridList>
            <GridList>
            <GridListTile className="header" key="Subheader" cols={4}>
                <Subheader component="div">{i18n.t('categories.fruits')}</Subheader>
            </GridListTile>
            {fruits}
            </GridList>
            <GridList>
            <GridListTile className="header" key="Subheader" cols={4}>
                <Subheader component="div">{i18n.t('categories.mushrooms')}</Subheader>
            </GridListTile>
            {mushrooms}
            </GridList>
            <GridList>
            <GridListTile className="header" key="Subheader" cols={4}>
                <Subheader component="div">{i18n.t('categories.cereals')}</Subheader>
            </GridListTile>
            {cereals}
            </GridList>
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
