import React from 'react';
import {HashRouter, Route} from 'react-router-dom';
import Markdown from './MarkdownContainer';

function App() {
  return (
    <HashRouter>
      <Route path='/' component={Markdown} />
    </HashRouter>
  );
}

export default App;
