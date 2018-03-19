import React, { Component } from 'react';

import './InfoDrawer.less';

import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import ChevronRightIcon from 'material-ui-icons/ChevronRight';

import { connect } from 'react-redux';
import { setInfoDrawerState } from '../../actions/AppActions';

import i18n from 'i18next';

import PropTypes from 'prop-types';

import ReactMarkdown from 'react-markdown';

class InfoDrawer extends Component {
  constructor(props){
    super(props);
  }

  handleDrawerClose() {
    this.props.setInfoDrawerState(false);
  }

  render() {
    return (
        <Drawer 
            anchor="right"
            open={this.props.infoDrawerOpen}>
        <div className="infoDrawer">
          <div>
            <IconButton onClick={()=>{this.handleDrawerClose()}}>
              <ChevronRightIcon />
            </IconButton>
            <span>
                {i18n.t("infoDrawer.header")}
            </span>
          </div>
          <Divider />
          <ReactMarkdown className="infoArea" source={i18n.t("infoDrawer.info")} />
        </div>
      </Drawer>

    );
  }
}

InfoDrawer.propTypes={
  setInfoDrawerState: PropTypes.func.isRequired,
  infoDrawerOpen:PropTypes.bool
};

const mapStateToProps = (state) => {
  return {
    infoDrawerOpen:state.infoDrawerOpen
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setInfoDrawerState: (open) => dispatch(setInfoDrawerState(open))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InfoDrawer);
