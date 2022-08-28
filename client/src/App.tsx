import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import Cookies from "js-cookie";

import useRefreshToken from "./hooks/useRefreshToken";

function App() {
  const axiosConfig = useRefreshToken();
  const [userLogin, setUserLogin] = useState(false);
  console.log("backend_url:", import.meta.env.VITE_BACKEND_URL);
  const userAuth = async () => {
    try {
      const auth = await axiosConfig.post("/api/v1/signin", {
        email: "test@test.com",
        password: "test123",
      });
      setUserLogin(true);
      console.log("response:", auth);
    } catch (error) {
      console.log("err:", error);
    }
  };
  const logoutUser = () => {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    setUserLogin(false);
  };
  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button
          onClick={async () => {
            const data1 = await axiosConfig.get("/api/v1/getContract");
            const data2 = await axiosConfig.get("/api/v1/getContract");
            console.log("data1:", data1);
            console.log("data2:", data2);
          }}
        >
          fetch
        </button>
        <br />
        <br />
        {userLogin ? (
          <button
            onClick={() => {
              logoutUser();
            }}
          >
            signOut
          </button>
        ) : (
          <button
            onClick={async () => {
              await userAuth();
            }}
          >
            signin
          </button>
        )}

        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
}

export default App;
