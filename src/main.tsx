import 'bulmaswatch/superhero/bulmaswatch.min.css';
import React from 'react';
import ReactDOM from 'react-dom'
// import CodeCell from './components/code-cell';
import TextEditor from './components/text-editor';


const App = () => {
  return (
    <div>
      <TextEditor />
    </div>
  )
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
