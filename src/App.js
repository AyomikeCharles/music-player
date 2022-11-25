import { Routes, Route } from 'react-router-dom';
import Home from './views/Home';
import TopNav from './components/Nav';
import Player from './components/player';
import Collections from './views/Collection';
import MySongs from './views/MySongs';
import Error from './views/Error';


function App() {

  const playList = [
    {id:'3155776842', info:'+6 songs', description:'top world wide most listened-to songs, every day in this music platform from all over the world', link:'top-world', image:'https://e-cdns-images.dzcdn.net/images/playlist/f1ac18441ab1dabc94282e4d1d5f4955/500x500-000000-80-0-0.jpg', title:'Top World'},
    {id:'1362516565', info:'+5 songs', description:'hosttest and most listened-to nigeria songs, every day from all over the country in this music platform', link:'top-nigeria', image:'https://e-cdns-images.dzcdn.net/images/playlist/7eb32b89d0e6e5be3f566a6018e9db4b/500x500-000000-80-0-0.jpg', title:'Top Nigeria'},
    {id:'1257015791', info:'+8 songs', description:'greatest hit of all time, hours of non stop classic tracks from some of the best hitmakers world wide', link:'greatest-hit', image:'https://e-cdns-images.dzcdn.net/images/playlist/bbe51d70ec5b6e113963adcb5bff87ef/500x500-000000-80-0-0.jpg', title:'Greates Hit'},
  ]



  return (
    <>
      <TopNav/>
    
      
        <Routes>
          <Route path='/' element={<Home playlist={playList}/>}/>
          <Route path='/top-world' element={<Collections playListId={playList[0].id} writeup={playList[0].description} link={playList[0].link} cover={playList[0].image} />} />
          <Route path='/top-nigeria' element={<Collections playListId={playList[1].id} writeup={playList[1].description} link={playList[1].link} cover={playList[1].image} />} />
          <Route path='/greatest-hit' element={<Collections playListId={playList[2].id} writeup={playList[2].description} link={playList[2].link} cover={playList[2].image} />} />
          <Route path='/my-songs' element={<MySongs/>}/>
          <Route path='/error404' element={<Error/>}/>
        </Routes>
      
      <Player/>
    </>
  );
}

export default App;
