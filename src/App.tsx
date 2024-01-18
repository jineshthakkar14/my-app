import React, { useEffect, useState } from 'react';
import './index.css';
import { Route, Routes } from 'react-router-dom';
import { StartPage } from './pages/StartPage';
import { DiagramPage } from './pages/DiagramPage';
import Test from './pages/Test';
// import {Test} from './pages/Test';






function App() {

  return (
    <div >
      
      <Routes>
        <Route path='/' element={<StartPage></StartPage>}></Route>
        <Route path='/diagram' element={<DiagramPage></DiagramPage>}></Route>
      </Routes>
      {/* <div className='h-[100vh]'>
        <Test></Test>
      </div> */}
    </div>
    

  );
}

export default App;
