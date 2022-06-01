import './App.css';
import Mainpage from './Components/Mainpage/Mainpage';
import { Route, Switch, Redirect } from 'react-router-dom';
import Login from './Components/Login/Login';
import Signup from './Components/Signup/Signup'
import Completed from './Components/Completed/Completed';
import Incompleted from './Components/Incompleted/Incompleted';
import TimeNotArrived from './Components/TimeNotArrived/TimeNotArrived';
import CreateTodo from './Components/CreateTodo/CreateTodo';
import UpdateTodo from './Components/UpdateTodo/UpdateTodo';
import { useContext } from 'react';
import AuthContext from './Components/store/authCntext';
import ResetProfile from './Components/ResetProfile/ResetProfile';

function App() {
  const authCtx = useContext(AuthContext);
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact>
          {!authCtx.isLoggedIn ? (<Redirect to='/login' /> ): (
            <Redirect to='/mainpage' />
          )}
        </Route>
        <Route path='/mainpage'>
          {!authCtx.isLoggedIn ? (<Redirect to='/login' /> ): (
            <Mainpage />
          )}
        </Route>
        <Route path='/login'>
          {authCtx.isLoggedIn ? (<Redirect to='/mainpage' /> ):(
            <Login />
          )}
        </Route>
        <Route path='/signup'>
          {authCtx.isLoggedIn ? (<Redirect to='/mainpage' /> ):(
            <Signup />
          )}
        </Route>
        <Route path='/completed'>
          {!authCtx.isLoggedIn ? (<Redirect to='/login' /> ): (
            <Completed />
          )}
        </Route>
        <Route path='/incompleted'>
          {!authCtx.isLoggedIn ? (<Redirect to='/login' /> ): (
            <Incompleted />
          )}
        </Route>
        <Route path='/createtodo'>
          {!authCtx.isLoggedIn ? (<Redirect to='/login' /> ): (
            <CreateTodo />
          )}
        </Route>
        <Route path='/timenotarrived'>
          {!authCtx.isLoggedIn ? (<Redirect to='/login' /> ): (
            <TimeNotArrived />
          )}
        </Route>
        <Route path='/updatetodo'>
          {!authCtx.isLoggedIn ? (<Redirect to='/login' /> ): (
            <UpdateTodo />
          )}
        </Route>
        <Route path='/resetprofile'>
          {!authCtx.isLoggedIn ? (<Redirect to='/login' /> ): (
            <ResetProfile />
          )}
        </Route>
      </Switch>
    </div>
  );
}
export default App;
