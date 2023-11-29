import { useState } from 'react'
import logoUCNE from "./assets/image 11.png"
import Loading from './layouts/Loading/Loading'
import Team from './layouts/Team/Team'

function App() {

  return (
    <>
      <div className='fixed flex w-full h-full items-center justify-center overflow-auto'>
        <img
          src={logoUCNE}
          alt="Transparent"
          className='absolute'
        />
        {/*Pantallas*/}
        <Team/>
      </div>
    </>
  )
}

export default App
