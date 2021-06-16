
import StaboyImage from '../../assets/images/starboy.jfif'


// The end application like browser, settings, artists(menu), music etc
const CommonApplication = (props) => {

    let content = 'Loading'

    const { appName , currTime , totalTime } = props
    
    const formatTime = (timeSec) => {

        let min = Math.floor(timeSec / 60)
        let seconds = Math.floor(timeSec % 60)

        if(seconds/10 < 1){
            seconds = '0' + seconds
        }

        return min + '.' + seconds
        
    }

    if(appName === "Music"){
        content = (
            
            <div className = "Music">
                <div className="music-header">
                    <img src={StaboyImage} alt="StarBoy Cover"></img>
                </div>
                <div className="music-info">
                    <p>Starboy by The WeekEnd</p>
                </div>
                <div className="timeline">
                    <p>{formatTime(currTime)}</p>
                    <input type="range" disabled value={currTime} max={1000}></input>
                    <p>{formatTime(totalTime)}</p>
                </div>
                
                
            </div>
        )
    }else{
        let image = null;
        console.log(appName)
        if(appName === 'Browser'){
            image = <i className="fab fa-firefox-browser"></i>
        }else if(appName === 'Settings'){
            image = <i className="fas fa-cogs"></i>
        }else if(appName === 'Messages'){
            image = <i className="fas fa-envelope-open"></i>
        }

        content = (
            <div className="Common">
                <p>{appName}</p>
                {image}
                
            </div>
        )
    }

    return (
        <div className="CommonApplication">
            {content}
        </div>
    )
}

export default CommonApplication;