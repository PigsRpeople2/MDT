import { useEffect, useRef, useState } from 'react'
import { Outlet, Link, useNavigate } from 'react-router'
import '../app.css'


function AfrApp() {
  
  // FOR CHILDREN
    // HOME  
      const [incident, setIncident] = useState(false);
      const incidentDetailsRef = useRef({location: "", type: "", units: []});
      const statuses = [{id: 0, name: "RESPONDING", abbvr: "RES", next: 1}, {id: 1, name: "ON SCENE", abbvr: "OS", next: 2}, {id: 2, name: "AVAILABLE", abbvr: "AV", next: 3}, {id: 3, name: "AT STATION", abbvr: "AS", next: 0}, {id: 4, name: "NOT AVAILABLE", abbvr: "NA", next: 3}, {id: 5, name: "PROCEEDING", abbvr: "PRO", next: 2}, {id: 6, name: "ALERTED", abbvr: "AL", next: 0}, {id: 7, name: "EMERGENCY", abbvr: "EMR", next: 3}];
      const [status, setStatus] = useState({id: 2, name: "AVAILABLE", abbvr: "AV", next: 0});
      const navigate = useNavigate();
      
  let toBePassed = {incident, setIncident, incidentDetailsRef, status, setStatus, statuses, navigate}

  let [breakthrough, setBreakthrough] = useState(false)
  let breakthroughinfo = useRef({messageType: "", message: [{text: ""}]})
  let [breakthroughMute, setBreakthroughMute] = useState(false)
  let [breakthroughSentQuiet, setBreakthroughSentQuiet] = useState(false)

  let [error, setError] = useState(false)
  let [errorInfo, setErrorInfo] = useState<{title: string, message: string, level: number}[]>([])

  const [duress, setDuress] = useState(false)
  const [duressheld, setDuressheld] = useState(false)
  const duressTimerRef = useRef(0)
  const prevStatusRef = useRef({id: 2, name: "AVAILABLE", abbvr: "AV", next: 0})


  const elementRef = useRef<HTMLDivElement>(null);
  const screenHeight = window.innerHeight;
  const [pages, setPages] = useState(0);
  const [page, setPage] = useState(0);

  let [infoPerim, setInfoPerim] = useState(false)
  let infoPeriminfo = useRef({info: "", identifier: "", colour: "", textColour: ""})



  let buttons = [{text: "NAV", function: () => fakethroughMessage(), link: ""}, {text: "MAP", function: () => perimeterInfoBar("discon", "SERVER DISCONNECTED"), link: ""}, {text: "SitR", function: () => perimeterInfoBar("discon"), link: ""}, {text: "LOG", function: () => setIncident(!incident), link: ""}, {text: "CREW", function: () => causeError("Crew Error", "", 0, true), link: ""}, {text: "FORMS", function: () => {}, link: ""}, {text: "CREW", function: () => {}, link: ""}, {text: "CREW", function: () => {}, link: ""}, {text: "CREW", function: () => {}, link: ""}, {text: "CREW", function: () => {}, link: ""}, {text: "CREW", function: () => {}, link: ""}, {text: "CREW", function: () => {}, link: ""}, {text: "CREW", function: () => {}, link: ""}, {text: "CREW", function: () => {}, link: ""}, {text: "TRN", function: () => {}, link: "/afr/page/trn"},]

  const fakethroughMessage = () => {
    breakthroughinfo.current = {messageType: "Bush Fire - FIRECALL", message: [{text: "ohh noes, fire in the bush! coz like someone didnt put their cigarette out propahly! and now everythin's on fire! please come quick! its real bad! we need all hands on deck!"}]}
    setBreakthroughSentQuiet(false)
    setBreakthroughMute(false)
    setBreakthrough(true)
  }

  const breakthroughMessage = (messageType?: string, message?: string | Array<{text: string}>, quiet?: boolean) => {
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

  const causeError = (title?: string, message?: string, level?: number, alert?: boolean) => {
    if (title) {
      setErrorInfo([...errorInfo, {title: title, message: message || "", level: level || 0}])
      setError(alert || true)
      if (!message) {
        console.warn("No message provided to error handler")
      }
    } else {
      setErrorInfo([...errorInfo, {title: "Error when rendering error", message: `No ${!title ? "title" : ""} was provided to error handler`, level: 0}])
      if (alert == true){
        setError(true)
      }
    }
  }



  const perimeterInfoBar = (identifier?: string, info?: string, colour?: string, textColour?: string) => {
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
    prevStatusRef.current = status
    let newStatus = statuses.find((status: any) => status.id === 7)
    if (newStatus) {
        setStatus(newStatus);
    }

    console.log("oh shit")
  }  

  const clearDuress = () => {
    perimeterInfoBar("duress")
    setStatus(prevStatusRef.current)
    console.log("all good")
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


  const functionsToBePassed = {breakthroughMessage, causeError, perimeterInfoBar, handleDuress, clearDuress}
  toBePassed = {...toBePassed, ...functionsToBePassed}

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
        {error == true &&
          <div className="afr-error-message-container">
            <div className='afr-error-message-header'>
              <img className='afr-error-message-header-logo' src='/afr-logo-low.png' />
              <p className='afr-error-message-header-text'>Adashi First Response</p>
              <div className='afr-error-message-header-close' onClick={() => setError(false)}>
                <svg className='afr-error-message-header-close-svg' viewBox='0 0 30 30' style={{pointerEvents: "none"}}>
                  <line x1="10" y1="11" x2="20" y2="21" strokeWidth="2"/>
                  <line x1="20" y1="11" x2="10" y2="21" strokeWidth="2"/>
                </svg>
              </div>
            </div>
            <div className='afr-error-message-interior'>
              {errorInfo.map((error, index) => (
                <div key={index} className='afr-error-message-contentbox'>
                  <div className='afr-error-message-title-container'>
                    <svg className='afr-error-message-icon' viewBox='0 0 100 100'>
                      {error.level == 0 &&<>
                      <circle cx="50" cy="50" r="50" fill="rgb(255, 0, 0)" />
                      <line x1="30" y1="30" x2="70" y2="70" strokeWidth="10" stroke="rgb(255, 255, 255)" />
                      <line x1="70" y1="30" x2="30" y2="70" strokeWidth="10" stroke="rgb(255, 255, 255)" />
                      </>}
                      {error.level == 1 &&<>
                      <path d="M50 5 L 100 95 L  0 95 Z" fill="rgb(255, 215, 0)" stroke='#000' strokeWidth="10" strokeLinejoin='round' strokeLinecap='round'/>
                      <text x="50%" y="70%" dominantBaseline="middle" textAnchor="middle" fontSize="65" fill="rgb(0,0,0)" fontFamily="Arial" fontWeight="bold">!</text>
                      </>}
                      {error.level == 2 &&<>
                      <circle cx="50" cy="50" r="50" fill="rgb(255, 165, 0)" />
                      <line x1="50" y1="20" x2="50" y2="60" strokeWidth="10" stroke="rgb(255, 255, 255)" />
                      <circle cx="50" cy="75" r="5" fill="rgb(255, 255, 255)" />
                      </>}
                    </svg>
                    <p className='afr-error-message-title'>{error.title}</p>
                  </div>
                  <p className='afr-error-message-message'>{error.message}</p>
                </div>
              ))}
              <div className='afr-error-message-spacer'/>
              <div className='afr-error-message-button' onClick={() => { setError(false); setErrorInfo([]); }}>
                <p className='afr-error-message-button-text'>{errorInfo.length == 1 ? "Ok" : "Ok to all"}</p>
              </div>
            </div>
          </div>
        }
        {infoPerim == true &&
        <div className="afr-perimeter-info-bar" style={{borderColor: infoPeriminfo.current.colour}}>
          <div className='afr-perimeter-info-bar-identifier' style={{backgroundColor: infoPeriminfo.current.colour, color: infoPeriminfo.current.textColour}}>
            <p className='afr-perimeter-info-bar-text'>{infoPeriminfo.current.info}</p>
          </div>
        </div>}
        <div className="afr-app-outlet-container">
          <Outlet context={toBePassed} />
        </div>

        <div className="afr-bottom-navbar">
          {/* bottom nav bar */}
          <div className='afr-bottom-navbar-container'>
            <div ref={elementRef} className={`afr-bottom-navbar-buttons afr-navbar-translate `}>

              
              {buttons.map((button, index) => button.link ?
                <div key={index} className='afr-bottom-navbar-button' onClick={() => { navigate(button.link!)}} >
                  <span className='afr-bottom-navbar-button-container' >
                    <p style={{userSelect: "none"}}>{button.text}</p>
                  </span>
                </div>
                :
                <div key={index} className='afr-bottom-navbar-button' onClick={button.function} >
                  <span className='afr-bottom-navbar-button-container' >
                    <p style={{userSelect: "none"}}>{button.text}</p>
                  </span>
                </div>
            )}
            
            
            
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
      :
      <>
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


