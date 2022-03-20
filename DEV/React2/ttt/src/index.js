import ReactDOM from 'react-dom';
import React from 'react';
import './index.css'



class Board extends React.Component {
    render(){
        return(
            <div className='board'>
                <div className='title'>
                    Tic Tac Toe
                </div>
                <div className='content'>

                </div>
            </div>
        )
    }
}


class Display extends React.Component{
    render(){
        let gameStatus = 'Next Move For "X"';
        return(
            <div className='display'> 
            <div className='title'>
                    {gameStatus}
                </div>
                <div className='content'>

                </div>
            </div>
        )
    }
}
class App extends React.Component {
    
    render(){
        
        return(
            <>
            <Board />
            <Display />
            </>
        )
    }
}



ReactDOM.render(<App />, document.getElementById("root"));