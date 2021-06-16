

// Menu Items are shown inside the Menu Component
const MenuItem = props => {

    let { item, selected } = props

    let content = null;

    if(item){
        content = item;
    }
    let style=null;

    // if the item is selected
    if(selected){
        style={
            backgroundColor: 'black',
            color: 'white'
        }
    }


    return (
        <div className="MenuItem" style={style}>
            <p> {content} </p>
        </div>
    )
    
}

export default MenuItem;