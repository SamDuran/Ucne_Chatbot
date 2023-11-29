import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import logoUCNE from "../src/assets/UcneLogo.png"
import Loading from './layouts/Loading/Loading'
import Chat from './layouts/Chat/Chat'
import Team from './layouts/Team/Team';

function App() {

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, [])

  return (
    <>
      <div>
        <div>
          <div className='fixed flex flex-col w-full h-full items-center justify-center overflow-auto'>
            <img
            src={logoUCNE}
            alt="Transparent"
            className='absolute'
            />
            {isLoading ? <Loading /> : 
            <Router>
              <Routes>
                <Route
                  exact
                  path="/Chat"
                  element={<Chat />}
                />
                <Route
                  path="/Team"
                  element={<Team />}
                />
                <Route
                  path="*"
                  element={<Navigate to="/Chat" />}
                />
              </Routes>
            </Router>
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default App