import React, { Component } from 'react';
import "./App.less"

import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import { blue } from 'material-ui/colors';

import i18n from 'i18next';

import Bar from '../Bar/Bar';
import Grid from '../Grid/Grid';

const theme = createMuiTheme({
  palette: {
    primary: blue
  },
});

class App extends Component {
  constructor(props){
    super(props);
  }

  render() {
    console.log("render");
    return (
      <MuiThemeProvider theme={theme}>   
        <div className="App">
          <h1>{i18n.t('title')}</h1>
          <Bar/>
          <Grid/>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
