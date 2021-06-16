import Screen from './Screen';
import TouchPad from './TouchPad'
import React from 'react';
import ZingTouch from 'zingtouch';

// song import
import StarBoyMP3 from '../assets/songs/starboy.mp3'


// About The Application
// I am writing it here for better understanding of this app works 
// The Top button is Menu Button (responsible for going back)
// The center button is like a select button and takes tyou inside of selected application
// The options can be explored by rotate gesture on the rotate bar(black disk)
// Songs can be played and paused from anyscreen
// as song is attacked to the main app component
// Thanks for reading 




// This is the only stateful component in this application.
class App extends React.Component{

  // constructor method 
  constructor(){
    super()
    this.state = {
      activeScreen : 'Menu',
      menuList: [
        'Music',
        'Settings',
        'Browser',
        'Messages'
      ],
      subMenuList: [
        'All Music',
        'Artists',
        'Shuffle'
      ],
      activeMenuIndex:0,
      activeSubMenuIndex: 0,
      musicState: false,
      currTime: 0,
      totalTime: 0,
    }

    // Initializing ZingTouch Region
    this.zt = new ZingTouch.Region(document.body);

    // Setting Audio
    // Audio in this file to control music from anywhere in the application
    this.audio = new Audio(StarBoyMP3);

    // check for current time every second and update on the UI
    setInterval( ()=> {
      const currentTime = this.audio.currentTime
      
      if(currentTime !== this.state.currTime){
        this.setState({
          currTime: currentTime 
        })
      }
      
      
      // console.log(this.state.currTime, "A")
    } , 1000)
    
  }

  

  // toggle Music Play Pause State
  musicPlayPauseHandler = (e) => {
    this.audio.paused ? this.audio.play() : this.audio.pause() ;
    this.audio.paused ? this.setState({musicState: false}) :this.setState({musicState: true})
  } 
  

  // when clicked on the touchpad for rotation
  mouseDownHandler=(e)=>{
    let menu = document.querySelector('.touch-element');
    let angle = 30;
    let newMenuIndex, menuLength, lastMenuIndex;
    
    // rotation on basis of on which menu is it carried on
    // basically 2 menus are recorder 'Menu' and 'SubMenu'
    if(this.state.activeScreen === 'Menu'){
      lastMenuIndex = this.state.activeMenuIndex
      menuLength = this.state.menuList.length
    }else if(this.state.activeScreen === "SubMenu"){
      lastMenuIndex = this.state.activeSubMenuIndex
      menuLength = this.state.subMenuList.length 
    }
    

    // binding the rotation eventHandler
    this.zt.bind(menu, 'rotate', (e) => {

        // calculate total angle
        let totalAngle = e.detail.distanceFromOrigin;
        
        // get the index of the latest menu item that should be selected on the screen w.r.t the last selected item when mouse is put down
        // negative sign because the rotation is opposite to the conventional one
        newMenuIndex = (-1) * Math.floor(totalAngle / angle) + lastMenuIndex;

        // find modulus to length of list
        newMenuIndex = newMenuIndex % menuLength;
        
        // if less than zero adjust according to behavour of the mod operator
        if(newMenuIndex < 0){
          newMenuIndex = menuLength + newMenuIndex
        }
        

        // set state for the selected menu item to reflet in UI (on basis of 'Menu' or 'SubMenu')
        if(this.state.activeScreen === "Menu"){
          this.setState(prevState=>{
            return {
              activeMenuIndex: newMenuIndex
            }
          })
        }else if(this.state.activeScreen === "SubMenu"){
          this.setState(prevState=>{
            return {
              activeSubMenuIndex: newMenuIndex
            }
          })
        }
        
      
        
    });
  }

  // unbinding the rotate eventHandler on mouseUp to prevent from eventHandler to take place on the center button
  mouseOutHandler=(e)=>{
    let menu = document.querySelector('.touch-element');
    
    this.zt.unbind(menu, 'rotate');
  }


  

  // manages how the button clicks (menu button on top and center button are handled)
  // the button clicked is passed to the function
  changeScreensHandler = (button) => {

    
    let activeScreen = this.state.activeScreen
    let selectedMenuItem = this.state.menuList[this.state.activeMenuIndex]
    let selectedSubMenuItem = this.state.subMenuList[this.state.activeSubMenuIndex]

    // if center button clicked
    // managed on basis of which screen is currently active
    if(button === 'center'){
      if(activeScreen === 'Menu'){
        if(selectedMenuItem === 'Music'){
          
          // set state to subMenu for music
          this.setState({activeScreen:'SubMenu'})
        }else{
          
          this.setState({
            activeScreen: selectedMenuItem
          })
        }
      }else if(activeScreen === 'SubMenu'){
          // respond only if selected item is All Music
          if(selectedSubMenuItem === 'All Music'){
            this.setState({
              activeScreen: 'Music'
            })
          }else{
            this.setState({
              activeScreen: selectedSubMenuItem
            })
          }
      }
      // Menu Button Clicked
    }else if(button === 'menu'){
      if(activeScreen === 'Menu'){
        console.log("Menu on Menu");

      }else if(activeScreen === 'SubMenu'){
        this.setState({activeScreen: 'Menu'})

      }else if(activeScreen === 'Music' || activeScreen === 'Artists' || activeScreen === 'Shuffle'){
        this.setState({activeScreen: 'SubMenu'})
      }else{
        this.setState({activeScreen:'Menu'})
      }

    }
  }







  render(){
    
    return (
      <div className="App">

        <Screen currTime={this.state.currTime} totalTime={this.audio.duration}  stateProp = {this.state} />
        
        <TouchPad musicState={this.state.musicState} musicToggle={this.musicPlayPauseHandler} onMouseStart={this.mouseDownHandler} onMouseEnd={this.mouseOutHandler} changeScreenHandler={this.changeScreensHandler}/>

      </div>
    );
  }
}

export default App;
