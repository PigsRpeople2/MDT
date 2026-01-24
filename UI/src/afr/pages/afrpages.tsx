import { useState, useRef, useEffect } from 'react';
import { useOutletContext, Outlet, Link, href } from 'react-router';
import '../../App.css';

function AfrPages() {
    
    const {status, setStatus, statuses} = useOutletContext<any>();
    const [specialfield, setSpecialfield] = useState<any>(null);
    const [pageInfo, setPageInfo] = useState<Array<string> | null>(null);


    const handleNextStatus = (selector?: any) => {
        let nextStatus = statuses.find((s: any) => s.id === status.next);
        if (selector === true){
            let selectorElement = document.getElementById("afr-pages-status-selector");
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

    return (
        <>
        <div className="afr-pages-container">
            <div className='afr-pages-header-bar'>
                <Link className='afr-pages-header-close' to={"/afr/home"}>
                    <svg className='afr-pages-header-close-svg' viewBox='0 0 30 30' style={{pointerEvents: "none"}}>
                        <line x1="10" y1="11" x2="20" y2="21" stroke="white" strokeWidth="1"/>
                        <line x1="20" y1="11" x2="10" y2="21" stroke="white" strokeWidth="1"/>
                    </svg>
                </Link>
                <div className='afr-pages-status-selector-container'>
                    <div id='afr-pages-status-selector' className='afr-pages-status-selector' onClick={() => handleNextStatus(true)}>
                        <div className='afr-pages-status-selector-active'>
                            <p style={{margin: "0"}}>{status.abbvr}</p>
                        </div>
                        <div className='afr-pages-status-selector-active-descr'>
                            <p style={{margin: "0"}}>{status.name}</p>
                        </div>
                        <svg className='afr-pages-status-selector-pipe' viewBox='0 0 100 100'>
                            <line className="afr-pages-status-selector-pipe-svg" x1="50%" y1="0" x2="50%" y2="100%" stroke="rgb(200, 200, 200)" strokeWidth="2"/>
                        </svg>
                        <div className='afr-pages-status-selector-next'>
                            <p style={{margin: "0"}}>{statuses.find((s: any) => s.id === status.next)?.abbvr}</p>
                    </div>
                </div>
                </div>
                {specialfield !== null && <div className='afr-pages-header-special-field'>{specialfield}</div>}
                <div className='afr-pages-header-details-button'>
                    <p className='afr-pages-header-details-text'>DETAILS</p>
                    <svg className='afr-pages-header-details-button-svg' viewBox='0 0 100 100'>
                        <path d="M50 90 L 53 90 L 50 93 L 47 90 Z" stroke="black" strokeWidth="2"/>
                    </svg>
                </div>
                {pageInfo !== null && <div className='afr-pages-header-info-button'>
                    <p className='afr-pages-header-info-text' style={{justifyContent: "right"}}>{pageInfo[0]}</p>
                    <p className='afr-pages-header-info-text' style={{justifyContent: "left"}}>{pageInfo[1]}</p>
                    <p className='afr-pages-header-info-text' style={{justifyContent: "left"}}>{pageInfo[2]}</p>
                </div>}
            </div>
            <div className='afr-pages-outlet-container'>
                <Outlet />
            </div>
        </div>
        </>
    );
}
export default AfrPages;