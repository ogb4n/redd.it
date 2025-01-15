import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./utils/Router";
import { AuthProvider } from "./utils/AuthContext";

function App() {
  return (
      <div className="App">
      <AuthProvider>
          <RouterProvider router={router} />
      </AuthProvider>
      </div>
  );
}

export default App;
