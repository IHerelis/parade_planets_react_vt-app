import React, { useEffect, useRef, useState } from 'react';
import './GamePlanets.css';
import {shuffle} from './shuffleFunction.js';
import {arrayFieldParade} from './variables.js';
import planetsList from './planetsList.js';
import GameItem from './Game-item.jsx';
import GameItemEmpty from './Game-item-empty.jsx';
import GameItemPlanet from './Game-item-planet.jsx';



const GamePlanets = () => {

  const setItemToLocalStorage = (name, item) => {
    localStorage.setItem(`${name}`, JSON.stringify(item));
  }
  const getItemToLocalStorage = (name) => {
    return JSON.parse(localStorage.getItem(`${name}`));
  }

  const [shuffledArray, setShuffledArray] = useState(getItemToLocalStorage("shuffledArray") || shuffle(planetsList));
  const [planetsParadeList, setPlanetsParadeList] = useState(getItemToLocalStorage("planetsParadeList") || arrayFieldParade);

  const [gameVictory, setGameVictory] = useState(false);

  useEffect(() => {
    if (auditVictory(planetsList, planetsParadeList)) {
      setGameVictory(true);
    }
    // console.log("auditVictory", auditVictory(planetsList, planetsParadeList));
  }, [planetsParadeList]);

  // console.log('planetsList', planetsList);
  // console.log('shuffledArray', shuffledArray);
  // console.log('planetsParadeList', planetsParadeList);

  const rocketHero = useRef();

  const rocketHeroControl = (e) => {
    if (e.pageX < 45) {
      rocketHero.current.setAttribute('style', `top: ${e.pageY-45}px; left: 0px;`);
    } else if (e.pageY < 45) {
        rocketHero.current.setAttribute('style', `top: 0px; left: ${e.pageX-45}px;`);
      } else {
          rocketHero.current.setAttribute('style', `top: ${e.pageY-45}px; left: ${e.pageX-45}px;`);
        }
    // console.log("e.pageX", e.pageX);
    // console.log("e.pageY", e.pageY);
  }

  const checkAvailabilityItem = (list, elementName) => {
    const itemHere = list.find(item => item.name === elementName);
    return itemHere;
  }

  const auditVictory = (victoryArray, curentArray) => {
    return (victoryArray.length === curentArray.length && victoryArray.every((value, index) => value === curentArray[index]));
  }

  const newStartGame = () => {
    localStorage.removeItem("shuffledArray");
    localStorage.removeItem("planetsParadeList");
    setShuffledArray(shuffle(planetsList));
    setPlanetsParadeList(arrayFieldParade);
    setGameVictory(false);
  }

  
  const startDrag = (e) => {
    e.dataTransfer.setData('index', e.target.dataset.index);
    e.dataTransfer.setData('name', e.target.dataset.name);
  }

  const dragOver = (e) => {
    e.preventDefault();

    e.target.style.opacity = "0.5";
  }

  const dragLeave = (e) => {
    e.target.style.opacity = "1";
  }

  const dragEnd = (e) => {
    e.target.style.opacity = "1";
  }

  const dropped = (e) => {
    e.preventDefault();
    const itemIndex = e.dataTransfer.getData('index');
    const itemName = e.dataTransfer.getData('name');
    const overPlaceIndex = e.target.dataset.index;

    e.target.style.opacity = "1";

    // console.log('itemName', itemName);


    if (e.target.parentElement.matches('div.game-parade__board')) {

      if (checkAvailabilityItem(planetsParadeList, itemName)) {
        const newParadeArray = [...planetsParadeList];
        newParadeArray.splice(itemIndex, 1, planetsParadeList[overPlaceIndex]);
        newParadeArray.splice(overPlaceIndex, 1, planetsParadeList[itemIndex]);

        setItemToLocalStorage("planetsParadeList", newParadeArray);
        setPlanetsParadeList([...newParadeArray]);

        // console.log('checkPoint 1');
        // console.log('check', checkAvailabilityItem(planetsParadeList, itemName));
      } else {
          const newParadeArray = [...planetsParadeList];
          newParadeArray.splice(overPlaceIndex, 1, shuffledArray[itemIndex]);

          setItemToLocalStorage("planetsParadeList", newParadeArray);
          setPlanetsParadeList([...newParadeArray]);
    
          const newShuffledArray = [...shuffledArray];
          newShuffledArray.splice(itemIndex, 1, planetsParadeList[overPlaceIndex]); 

          setItemToLocalStorage("shuffledArray", newShuffledArray);
          setShuffledArray([...newShuffledArray]);

          // console.log('checkPoint 2');
          // console.log('check', checkAvailabilityItem(planetsParadeList, itemName));
        }

    } else if (e.target.parentElement.matches('div.game-board')) {

        if (checkAvailabilityItem(shuffledArray, itemName)) {
          const newShuffledArray = [...shuffledArray];
          newShuffledArray.splice(itemIndex, 1, shuffledArray[overPlaceIndex]);
          newShuffledArray.splice(overPlaceIndex, 1, shuffledArray[itemIndex]);

          setItemToLocalStorage("shuffledArray", newShuffledArray);
          setShuffledArray([...newShuffledArray]);

          // console.log('checkPoint 3');
          // console.log('check', checkAvailabilityItem(shuffledArray, itemName));
        } else {
            const newShuffledArray = [...shuffledArray];
            newShuffledArray.splice(overPlaceIndex, 1, planetsParadeList[itemIndex]);
      
            setItemToLocalStorage("shuffledArray", newShuffledArray);
            setShuffledArray([...newShuffledArray]);
      
            const newParadeArray = [...planetsParadeList];
            newParadeArray.splice(itemIndex, 1, shuffledArray[overPlaceIndex]);
      
            setItemToLocalStorage("planetsParadeList", newParadeArray);
            setPlanetsParadeList([...newParadeArray]);

            // console.log('checkPoint 4');
            // console.log('check', checkAvailabilityItem(shuffledArray, itemName));
          }

      }
  }


  return (
    <div className='game-planets__space' onMouseMove={(e) => rocketHeroControl(e)}>
      <div className="obj-Hero" ref={rocketHero}></div>
      <div className='game-planets__wrap'>
        <div className='game-panel'>
          <button className='new-game__btn' onClick={newStartGame}>New Game "parade planets"</button>
        </div>
        {!gameVictory && 
          <>
            <div className='game-parade__board'>
              {planetsParadeList.map((item, index) => {
                if (item !== "") {
                    return <GameItem
                    key={index} 
                    planetItem={item}
                    startDrag={startDrag} index={index}
                    dropped={dropped} dragOver={dragOver} dragLeave={dragLeave} dragEnd={dragEnd}
                    />
                } else {
                    return <GameItemEmpty 
                    key={index} 
                    dropped={dropped} dragOver={dragOver} index={index}
                    dragLeave={dragLeave}
                    />
                  }
              })}
            </div>
            <div className='game-board'>
              {shuffledArray.map((item, index) => {
                if (item !== "") {
                  return <GameItem
                  key={index} 
                  planetItem={item}
                  startDrag={startDrag} index={index}
                  dropped={dropped} dragOver={dragOver} dragLeave={dragLeave} dragEnd={dragEnd}
                  />
                } else {
                    return <GameItemEmpty 
                    key={index} 
                    dropped={dropped} dragOver={dragOver} index={index}
                    dragLeave={dragLeave}
                    />
                  }
              })}
            </div>
          </>
        }
        {gameVictory && 
          <div className='game-visual__board'>
            <div className='visual__board__slider'>
              {planetsList.toReversed().map((item, index) => {
                if (item.id !== 1000) {
                  return <GameItemPlanet
                  key={index} 
                  planetItem={item}
                  index={index} 
                  />
                }
              })}
            </div>
            <div className='visual__board__center'>
              <GameItemPlanet planetItem={planetsList[0]} index={0}/>
            </div>
          </div>
        }
      </div>     
    </div>
  );
}

export default GamePlanets;
