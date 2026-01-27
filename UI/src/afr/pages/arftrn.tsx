import React, { useState, useRef } from "react";
import { useOutletContext } from "react-router";


function afrtrn() {

    

    const { breakthroughMessage, incident, setIncident, incidentDetailsRef } = useOutletContext<any>();

    const options = ["Incident Utilities", "Info Boundary", "Status"];
    const [active, setActive] = useState("Incident Utilities");
    const [breakthroughinfo, setBreakthroughinfo] = useState<{messageType: string, message: string, sendQuietly: boolean}>({messageType: "", message: "", sendQuietly: false});
    const [autoCompleteData, setAutoCompleteData] = useState<Array<any>>([]);
    const [addressFocus, setAddressFocus] = useState<boolean>(false);
    const [alertToggle, setAlertToggle] = useState<boolean>(true);
    const [matchingID, setMatchingID] = useState<boolean>(false);
    const [prevIncident, setPrevIncident] = useState<boolean>(false);

    const handleBreakthroughMessageChange = (e: React.FormEvent<HTMLFormElement>) => {
        console.log("change");
        const titleInput = document.getElementById("title-input") as HTMLInputElement || "";
        const messageInput = document.getElementById("message-input") as HTMLInputElement || "";
        const sendQuietlyInput = document.getElementById("send-quietly") as HTMLInputElement || "";
        const message = messageInput.value ? messageInput.value : "";
        const title = titleInput ? titleInput.value : "";
        const sendQuietly = sendQuietlyInput.checked;
        setBreakthroughinfo({messageType: title, message: message, sendQuietly: sendQuietly});
    }

    const handleBreakthroughMessage = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const messageInput = form.elements.namedItem("message-input") as HTMLInputElement;
        const titleInput = form.elements.namedItem("title-input") as HTMLInputElement;
        const sendQuietlyInput = form.elements.namedItem("send-quietly") as HTMLInputElement;
        const message = messageInput.value;
        const title = titleInput.value;
        const sendQuietly = sendQuietlyInput.checked;
        if (title !== "") {
            breakthroughMessage(title, message, sendQuietly);
            form.reset();
        } else {
            titleInput.focus();
            titleInput.style.borderColor = "red";
            titleInput.labels?.forEach(label => {
                label.classList.add("afr-pages-trn-IU-breakthrough-form-label-red");
            });
            }
    }

    async function autoCompleteAddress(e: React.FormEvent<HTMLInputElement>) {
        e.preventDefault();
        const query = e.currentTarget.value;
        if (query.includes(" ") && query.length > 3) {

            const response = await fetch("https://photon.komoot.io/api/?q=berlin&lat=35.0398&lon=150.6707")
            const data = await response.json();
            console.log(data);
            setAutoCompleteData(data.features);
        }

    }

    const handleCreateIncident = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const typeInput = form.elements.namedItem("type-input") as HTMLInputElement;
        const addressInput = form.elements.namedItem("address-input") as HTMLInputElement;
        const incidentIDInput = form.elements.namedItem("incident-input") as HTMLInputElement;
        const businessNameInput = form.elements.namedItem("business-name-input") as HTMLInputElement;
        const propertyNameInput = form.elements.namedItem("property-name-input") as HTMLInputElement;
        const tgGroupNameInput = form.elements.namedItem("tg-group-name-input") as HTMLInputElement;
        const fireGroundChannelInput = form.elements.namedItem("fire-ground-channel-input") as HTMLInputElement;
        const CBInput = form.elements.namedItem("CB-input") as HTMLInputElement;
        const districtInput = form.elements.namedItem("district-input") as HTMLInputElement;
        const controlNameInput = form.elements.namedItem("control-name-input") as HTMLInputElement;
        const detailsInput = form.elements.namedItem("details-input") as HTMLInputElement;
        const unitsInput = []; // Placeholder for unit inputs        
        
        
        const incidentDetails = {
            type: typeInput.value,
            address: addressInput.value,
            incidentID: incidentIDInput.value,
            businessName: businessNameInput.value,
            propertyName: propertyNameInput.value,
            tgGroupName: tgGroupNameInput.value,
            fireGroundChannel: fireGroundChannelInput.value,
            CBChannel: CBInput.value,
            district: districtInput.value,
            controlName: controlNameInput.value,
            details: detailsInput.value,
        };
        incidentDetailsRef.current = incidentDetails;
        setIncident(true);
        if (alertToggle) {
            breakthroughMessage(typeInput.value);
        } else {
            console.log("Incident created without alert.");
        }
    }

    const handlecheckIDInput = () => {
        const incidentIDInput = document.getElementById("incident-input") as HTMLInputElement;
        if (incidentIDInput.value === incidentDetailsRef.current.incidentID && incidentDetailsRef.current.incidentID !== "") {
            setMatchingID(true);
            console.log("Incident ID matches existing incident.");
        } else {
            setMatchingID(false);
        }
    }

            
    const handleGetIncident = () => {
        if (incidentDetailsRef.current.incidentID !== "") {
            (document.getElementById("type-input") as HTMLInputElement).value = incidentDetailsRef.current.type;
            (document.getElementById("address-input") as HTMLInputElement).value = incidentDetailsRef.current.address;
            (document.getElementById("incident-input") as HTMLInputElement).value = incidentDetailsRef.current.incidentID;
            (document.getElementById("business-name-input") as HTMLInputElement).value = incidentDetailsRef.current.businessName;
            (document.getElementById("property-name-input") as HTMLInputElement).value = incidentDetailsRef.current.propertyName;
            (document.getElementById("tg-group-name-input") as HTMLInputElement).value = incidentDetailsRef.current.tgGroupName;
            (document.getElementById("fire-ground-channel-input") as HTMLInputElement).value = incidentDetailsRef.current.fireGroundChannel;
            (document.getElementById("CB-input") as HTMLInputElement).value = incidentDetailsRef.current.CBChannel;
            (document.getElementById("district-input") as HTMLInputElement).value = incidentDetailsRef.current.district;
            (document.getElementById("control-name-input") as HTMLInputElement).value = incidentDetailsRef.current.controlName;
            (document.getElementById("details-input") as HTMLInputElement).value = incidentDetailsRef.current.details;
            setMatchingID(true);
            console.log("Incident data populated from existing incident.");
        };
    }



    const renderFeature = () => {
        switch (active) {
            case "Incident Utilities":
                return (<>
                    <div className="afr-pages-trn-IU-details">
                        <form id="incident-creation-form" className="afr-pages-trn-IU-creation-form" onSubmit={handleCreateIncident}>
                            <div className="afr-pages-trn-IU-creation-form-sets">
                                <div className="afr-pages-trn-IU-creation-form-set-label">
                                    <label className="afr-pages-trn-IU-creation-form-label" htmlFor="type-input" >Type: </label>
                                    <label className="afr-pages-trn-IU-creation-form-label" htmlFor="address-input" >Address: </label>
                                </div>
                                <div className="afr-pages-trn-IU-creation-form-set-input">
                                    <input className="afr-pages-trn-IU-creation-form-input-main" type="text" id="type-input" name="type-input" placeholder="Incident Type" autoComplete="off" required/>
                                    <input className="afr-pages-trn-IU-creation-form-input-main" type="text" id="address-input" name="address-input" placeholder="Address"  autoComplete="street-address" required onInput={autoCompleteAddress} onFocus={() => setAddressFocus(true)} onBlur={() => setAddressFocus(false)}/>
                                    {addressFocus && autoCompleteData.length > 0 &&
                                        <div className="afr-pages-trn-IU-creation-form-autocomplete-container">
                                            {autoCompleteData.map((item, index) => (
                                                <div key={index} className="afr-pages-trn-IU-creation-form-autocomplete-item" onMouseDown={(e) => {
                                                    e.preventDefault();
                                                    const input = document.getElementById("address-input") as HTMLInputElement;
                                                    input.value = item.properties.name + ", " + item.properties.city + ", " + item.properties.country;
                                                    setAutoCompleteData([]);
                                                }}>
                                                    <p className="afr-pages-trn-IU-creation-form-autocomplete-item-text">{item.properties.name}, {item.properties.city}, {item.properties.country}</p>
                                                </div>
                                            ))}
                                        </div>
                                    }
                                </div>
                            </div>
                            <div className="afr-pages-trn-IU-creation-form-details">
                                <label className="afr-pages-trn-IU-creation-form-label" htmlFor="incident-input" >Incident ID: </label>
                                <input className="afr-pages-trn-IU-creation-form-input-details" type="text" id="incident-input" name="incident-input" placeholder="Incident ID" autoComplete="off" required onInput={handlecheckIDInput}/>
                                <label className="afr-pages-trn-IU-creation-form-label" htmlFor="business-name-input" >Business Name: </label>
                                <input className="afr-pages-trn-IU-creation-form-input-details" type="text" id="business-name-input" name="business-name-input" placeholder="Business Name"/>
                                <label className="afr-pages-trn-IU-creation-form-label" htmlFor="property-name-input" >Property Name: </label>
                                <input className="afr-pages-trn-IU-creation-form-input-details" type="text" id="property-name-input" name="property-name-input" placeholder="Property Name"/>
                                <label className="afr-pages-trn-IU-creation-form-label" htmlFor="tg-group-name-input" >TG Group Name/Channel: </label>
                                <input className="afr-pages-trn-IU-creation-form-input-details" type="text" id="tg-group-name-input" name="tg-group-name-input" placeholder="TG Group Name/Channel"/>
                                <label className="afr-pages-trn-IU-creation-form-label" htmlFor="fire-ground-channel-input" >Fire Ground Channel: </label>
                                <select className="afr-pages-trn-IU-creation-form-input-select" id="fire-ground-channel-input" name="fire-ground-channel-input" defaultValue="13">
                                    {[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15].map((channel) => (
                                        <option key={channel} value={channel}>FG{channel}</option>
                                    ))}
                                </select>
                                <label className="afr-pages-trn-IU-creation-form-label" htmlFor="CB-input" >UHF/CB Channel: </label>
                                <input className="afr-pages-trn-IU-creation-form-input-details" type="number" id="CB-input" name="CB-input" placeholder="UHF/CB Channel"/>
                                <label className="afr-pages-trn-IU-creation-form-label" htmlFor="district-input" >District: </label>
                                <input className="afr-pages-trn-IU-creation-form-input-details" type="text" id="district-input" name="district-input" placeholder="District" defaultValue={"Shoalhaven"}/>
                                <label className="afr-pages-trn-IU-creation-form-label" htmlFor="control-name-input" >Control Name: </label>
                                <input className="afr-pages-trn-IU-creation-form-input-details" type="text" id="control-name-input" name="control-name-input" placeholder="Control Name"/>
                                <label className="afr-pages-trn-IU-creation-form-label" htmlFor="details-input" >Details: </label>
                                <div className="afr-pages-trn-IU-creation-form-input-details-area-div"><textarea className="afr-pages-trn-IU-creation-form-input-details-area" id="details-input" name="details-input" placeholder="Details..." /></div>
                            </div>
                            <div className="afr-pages-trn-IU-creation-form-buttons">
                                {
                                matchingID ?
                                    alertToggle ?
                                        <button id="alert-swapper" className="afr-pages-trn-IU-creation-form-alert-button-true" type="button" onClick={() => setAlertToggle(false)}><p className="afr-pages-trn-IU-creation-form-clear-button-text">Alert: Yes</p></button>
                                    :
                                        <button id="alert-swapper" className="afr-pages-trn-IU-creation-form-alert-button-false" type="button" onClick={() => setAlertToggle(true)}><p className="afr-pages-trn-IU-creation-form-clear-button-text">Alert: No</p></button>
                                :
                                    <button className="afr-pages-trn-IU-creation-form-get-button" type="button"><p className="afr-pages-trn-IU-creation-form-clear-button-text" onClick={handleGetIncident}>Get Incident</p></button>
                                }
                                <button className="afr-pages-trn-IU-creation-form-button" type="submit"><p className="afr-pages-trn-IU-creation-form-button-text">{matchingID ? "Update" : "Create"} Incident</p></button>
                            </div>
                        </form>














                    </div>
                    <div className="afr-pages-trn-IU-breakthrough">
                        <form className="afr-pages-trn-IU-breakthrough-form" onSubmit={handleBreakthroughMessage} onInput={handleBreakthroughMessageChange}>
                            <label className="afr-pages-trn-IU-breakthrough-form-label" htmlFor="title-input" id="afr-pages-trn-IU-breakthrough-title" >Title*: </label>
                            <input className="afr-pages-trn-IU-breakthrough-form-input" type="text" id="title-input" name="title-input" placeholder="Enter title here..."/>
                            <label className="afr-pages-trn-IU-breakthrough-form-label" htmlFor="message-input">Message:</label>
                            <textarea className="afr-pages-trn-IU-breakthrough-form-input-message" id="message-input" name="message-input" placeholder="Type your message here..." />
                            <div className="afr-pages-trn-IU-breakthrough-form-checkbox-container">
                                <label className="afr-pages-trn-IU-breakthrough-form-label" htmlFor="send-quietly">Send Quietly: 
                                <input className="afr-pages-trn-IU-breakthrough-form-checkbox" type="checkbox" id="send-quietly" name="send-quietly" /></label>
                                
                            </div>
                            <button className="afr-pages-trn-IU-breakthrough-form-button" type="submit"><p className="afr-pages-trn-IU-breakthrough-form-button-text">Send Message</p></button>
                        </form>
                        <div className="afr-pages-trn-IU-breakthrough-preview-container">

                            <div className='afr-breakthrough-message-container'>
                                <div className='afr-breakthrough-message-interior'>
                                    <div className='afr-breakthrough-message-contentbox-preview'>
                                        <p style={{whiteSpace: "pre-wrap"}}>{breakthroughinfo.messageType}<br/>{breakthroughinfo.message}</p>
                                    </div>
                                    <div className='afr-breakthrough-message-options-preview'>
                                        <div className='afr-breakthrough-message-acknowledge-preview'>
                                            <div className='afr-breakthrough-message-acknowledge-container-preview'>
                                                <p style={{userSelect: 'none'}}>ACKNOWLEDGE</p>
                                            </div>
                                        </div>
                                        {breakthroughinfo.sendQuietly == false &&
                                            <div className='afr-breakthrough-message-mute-preview'>
                                                <div className='afr-breakthrough-message-mute-container-preview'>
                                                    <p style={{userSelect: 'none'}}>MUTE</p>
                                                </div>
                                            </div>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>);
            case "Info Boundary":
                return <div>Info Boundary Content</div>;
            case "Status":
                return <div>Status Content</div>;
            default:
                return <div>Select an option</div>;
        }
    }

    const input = document.getElementById("address-input") as HTMLInputElement;
    const addOptions = {
        types: ['address'],
        componentRestrictions: { country: 'us' },
    };


    return (
        <div className="afr-pages-trn-container">
            <div className="afr-pages-trn-list-container">
                <div className="afr-pages-trn-list">
                    {options.map((option, index) => ( active === option ?
                        <div key={index} className={`afr-pages-trn-list-item ${active === option ? "active" : ""}`} onClick={() => setActive(option)} style={{backgroundColor: "rgb(19, 36, 48)", borderColor: "rgb(74, 79, 82)"}}>
                            <p className="afr-pages-trn-list-item-text" style={{color: "rgb(252, 252, 252)"}}>{option}</p>
                        </div>
                    :
                        <div key={index} className={`afr-pages-trn-list-item ${active === option ? "active" : ""}`} onClick={() => setActive(option)}>
                            <p className="afr-pages-trn-list-item-text">{option}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="afr-pages-trn-feature-container">
                {renderFeature()}
            </div>
        </div>
    );
}
export default afrtrn;