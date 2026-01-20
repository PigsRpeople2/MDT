import { useState } from 'react'
import '../app.css'

function AfrApp() {
  let buttons = [{text: "NAV", function: () => {}}, {text: "MAP", function: () => {}}, {text: "SitR", function: () => {}}]



  return (
    <>
      <div className="afr-interior">
        
        
        <div className="afr-bottom-navbar">
          {/* bottom nav bar */}
          <div className='afr-bottom-navbar-container'>
            {buttons.map((button, index) => (
              <div key={index} className='afr-bottom-navbar-button' onClick={button.function}>
                <span className='afr-bottom-navbar-button-container' onClick={button.function}>
                  <p>{button.text}</p>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default AfrApp
