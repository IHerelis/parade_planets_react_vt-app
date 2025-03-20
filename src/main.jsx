import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './StyleNull.css'
// import './index.css'
// import App from './App.jsx'
import GamePlanets from './components/parade-planets/GamePlanets.jsx'

createRoot(document.getElementById('root')).render(
  <>
    {/* <StrictMode> */}
      {/* <App /> */}
      <GamePlanets />
    {/* </StrictMode>, */}
  </>
  
)
