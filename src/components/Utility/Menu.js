import MenuItem from './MenuItem';


// Menu Component shown only when activeScreen is Menu
const Menu = props => {

    let menuItems = "loading";
    let {screen} = props;
    let heading = null
    if(screen === 'Menu'){
        heading = "IPOD.js"
    }else{
        heading = "Music"
    }
    

    // Menu items are rendered with another component
    // content is loaded after props have been received
    if(props.menuItems){
        menuItems = props.menuItems.map((item, index)=>{
            if(index === props.activeMenuIndex){
                return <MenuItem item={item} key={index} selected={true}></MenuItem>
            }
            return <MenuItem item={item} key={index}></MenuItem>
        })
    }

    return (
        <div className="Menu">
            <div className="header-div" style={{marginBottom:"1rem"}}>
                {heading}
            </div>
            {menuItems}        
        </div>
    )
}

export default Menu;