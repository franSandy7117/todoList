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
  const notLoggedIn = !authCtx.isLoggedIn;
  const loggedIn = authCtx.isLoggedIn;
  const goToLoginPage = <Redirect to='/login' />
  const mainPage = <Redirect to='/mainpage' />

  return (
    <div className="App">
      <Switch>
        <Route path="/" exact>
          {notLoggedIn ? goToLoginPage : (
            mainPage
          )}
        </Route>
        <Route path='/mainpage'>
          {notLoggedIn ? goToLoginPage : (
            <Mainpage />
          )}
        </Route>
        <Route path='/login'>
          {loggedIn ? mainPage :(
            <Login />
          )}
        </Route>
        <Route path='/signup'>
          {loggedIn ? mainPage :(
            <Signup />
          )}
        </Route>
        <Route path='/completed'>
          {notLoggedIn ? goToLoginPage : (
            <Completed />
          )}
        </Route>
        <Route path='/incompleted'>
          {notLoggedIn ? goToLoginPage : (
            <Incompleted />
          )}
        </Route>
        <Route path='/createtodo'>
          {notLoggedIn ? goToLoginPage : (
            <CreateTodo />
          )}
        </Route>
        <Route path='/timenotarrived'>
          {notLoggedIn ? goToLoginPage : (
            <TimeNotArrived />
          )}
        </Route>
        <Route path='/updatetodo'>
          {notLoggedIn ? goToLoginPage : (
            <UpdateTodo />
          )}
        </Route>
        <Route path='/resetprofile'>
          {notLoggedIn ? goToLoginPage : (
            <ResetProfile />
          )}
        </Route>
      </Switch>
    </div>
  );
}
export default App;
