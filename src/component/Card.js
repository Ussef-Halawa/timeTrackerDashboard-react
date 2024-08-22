import React ,{Fragment,useState,useEffect} from "react";
import axios from "axios";
import './Card.css'
function Card(){
    const [timeData,setTimeData] = useState([]);
    const [selectedTimeFrame,setSelectedTimeFrame] = useState({
        mode : "daily",
        unit : "Day"
    })
    useEffect(()=>{
        getData();
    },[])
    const getData = async () => {
        const response = await axios.get("http://localhost:3001/data")
        setTimeData(response.data);
    }
    return(
        <Fragment>
            <div className="profileCard">
                <div id="profile">
                    <figure>
                        <img src="images\image-jeremy.png" alt="profileImage"/>
                    </figure>
                    <div id="figureCaption">
                            <p>Report for</p>
                            <h1>Jeremy <br/> Robson</h1>
                    </div>
                </div>
                <div id="reportMode">
                    <button onClick={() => setSelectedTimeFrame({mode : "daily", unit : "Day"})}>Daily</button>
                    <button onClick={() => setSelectedTimeFrame({mode : "weekly", unit : "Week"})}>Weekly</button>
                    <button onClick={() => setSelectedTimeFrame({mode : "monthly", unit : "Month"})}>Monthly</button>
                </div>
            </div>

            <div className="reports">
                {timeData.map(({title,timeframes})=>{
                    const {mode , unit} = selectedTimeFrame;
                    const {current, previous} = timeframes[mode];
                    let SVG , bgColor;
                    switch (title) {
                        case "Work":
                            SVG = "images/icon-work.svg"
                            bgColor = "hsl(15, 100%, 70%)"
                            break;
                        
                        case "Play":
                            SVG = "images/icon-play.svg"
                            bgColor = "hsl(195, 74%, 62%)"
                            break;
                        
                        case "Study":
                            SVG = "images/icon-study.svg"
                            bgColor = "hsl(348, 100%, 68%)"
                            break;
                        
                        case "Exercise":
                            SVG = "images/icon-exercise.svg"
                            bgColor = "hsl(145, 58%, 55%)"
                            break;
                        
                        case "Social":
                            SVG = "images/icon-social.svg"
                            bgColor = "hsl(264, 64%, 52%)"
                            break;
                        
                        case "Self Care":
                            SVG = "images/icon-self-care.svg"
                            bgColor = "hsl(43, 84%, 65%)"
                            break;
                        
                        default:
                            break;
                    }
                    return(
                        <div key={title} className="reportCard" style={{backgroundColor:bgColor}}>
                            <img src={SVG} alt="iamge"/>
                            <div className="reportData">
                                <div>
                                <p>{title}</p>
                                <img src="images\icon-ellipsis.svg" alt = "icon-ellipsis"/>
                                </div>
                                <div>
                                <p>{current}hrs</p>
                                <p>Last {unit} - {previous}hrs</p>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </Fragment>
    )
}
export default Card;