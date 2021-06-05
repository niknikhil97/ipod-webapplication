import React from 'react';

class TouchPad extends React.Component{


    slideMenuHandler(e){
        console.log('clientX', e.clientX);
        console.log(e.target.offset(),"target")

        
    }



    render(){
        return (
            <div className="TouchPad">
                <div className="touch-element" onMouseDown={this.slideMenuHandler}>
                    <div className="center-button">
                        
                    </div>
                </div>
            </div>
        )
    }
}

export default TouchPad;