import React from 'react';
import MainContainer from '../MainContainer';
import HeaderComponent from '../../components/Header';
import {HashRouter} from 'react-router-dom';

const App = () => (
  <div className="page__holder">
    <HeaderComponent/>
    <HashRouter>
      <MainContainer/>
    </HashRouter>
  </div>
);

export default App;
