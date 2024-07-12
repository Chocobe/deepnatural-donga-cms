import { Button } from '../shadcn-ui/ui/button';
import './helloWorld.css';

function HelloWorld() {
  return (
    <div className="HelloWorld">
      <div className="text">
        It's HelloWorld component
      </div>

      <Button
        className="button"
        onClick={() => {
          console.log('onClick() - HelloWorld');
        }}>
        Click me!
      </Button>
    </div>
  );
}

export default HelloWorld;
