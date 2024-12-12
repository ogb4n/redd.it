import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./utils/Router";

function App() {
  // You can set here the initial state of the app
  return (
    <div className="App">
      <header className="App-header">
        <RouterProvider router={router} />
      </header>
    </div>
  );
}

export default App;
