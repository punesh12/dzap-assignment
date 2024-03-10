
import React from 'react'
import './App.css'
import Navbar from './navbar/Navbar'
import Staking from './staking/Staking'

function App() {

  return (
    <React.Fragment>

      <div className="App">
        <Navbar />
        <div style={{ marginTop: "10%" }}>
          <Staking />
        </div>
      </div>
    </React.Fragment>
  )
}

export default App
