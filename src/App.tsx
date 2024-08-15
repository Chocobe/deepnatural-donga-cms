// react
import {
  useState,
  useEffect,
} from 'react';
// router
import RootRouter from './routes/RootRouter';
// store
import useAuthApiStore from './store/authApiStore/authApiStore';
// ui
import ResultNoticeModal from './components/shadcn-ui-custom/modals/ResultNoticeModal/ResultNoticeModal';
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
      <ResultNoticeModal />
    </div>
  );
}

export default App;
