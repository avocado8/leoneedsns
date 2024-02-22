import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Layout from "./components/layout"
import Profile from "./routes/profile"
import Login from "./routes/login"
import CreateAccount from "./routes/create-account"
import styled, { createGlobalStyle } from "styled-components"
import reset from "styled-reset"
import { useEffect, useState } from "react"
import LoadingScreen from "./components/loading-screen"
import { auth } from "./firebase"
import Member from "./routes/member"
import ToLeoneed from "./routes/toleoneed"
import Team from "./routes/team"
import Member1 from "./components/members/1"
import Member2 from "./components/members/2"
import Member3 from "./components/members/3"
import Member4 from "./components/members/4"
import ProtectedRoute from "./components/protected-route"


const router = createBrowserRouter([
  {
    path: "/",
    element: (<ProtectedRoute>
      <Layout />
    </ProtectedRoute>),
    children: [
      {
        path: "",
        element: <Team />
      },
      {
        path: "team",
        element: <Team />
      },
      {
        path: "member",
        element: <Member />
      },
      {
        path: "toleoneed",
        element: <ToLeoneed />
      },
      {
        path: "profile",
        element: <Profile />
      },
      {
        path: "member/1",
        element: <Member1 />
      },
      {
        path: "member/2",
        element: <Member2 />
      },
      {
        path: "member/3",
        element: <Member3 />
      },
      {
        path: "member/4",
        element: <Member4 />
      }
    ]
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/create-account",
    element: <CreateAccount />
  }
])

const GlobalStyles = createGlobalStyle`
  ${reset};
  * {
    box-sizing: border-box;
  }
  body {
    background-color: #4455DD;
    color: white;
    font-family: "Roboto", "Noto Sans KR", sans-serif;
  }
`;

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
`;

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const init = async() => {
    await auth.authStateReady();
    setIsLoading(false);
  }
  useEffect(()=>{init();}, [])
  return (
    <Wrapper>
      <GlobalStyles />
      {isLoading ? <LoadingScreen /> : <RouterProvider router={router} />}
    </Wrapper>
  )
}

export default App
