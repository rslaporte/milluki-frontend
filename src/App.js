import './App.css'

import {HashRouter as Router, Switch, Route} from 'react-router-dom'

import Login from './Components/Login/Login.js'
import TopMenu from './Components/TopMenu/TopMenu.js'
import Index from './Pages/Index/Index.js'
import List from './Components/List/List'
import BookForm from './Components/Forms/BookForm'

import PublicCollections from './Pages/PublicCollections/PublicCollections'
import Collections from './Pages/Collections/Collections'
import MyCollections from './Pages/MyCollections/MyCollections'
import CollectionForm from '../src/Components/Forms/CollectionForm'


function App() {
  return (
    <div className="index">  
          <Router>
            <TopMenu />   
            <Switch>
                <Route exact path='/'>
                  <div className='pageContainer'>
                    <Index />
                  </div>
                </Route>

                <Route path='/books'>
                  <div className='pageContainer'>
                    <List url='books'/>   
                  </div>     
                </Route>

                <Route path='/collections/:id'>
                  <div className='pageContainer'>
                    <Collections />   
                  </div>                       
                </Route>

                <Route path='/collections'>
                  <div className='pageContainer'>
                    <PublicCollections />   
                  </div>     
                </Route>               

                <Route path='/mycollections'>
                  <div className='pageContainer'>
                    <MyCollections />   
                  </div>     
                </Route>

                <Route path='/new/book'>                  
                    <BookForm />                         
                </Route>

                <Route path='/new/collection'>                  
                    <CollectionForm />                         
                </Route>

                <Route path='/login'>
                  <div className='pageContainer'>
                    <Login />   
                  </div>                             
                </Route>

                <Route path='/contact'>
                
                </Route>
            </Switch>
        </Router> 
    </div>
  );
}

export default App;
