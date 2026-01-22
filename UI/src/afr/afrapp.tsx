import { use, useEffect, useRef, useState } from 'react'
import '../app.css'

function AfrApp() {
  
  let [breakthrough, setBreakthrough] = useState(false)
  let breakthroughinfo = useRef({messageType: "", message: [{text: ""}]})
  let [breakthroughMute, setBreakthroughMute] = useState(false)
  let [breakthroughSentQuiet, setBreakthroughSentQuiet] = useState(false)

  const [duress, setDuress] = useState(false)
  const [duressheld, setDuressheld] = useState(false)
  const duressTimerRef = useRef(0)


  const elementRef = useRef<HTMLDivElement>(null);
  const screenHeight = window.innerHeight;
  const [pages, setPages] = useState(0);
  const [page, setPage] = useState(0);

  let [infoPerim, setInfoPerim] = useState(false)
  let infoPeriminfo = useRef({info: "", identifier: "", colour: "", textColour: ""})




  let buttons = [{text: "NAV", function: () => fakethroughMessage()}, {text: "MAP", function: () => perimeterInfoBar("discon", "SERVER DISCONNECTED")}, {text: "SitR", function: () => perimeterInfoBar("discon")}, {text: "LOG", function: () => {}}, {text: "CREW", function: () => {}}, {text: "CREW", function: () => {}}, {text: "CREW", function: () => {}}, {text: "CREW", function: () => {}}, {text: "CREW", function: () => {}}, {text: "CREW", function: () => {}}, {text: "CREW", function: () => {}}, {text: "CREW", function: () => {}}, {text: "CREW", function: () => {}}, {text: "CREW", function: () => {}}, {text: "CREW", function: () => {}},]

  function fakethroughMessage() {
    breakthroughinfo.current = {messageType: "Bush Fire - FIRECALL", message: [{text: "ohh noes, fire in the bush! coz like someone didnt put their cigarette out propahly! and now everythin's on fire! please come quick! its real bad! we need all hands on deck!"}]}
    setBreakthroughSentQuiet(false)
    setBreakthroughMute(false)
    setBreakthrough(true)
  }

  function breakthroughMessage(messageType?: string, message?: string | Array<{text: string}>, quiet?: boolean) {
    if (messageType) {
      if (typeof message === "string"){
        message = [{text: message}]
      }
        
      breakthroughinfo.current = {messageType: messageType, message: message || [{text: ""}]}
      if (quiet == true){
        setBreakthroughMute(true)
        setBreakthroughSentQuiet(true)
      }
      else {
        setBreakthroughMute(false)
        setBreakthroughSentQuiet(false)
      }
      setBreakthrough(true)
      return true
    }
    return false
  }

  function perimeterInfoBar(identifier?: string, info?: string, colour?: string, textColour?: string) {
    if (info) {
      if (colour == "red") {
        infoPeriminfo.current = {info: info, identifier: identifier || "", colour: "rgb(206, 52, 49)", textColour: textColour || "rgb(0,0,0)"}
      } else {
        infoPeriminfo.current = {info: info, identifier: identifier || "", colour: "rgb(255, 230, 10)", textColour: textColour || "rgb(0,0,0)"}
      }
      setInfoPerim(true)
    } else if (identifier == infoPeriminfo.current.identifier || identifier == "") {
        setInfoPerim(false)
      }
  }

  const handleDuress = () => {
    breakthroughMessage("EMERGENCY", "MDT", true)
    perimeterInfoBar("duress", "EMERGENCY", "red")

    console.log("oh shit")
  }  

  const clearDuress = () => {
    perimeterInfoBar("duress")
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
          clearDuress()
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
        setPages((Math.round((elementRef.current.lastElementChild as HTMLElement)?.offsetTop / (screenHeight / 100)) + 8 ) / 9)
      }}
  }, []);




  const handlePageDown = () => {
    if (page < pages -1) {
      setPage(page + 1)
      }
    }




  const handlePageUp = () => {
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

.afr-bottom-navbar-button:hover {
  transition: transform 0.05s ease-in-out;
  transform:translateY(calc(-0.15vh - ${page * 9}vh));
}

.afr-bottom-navbar-button:active {
  transition: transform 0.1s ease-in-out;
  transform:translateY(calc(0.15vh - ${page * 9}vh));
}
`}
      </style>
      
      {breakthrough == false? 
      <div className="afr-interior">
        {infoPerim == true &&
        <div className="afr-perimeter-info-bar" style={{borderColor: infoPeriminfo.current.colour}}>
          <div className='afr-perimeter-info-bar-identifier' style={{backgroundColor: infoPeriminfo.current.colour, color: infoPeriminfo.current.textColour}}>
            <p className='afr-perimeter-info-bar-text'>{infoPeriminfo.current.info}</p>
          </div>
        </div>}
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
      </div>:<>
      {breakthroughMute == false &&
      <audio src='/breakthroughalert.mp3' autoPlay loop/>}
      <div className='afr-breakthrough-message-container'>
        <div className='afr-breakthrough-message-interior'>
          <div className='afr-breakthrough-message-contentbox'>
            <p>{breakthroughinfo.current.messageType}<br/>{breakthroughinfo.current.message.map((msg, index) => (<>
              {msg.text} <br/></>
            ))}</p>
          </div>
          <div className='afr-breakthrough-message-options'>
            <div className='afr-breakthrough-message-acknowledge' onClick={() => setBreakthrough(false)}>
              <div className='afr-breakthrough-message-acknowledge-container'>
                <p style={{userSelect: 'none'}}>ACKNOWLEDGE</p>
              </div>
            </div>
            {breakthroughSentQuiet == false &&
            <div className='afr-breakthrough-message-mute' onClick={() => setBreakthroughMute(true)}>
              <div className='afr-breakthrough-message-mute-container'>
                <p style={{userSelect: 'none'}}>MUTE</p>
              </div>
            </div>}
          </div>
        </div>
      </div>
      </>}
    </>
  )
}

export default AfrApp


