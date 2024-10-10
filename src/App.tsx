import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./utils/Router";
import { AuthProvider } from "./utils/AuthContext";
function App() {
  // You can set here the initial state of the app
  return (
    <div className="App">
      <AuthProvider>
        <header className="App-header">
          <RouterProvider router={router} />
        </header>
      </AuthProvider>
    </div>
  );
}

export default App;
