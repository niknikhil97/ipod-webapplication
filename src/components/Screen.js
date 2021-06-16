import Menu from './Utility/Menu';
import backgroundImage from '../assets/images/backgroundImage.gif'

import CommonApplication from './Utility/CommonApplications'; 


// Screen Component does not handles any touch events
const Screen = (props) => {

    const { activeScreen , menuList , activeMenuIndex , subMenuList , activeSubMenuIndex } = props.stateProp;
    
    const { currTime , totalTime } = props

    let content = null;

    
    // display content on basis of the activeScreen prop
    if(activeScreen === "Menu"){
        content = <Menu screen={activeScreen} menuItems={menuList} activeMenuIndex={activeMenuIndex}  />
        
    }else if(activeScreen === "SubMenu"){
        content = <Menu menuItems={subMenuList} activeMenuIndex={activeSubMenuIndex} />
    }else{
        // This is the application meant to open by the user
        // like messages, browser, music etc
        content = <CommonApplication currTime={currTime} totalTime={totalTime} appName = {activeScreen} />
    }

    
    return (
        <div className="Screen" style={{backgroundImage : "url(" + backgroundImage + ")"}}>
            {content}
        </div>
    )
}


export default Screen;