import HelloWorld from './components/HelloWorld/HelloWorld';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1 className="title">
        Donga CMS
      </h1>

      <div className="wrapper">
        <h1 className="wrapper-description">
          동아출판 CMS 프로젝트 개발
        </h1>
      </div>

      <HelloWorld />
    </div>
  );
}

export default App;
