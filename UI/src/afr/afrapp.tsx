import { use, useEffect, useRef, useState } from 'react'
import '../app.css'

function AfrApp() {
  let buttons = [{text: "NAV", function: () => {}}, {text: "MAP", function: () => {}}, {text: "SitR", function: () => {}}, {text: "LOG", function: () => {}}, {text: "CREW", function: () => {}}, {text: "CREW", function: () => {}}, {text: "CREW", function: () => {}}, {text: "CREW", function: () => {}}, {text: "CREW", function: () => {}}, {text: "CREW", function: () => {}}, {text: "CREW", function: () => {}}, {text: "CREW", function: () => {}}, {text: "CREW", function: () => {}}, {text: "CREW", function: () => {}}, {text: "CREW", function: () => {}},]

  const [duress, setDuress] = useState(false)
  const [duressheld, setDuressheld] = useState(false)
  const duressTimerRef = useRef(0)


  const elementRef = useRef<HTMLDivElement>(null);
  const screenHeight = window.innerHeight;
  const [pages, setPages] = useState(0);
  const [page, setPage] = useState(0);



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

  useEffect(() => {
    if (elementRef.current) {
      if (elementRef.current.lastElementChild?.getBoundingClientRect().height) {
        setPages((Math.round(elementRef.current.lastElementChild?.offsetTop / (screenHeight / 100)) + 8 ) / 9)
      }}
  }, []);




  function handlePageDown() {
    if (page < pages -1) {
      setPage(page + 1)
      }
    }




  function handlePageUp() {
    if (page > 0) {
      setPage(page - 1)
    }
  }







  return (
    <>
      <style>
        {`
        .afr-navbar-translate > div {
          transition: transform 0.5s ease-in-out;
          transform: translateY(-${page * 9}vh);
        }
        `}
      </style>
      <div className="afr-interior">
        
        <div className="afr-bottom-navbar">
          {/* bottom nav bar */}
          <div className='afr-bottom-navbar-container'>
            <div ref={elementRef} className={`afr-bottom-navbar-buttons afr-navbar-translate `}>

              
              {buttons.map((button, index) => (
                <div key={index} className='afr-bottom-navbar-button' onClick={button.function} >
                  <span className='afr-bottom-navbar-button-container' onClick={button.function}>
                    <p style={{userSelect: "none"}}>{button.text}</p>
                  </span>
                </div>
              ))}
            
            
            
            </div>
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
            <div className='afr-navbar-arrow-container'>
              <div className='afr-navbar-arrow-up'>
                {page == 0 ?
                  <svg viewBox='0 0 106 68' className='afr-navbar-arrow-up-svg-inactive'>
                    <path d='M47 10Q53 2 59 10L100 55Q106 65 96 65L53 65 10 65Q0 65 5 55Z'/>
                  </svg>
                  :
                  <svg viewBox='0 0 106 68' className='afr-navbar-arrow-up-svg' onClick={handlePageUp}>
                    <path d='M47 10Q53 2 59 10L100 55Q106 65 96 65L53 65 10 65Q0 65 5 55Z'/>
                  </svg>
                }
              </div>
              <div className='afr-navbar-arrow-down'>
                {page < pages -1 ?
                  <svg viewBox='0 0 106 71' className='afr-navbar-arrow-down-svg' onClick={handlePageDown}>
                    <path d='M59 57Q53 65 47 57L6 12Q0 2 10 2L53 2 96 2Q106 2 101 12Z'/>
                  </svg>
                  :
                  <svg viewBox='0 0 106 71' className='afr-navbar-arrow-down-svg-inactive'>
                    <path d='M59 57Q53 65 47 57L6 12Q0 2 10 2L53 2 96 2Q106 2 101 12Z'/>
                  </svg>
                  }
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AfrApp


