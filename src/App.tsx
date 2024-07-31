// react
import {
  useState,
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
  // state
  //
  const [isInit, setIsInit] = useState(false);

  //
  // effect
  //
  useEffect(() => {
    initLoginState();
    setIsInit(true);
  }, [initLoginState]);

  if (!isInit) {
    return null;
  }

  return (
    <div className="App">
      <RootRouter />
    </div>
  );
}

export default App;
