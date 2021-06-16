import React from 'react';


// Lower Component which handles the touch events
// stateless
class TouchPad extends React.Component{

    render(){

        const { onMouseStart , onMouseEnd  , changeScreenHandler , musicState } = this.props

        let musicIcon;
        if (musicState){
            musicIcon = <i className="fas fa-pause-circle" onClick={this.props.musicToggle}></i>
        }else{
            musicIcon = <i className="fas fa-play-circle" onClick={this.props.musicToggle}></i>
        }



        return (
            <div className="TouchPad">
                <div className="touch-element" onMouseDown={onMouseStart} onMouseUp={onMouseEnd}>
                    <i className="fas fa-chevron-circle-down" onClick={()=>changeScreenHandler('menu')}></i>
                    <i className="fas fa-step-forward"></i>
                    <i className="fas fa-step-backward"></i>
                    {musicIcon}
                </div>
                <div className="center-button" onMouseOver={(e)=>e.preventDefault()} onMouseDown={(e)=>e.preventDefault()} onClick={()=>{changeScreenHandler('center')}}>
                </div>
            </div>
        )
    }
}

export default TouchPad;