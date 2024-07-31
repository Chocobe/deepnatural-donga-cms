// react
import {
  useEffect,
} from 'react';
// router
import RootRouter from './routes/RootRouter';
// store
import useAuthApiStore from './store/authApiStore/authApiStore';
// style
import './App.css';

function App() {
  //
  // authApiStore
  //
  const initLoginState = useAuthApiStore(state => state.login.action.initLoginState);

  //
  // effect
  //
  useEffect(() => {
    initLoginState();
  }, [initLoginState]);

  return (
    <div className="App">
      <RootRouter />
    </div>
  );
}

export default App;
