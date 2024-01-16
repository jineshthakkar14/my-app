import React, { useEffect, useState } from 'react';
import './index.css';
import { Route, Routes } from 'react-router-dom';
import { Page1 } from './pages/Page1';
import { Page2 } from './pages/Page2';
import Test from './pages/Test';
// import {Test} from './pages/Test';






function App() {

  return (
    <div >
      
      <Routes>
        <Route path='/' element={<Page1></Page1>}></Route>
        <Route path='/diagram' element={<Page2></Page2>}></Route>
      </Routes>
      {/* <div className='h-[100vh]'>
        <Test></Test>
      </div> */}
    </div>
    

  );
}

export default App;
