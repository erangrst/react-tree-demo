import logo from "./logo.svg";
import "./App.css";
import TccTreeComponent from "./tcc-tree/tcc.tree";

function App() {
  return <TccTreeComponent></TccTreeComponent>;

  // return (
  //   <div className="App">
  //     <header className="App-header">
  //       <img src={logo} className="App-logo" alt="logo" />
  //       <p>
  //         Edit <code>src/App.js</code> and save to reload.
  //       </p>
  //       <button onClick={() => alert ('me')} style={{background: 'red'}} > Verify </button>
  //               <a
  //         className="App-link"
  //         href="https://reactjs.org"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         Learn React
  //       </a>
  //     </header>
  //   </div>
  // );
}

export default App;
