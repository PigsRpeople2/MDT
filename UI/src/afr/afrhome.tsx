import { useRef, useState } from 'react';
import { useOutletContext } from 'react-router';

function AfrHome() {

    const {incident, setIncident, incidentDetailsRef, status, setStatus, statuses} = useOutletContext<any>();
    const callsign = "SNHUSKIP";
    const settableStatuses = statuses.filter((status: any) => status.name !== "ALERTED" && status.name !== "EMERGENCY");
    let newStatus: any = useRef(null);

    const [panelOpen, setPanelOpen] = useState(false);
    

    const handleStatusChange = (statusID: number) => {
        let button = document.getElementById(statusID.toString());
        newStatus.current = statuses.find((status: any) => status.id === statusID);
        if (button) {
            button.classList.add('afr-home-status-panel-item-selected-anim');
            setTimeout(() => {
                button?.classList.remove('afr-home-status-panel-item-selected-anim');
                if (newStatus.current.id === statusID) {
                    setStatus(newStatus.current);
                }
            }, Math.random() * (4000 - 500) + 500);
        }
    }

    const handleNextStatus = (selector?: any) => {
        let nextStatus = statuses.find((s: any) => s.id === status.next);
        if (selector === true){
            let selectorElement = document.getElementById("afr-incident-status-selector");
            selectorElement?.classList.add('afr-home-status-panel-item-selected-anim');
            setTimeout(() => {
                selectorElement?.classList.remove('afr-home-status-panel-item-selected-anim');
                if (nextStatus) {
                    setStatus(nextStatus);
                }
            }, Math.random() * (4000 - 500) + 500);
        } else if (nextStatus) {
            setStatus(nextStatus);
        }
    }

    return (<>
        {incident === false ?
        <div className="afr-home-container">
            <div className='afr-home-status-panel'>
                <div className='afr-home-status-panel-callsign'>
                    <p className='afr-home-status-panel-callsign-text'>{callsign}</p>
                </div>            
                <p className='afr-home-status-panel-header'> Status: {status.abbvr}</p>
                <div className='afr-home-status-panel-container'>
                    {settableStatuses.map((statusRef: any, index: number) => ( statusRef.id != status.id ?
                    <div id={statusRef.id.toString()} key={statusRef.id} className='afr-home-status-panel-item' onClick={() => handleStatusChange(statusRef.id)} style={{backgroundImage: "linear-gradient(rgb(189,190,192), rgb(189,190,192)), linear-gradient(180deg, rgba(95,96,98,1) 0%,rgba(62,62,64,1) 10%,rgba(120,121,124,1) 49%, rgba(62,62,64,1) 50%,rgba(62,62,64,1) 100%)"}}>
                        <p className='afr-home-status-panel-item-label' key={statusRef.abbvr}>{statusRef.abbvr}</p>
                        <p className='afr-home-status-panel-item-value' key={statusRef.name}>{statusRef.name}</p>
                    </div>
                :
                    <div id={statusRef.id.toString()} key={statusRef.id} className='afr-home-status-panel-item' onClick={() => handleStatusChange(statusRef.id)} style={{backgroundImage: "linear-gradient(rgb(246, 227, 51), rgb(246,227,51)), linear-gradient(180deg, rgba(95,96,98,1) 0%,rgba(62,62,64,1) 10%,rgba(120,121,124,1) 49%, rgba(62,62,64,1) 50%,rgba(62,62,64,1) 100%)"}}>
                        <p className='afr-home-status-panel-item-label' key={statusRef.abbvr}>{statusRef.abbvr}</p>
                        <p className='afr-home-status-panel-item-value' key={statusRef.name}>{statusRef.name}</p>
                    </div>))}
                </div>
            </div>
            <div className='afr-home-crew-display'>
                <p className='afr-home-crew-display-header'>CREW</p>
                <svg className='afr-home-crew-display-arrow-svg' viewBox='0 0 50 100'>
                    <path className='afr-home-crew-display-arrow' d="M 0 0 L 50 50 L 0 100 L 30 50 Z" />
                </svg>

            </div>
            <div className='afr-home-CnC-logo'>
                <img className='afr-home-CnC-logo-image' src="/C&C logo.png" alt="C&C Logo"/>
            </div>
        </div>
        :
        <div className="afr-incident-container">
            <div className='afr-incident-status-panel' {...(panelOpen && {style: {transform: 'translateX(100%)'}})}>
                <div className='afr-incident-status-panel-close-container'>
                    <div className='afr-incident-status-panel-close' onClick={() => setPanelOpen(false)}>
                        <p className='afr-incident-status-panel-close-text'>{"<<<"}</p>
                    </div>
                </div>           
                <p className='afr-home-status-panel-header'> Status: {status.abbvr}</p>
                <div className='afr-home-status-panel-container'>
                    {settableStatuses.map((statusRef: any, index: number) => ( statusRef.id != status.id ?
                    <div id={statusRef.id.toString()} key={statusRef.id} className='afr-home-status-panel-item' onClick={() => handleStatusChange(statusRef.id)} style={{backgroundImage: "linear-gradient(rgb(189,190,192), rgb(189,190,192)), linear-gradient(180deg, rgba(95,96,98,1) 0%,rgba(62,62,64,1) 10%,rgba(120,121,124,1) 49%, rgba(62,62,64,1) 50%,rgba(62,62,64,1) 100%)"}}>
                        <p className='afr-home-status-panel-item-label' key={statusRef.abbvr}>{statusRef.abbvr}</p>
                        <p className='afr-home-status-panel-item-value' key={statusRef.name}>{statusRef.name}</p>
                    </div>
                :
                    <div id={statusRef.id.toString()} key={statusRef.id} className='afr-home-status-panel-item' onClick={() => handleStatusChange(statusRef.id)} style={{backgroundImage: "linear-gradient(rgb(246, 227, 51), rgb(246,227,51)), linear-gradient(180deg, rgba(95,96,98,1) 0%,rgba(62,62,64,1) 10%,rgba(120,121,124,1) 49%, rgba(62,62,64,1) 50%,rgba(62,62,64,1) 100%)"}}>
                        <p className='afr-home-status-panel-item-label' key={statusRef.abbvr}>{statusRef.abbvr}</p>
                        <p className='afr-home-status-panel-item-value' key={statusRef.name}>{statusRef.name}</p>
                    </div>))}
                </div>
            </div>
            <div className='afr-incident-status-panel-fog' {...(panelOpen && {style: {backgroundColor: 'rgba(0, 0, 0, 0.65)', pointerEvents: 'auto'}})} onClick={() => setPanelOpen(false)}/>
            <div id='afr-incident-status-selector' className='afr-incident-status-selector' onClick={() => handleNextStatus(true)}>
                <div className='afr-incident-status-selector-active'>
                    <p style={{margin: "0"}}>{status.abbvr}</p>
                </div>
                <div className='afr-incident-status-selector-active-descr'>
                    <p style={{margin: "0"}}>{status.name}</p>
                </div>
                <svg className='afr-incident-status-selector-pipe' viewBox='0 0 100 100'>
                    <line className="afr-incident-status-selector-pipe-svg" x1="50%" y1="0" x2="50%" y2="100%" stroke="rgb(200, 200, 200)" strokeWidth="2"/>
                </svg>
                <div className='afr-incident-status-selector-next'>
                    <p style={{margin: "0"}}>{statuses.find((s: any) => s.id === status.next)?.abbvr}</p>
                </div>
            </div>
            <div className='afr-incident-status-selector-open' onClick={() => setPanelOpen(true)}>
                <p className='afr-incident-status-selector-chevrons'>{">>>"}</p>
            </div>
        </div>
        }
  </>)
}
export default AfrHome;