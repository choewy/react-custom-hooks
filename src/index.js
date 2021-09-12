import React from 'react';
import ReactDOM from 'react-dom';
import AppUseInput from './App-using-useInput';
import AppUseTabs from './App-using-useTabs';
import AppUseTitle from './App-using-useTitle';
import AppUseClick from './App-using-useClick';
import AppUseConfirm from './App-using-useConfirm';
import AppUsePreventLeave from './App-using-usePreventLeave';

import './index.css'
import AppUseBeforeLeave from './App-using-useBeforeLeave';
import AppUseFadeIn from './App-using-useFadeIn';
import AppUseNetwork from './App-using-useNetwork';
import AppUseScroll from './App-using-useScroll';
import AppUseFullscreen from './App-using-useFullscreen';

ReactDOM.render(
  <React.StrictMode>
    <AppUseInput />
    <hr />
    <AppUseTabs />
    <hr />
    <AppUseTitle />
    <hr />
    <AppUseClick />
    <hr />
    <AppUseConfirm />
    <hr />
    <AppUsePreventLeave />
    <hr />
    <AppUseBeforeLeave />
    <hr />
    <AppUseFadeIn />
    <hr />
    <AppUseNetwork />
    <hr />
    <AppUseScroll />
    <hr />
    <AppUseFullscreen />
  </React.StrictMode>,
  document.getElementById('root')
);