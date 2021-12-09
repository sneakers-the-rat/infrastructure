import React from 'react';
import ReactDOM from 'react-dom';

import RDFA from './components/rdfa';
import TOC from './components/toc';

import './js/anchors.js';

import '@fortawesome/fontawesome-free/js/fontawesome'
import '@fortawesome/fontawesome-free/js/regular'

// ReactDOM.render(<RDFA/>, document.getElementById('rdfa-component'))
ReactDOM.render(<TOC/>, document.getElementById('toc-drawer'))



