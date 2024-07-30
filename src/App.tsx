// react
import {
  useEffect,
} from 'react';
// router
import RootRouter from './routes/RootRouter';
// store
import useAuthStore from './store/authStore/authStore';
// style
import './App.css';

function App() {
  //
  // authStore
  //
  const initLoginState = useAuthStore(state => state.login.action.initLoginState);

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
