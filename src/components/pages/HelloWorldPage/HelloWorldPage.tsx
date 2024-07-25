import { Outlet } from 'react-router-dom';
import { Button } from '../../shadcn-ui/ui/button';
import './helloWorldPage.css';

function HelloWorldPage() {
  return (
    <div className="HelloWorld">
      <div className="text">
        It's HelloWorld page
      </div>

      <Button
        className="button"
        onClick={() => {
          console.log('onClick() - HelloWorld');
        }}>
        Click me!
      </Button>

      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default HelloWorldPage;
