import { useSearchParams } from 'react-router';
import '../App.css';

function breakthroughpreview() {

    const [searchParams] = useSearchParams();
    const breakthroughType = searchParams.get("breakthroughType") || "";
    const breakthroughMessage = searchParams.get("breakthroughMessage") || "";
    const breakthroughSentQuiet = searchParams.get("breakthroughSentQuiet") || "false";

    return (
        <div className='afr-breakthrough-message-container'>
            <div className='afr-breakthrough-message-interior'>
                <div className='afr-breakthrough-message-contentbox'>
                    <p style={{whiteSpace: "pre-wrap"}}>{breakthroughType}<br/>{breakthroughMessage}</p>
                </div>
                <div className='afr-breakthrough-message-options'>
                    <div className='afr-breakthrough-message-acknowledge'>
                        <div className='afr-breakthrough-message-acknowledge-container'>
                            <p style={{userSelect: 'none'}}>ACKNOWLEDGE</p>
                        </div>
                    </div>
                    {breakthroughSentQuiet === "false" &&
                        <div className='afr-breakthrough-message-mute'>
                            <div className='afr-breakthrough-message-mute-container'>
                                <p style={{userSelect: 'none'}}>MUTE</p>
                            </div>
                    </div>}
                </div>
            </div>
        </div>
      )

}
export default breakthroughpreview;