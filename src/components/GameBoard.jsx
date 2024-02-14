import React, { useEffect, useState } from 'react'
import Cell from './Cell';
import '../css/GameBoard.css';

export default function GameBoard(props) {

  const maxBoardSize = Math.floor((window.screen.availWidth - 50)/25);
  const boardSize = maxBoardSize > 30 ? 30 : maxBoardSize;
  const cells = Array(boardSize).fill(Array(boardSize).fill(0));
  const snakeMoves = ['KeyW', 'KeyA', 'KeyS', 'KeyD'];

  const [snake, setSnake] = useState([[0, 0]]);
  const [apple, setApple] = useState([4, 4]);
  const [direction, setDirection] = useState(snakeMoves[2]);
  const [speed, setSpeed] = useState(100);

  const checkCell = position => {
    switch(true) {
      case position >= boardSize:
        return 0;
      case position < 0:
        return boardSize-1;
      default:
        return position;
    }
  };

  const handleKey = (event) => {
    if (event.repeat) 
      return;
    
    changeDirection(snakeMoves.indexOf(event.code));
  };

  const changeDirection = (index) => {
    if (index > -1 && Math.abs(index - snakeMoves.indexOf(direction)) !== 2) {
      setDirection(snakeMoves[index]);
    }
  }


  const generateApple = () => {
    let newApple;
    do {
      newApple = [
        Math.floor(Math.random() * boardSize),
        Math.floor(Math.random() * boardSize)
      ];
    } while (snake.some(elem => elem[0] === newApple[0] && elem[1] === newApple[1]))
    setApple(newApple);
  };

  useEffect(() => {
    const interval = gameLoop();
    return () => clearInterval(interval);
  }, [snake]);

  const gameLoop = () => {
    const timerId = setTimeout(() => {
      const newSnake = snake;
      let move = [];

      switch (direction) {
        case snakeMoves[0]:
          move = [-1, 0];
          break;
        case snakeMoves[1]:
          move = [0, -1];
          break;
        case snakeMoves[2]:
          move = [1, 0];
          break;
        case snakeMoves[3]:
          move = [0, 1];
          break;
      }

      const head = [
        checkCell(newSnake[newSnake.length - 1][0] + move[0]), 
        checkCell(newSnake[newSnake.length - 1][1] + move[1])
      ];
  
      if (newSnake.some(elem => elem[0] === head[0] && elem[1] === head[1])) {
        setSnake([[0,0]]);
        props.setScore(0);
        setSpeed(100);
        return;
      }

      newSnake.push(head);

      let sliceIndex = 1;
      if (head[0] === apple[0] && head[1] === apple[1]) {
        sliceIndex = 0;
        props.setScore(props.score + 1);
        generateApple();
        if (speed > 15) {
          setSpeed(speed - 3);
        }
        
      }

      setSnake(newSnake.slice(sliceIndex));

    }, speed);
    return timerId;
  }

  return (
    <>
      <div className='gameboard' tabIndex="0" onKeyDown={handleKey}>
        <div className="gameboard__container">
          {cells.map((row, indexR) => (
            <div key={indexR} className='gameboard__row'>
              {row.map((cell, indexC) => {
                let type = snake.some(elem => elem[0] === indexR && elem[1] === indexC) && 'snake';
                
                if (type !== 'snake') 
                  type = (apple[0] === indexR && apple[1] === indexC) && 'apple';
                
                return (
                  <Cell key={indexC} type={type}/>
                )
              })}
            </div>
          ))}
        </div>
      </div>
      {'ontouchstart' in document.documentElement ? 
        <div className='gameboard__controller'>
          <div onClick={() => changeDirection(0)} className='gameboard__btn gameboard__btn--up'></div>
          <div className='gameboard__left-right'>
            <div onClick={() => changeDirection(1)} className='gameboard__btn gameboard__btn--left'></div>
            <div onClick={() => changeDirection(3)} className='gameboard__btn gameboard__btn--right'></div>
          </div>
          <div onClick={() => changeDirection(2)} className='gameboard__btn gameboard__btn--down'></div>
        </div> 
      : ''}
      
    </>
  )
}
