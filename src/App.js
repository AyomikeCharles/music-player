import { Routes, Route } from 'react-router-dom';
import Home from './views/Home';
import TopNav from './components/Nav';
import Player from './components/player';
import Collections from './views/Collection';
import songsData from './song/songsdata';
import MySongs from './views/MySongs';
import awoman from './res/img2.jpg';
import woman2 from './res/img1.jpg';

function App() {
  return (
    <>
      <TopNav/>
    
      <div className='d-flex'>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/topsong' element={<Collections songs={songsData.topsong} cover={awoman} link='topsong' name='Top Songs' writeup='upwrite upwrite upwrite upwrite upwrite upwrite upwrite upwrite upwrite upwrite upwrite upwrite upwrite upwrite'/>}/>
          <Route path='/popularsong' element={<Collections songs={songsData.popularsong} cover={woman2} link='popularsong' name='Popular Songs' writeup='upwrite upwrite upwrite upwrite upwrite upwrite upwrite upwrite upwrite upwrite upwrite upwrite '/>}/>
          <Route path='/bestsong' element={<Collections songs={songsData.bestsong} cover={awoman} link='bestsong' name='Best Songs' writeup='upwrite upwrite upwrite upwrite upwrite upwrite upwrite upwrite upwrite upwrite upwrite upwrite upwrite '/>}/>
          <Route path='/my-songs' element={<MySongs/>}/>
        </Routes>
      </div>
      <Player/>
    </>
  );
}

export default App;
