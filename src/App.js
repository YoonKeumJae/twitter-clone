import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./routes/Home";
import Profile from "./routes/Profile";
import Login from "./routes/Login";
import CreateAccount from "./routes/CreateAccount";
import createGlobalStyle from "styled-components";
import reset from "styled-reset";

function App() {
  const GlobalStyles = createGlobalStyle`
    ${reset};
    *{
      box-sizing: border-box;
    }
    body{
      background-color: black;
      color: white;
      font-family: system-ui;

    }
  `;

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "",
          element: <Home />,
        },
        {
          path: "profile",
          element: <Profile />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/create-account",
      element: <CreateAccount />,
    },
  ]);

  return (
    <>
      <GlobalStyles />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
