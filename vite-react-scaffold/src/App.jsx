import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Page from '@/components/Page/Page';
import TestA from '@/components/TestA/TestA';
import TestB from '@/components/TestB/TestB';
import Home from '@/components/Home/Home';

import './App.sass'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Page child={<Home />} />} />
        <Route path="/test-a" element={<Page child={<TestA />} />} />
        <Route path="/test-b" element={<Page child={<TestB />} />} />
      </Routes>
    </Router>
  );
};

export default App;
