import { use, useEffect, useRef, useState } from 'react'
import '../app.css'

function AfrApp() {
  let buttons = [{text: "NAV", function: () => {}}, {text: "MAP", function: () => {}}, {text: "SitR", function: () => {}}]

  const [duress, setDuress] = useState(false)
  const [duressheld, setDuressheld] = useState(false)
  const duressTimerRef = useRef(0)

  const handleDuress = () => {
    console.log("oh shit")
  }  



  const handleDuressMouseDown = () => {
      setDuressheld(true)
      duressTimerRef.current = setTimeout(() => {
        setDuressheld(false)
        if (duress == false) {
          handleDuress()
        console.log("Duress Activated")
        setDuress(true)}
        else if (duress == true) {
          console.log("Duress Deactivated")
          setDuress(false)
        }
      }, 1200);
      
      

    
  }

  const handleDuressMouseUp = () => {
    setDuressheld(false)
    clearTimeout(duressTimerRef.current)
  }

  useEffect(() => {
    clearTimeout(duressTimerRef.current)
  }, [])





  return (
    <>
      <div className="afr-interior">
        
        
        <div className="afr-bottom-navbar">
          {/* bottom nav bar */}
          <div className='afr-bottom-navbar-container'>
            {buttons.map((button, index) => (
              <div key={index} className='afr-bottom-navbar-button' onClick={button.function}>
                <span className='afr-bottom-navbar-button-container' onClick={button.function}>
                  <p style={{userSelect: "none"}}>{button.text}</p>
                </span>
              </div>
            ))}
            <div className='afr-emergency-button'>
              {duress ==false ?
              (<div className='afr-emergency-button-interior' onMouseDown={handleDuressMouseDown} onMouseUp={handleDuressMouseUp} onMouseLeave={handleDuressMouseUp}/> ) 
              : 
              (<div className='afr-emergency-button-interior-active' onMouseDown={handleDuressMouseDown} onMouseUp={handleDuressMouseUp} onMouseLeave={handleDuressMouseUp}/> )}
              {duressheld == true && 
                <svg viewBox='0 0 75 75' className='afr-emergency-progress-svg'>
                  <circle className="emergency-progress" cx="45" cy="60" r="35"  stroke='rgba(255,110,1,0.7)' fill='none'>
                  
                  </circle>
                </svg>}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AfrApp


