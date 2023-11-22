import { useState, useEffect } from 'react'
import logoUCNE from "../src/assets/image 11.png"
import Loading from './layouts/Loading/Loading '
import Chat from './layouts/Chat/Chat'


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

          <div className='flex-col'>

            {isLoading ? <Loading /> : <Chat />}
          </div>

        </div>
      </div>

    </>
  )
}

export default App

