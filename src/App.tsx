
import './index.css';
import { Route, Routes } from 'react-router-dom';
import { StartPage } from './pages/StartPage';
import { DiagramPage } from './pages/DiagramPage';


function App() {

  return (
    <div >
      
      <Routes>
        <Route path='/' element={<StartPage></StartPage>}></Route>
        <Route path='/diagram' element={<DiagramPage></DiagramPage>}></Route>
      </Routes>
    </div>
    

  );
}

export default App;
