// react
import {
  useState,
  useEffect,
  useLayoutEffect,
} from 'react';
// router
import RootRouter from './routes/RootRouter';
// store
import useAuthApiStore from './store/authApiStore/authApiStore';
// dayjs
import initDayjs from './lib/dayjs/initDayjs';
// ui
import HistoryModal from './components/shadcn-ui-custom/modals/HistoryModal/HistoryModal';
import ResultNoticeModal from './components/shadcn-ui-custom/modals/ResultNoticeModal/ResultNoticeModal';
import LoadingModal from './components/shadcn-ui-custom/modals/LoadingModal/LoadingModal';
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
  useLayoutEffect(() => {
    initDayjs();
  }, []);

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

      {/* Global modals */}
      <HistoryModal />
      <ResultNoticeModal />
      <LoadingModal />
    </div>
  );
}

export default App;
