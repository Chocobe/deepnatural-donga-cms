// react
import routePathFactory from '@/routes/routePathFactory';
import {
  useCallback,
} from 'react';
// route
import { 
  useNavigate,
} from 'react-router-dom';

const useOnClickExit = () => {
  //
  // hook
  //
  const navigate = useNavigate();

  //
  // callback
  //
  const onClickExit = useCallback(() => {
    navigate(routePathFactory
      .math
      .getQuestionPath()
    );
  }, [navigate]); 

  return onClickExit;
};

export default useOnClickExit;
