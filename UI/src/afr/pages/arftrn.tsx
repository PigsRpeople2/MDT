import React, { useState, useRef } from "react";
import '../../App.css';
import { useOutletContext } from "react-router";

function afrtrn() {

    const { breakthroughMessage } = useOutletContext<any>();

    const options = ["Incident Utilities", "Info Boundary", "Status"];
    const [active, setActive] = useState("Incident Utilities");
    const [breakthroughinfo, setBreakthroughinfo] = useState<{messageType: string, message: string, sendQuietly: boolean}>({messageType: "", message: "", sendQuietly: false});
    
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

    const renderFeature = () => {
        switch (active) {
            case "Incident Utilities":
                return (<>
                    <div className="afr-pages-trn-IU-details">

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