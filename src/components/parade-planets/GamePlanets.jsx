import React, { useState } from 'react';
import './GamePlanets.css';
import {shuffle} from './shuffleFunction.js';
import {arrayFieldParade} from './variables.js';
import planetsList from './planetsList.js';
import GameItem from './Game-item.jsx';
import GameItemEmpty from './Game-item-empty.jsx';



const GamePlanets = () => {

  const [shuffledArray, setShuffledArray] = useState(shuffle(planetsList));
  const [planetsParadeList, setPlanetsParadeList] = useState(arrayFieldParade);

  // console.log('shuffledArray', shuffledArray);
  // console.log('planetsParadeList', planetsParadeList);


  const checkAvailabilityItem = (list, elementName) => {
    const itemHere = list.find(item => item.name === elementName);
    return itemHere;
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

        setPlanetsParadeList([...newParadeArray]);

        // console.log('checkPoint 1');
        // console.log('check', checkAvailabilityItem(planetsParadeList, itemName));
      } else {
          const newParadeArray = [...planetsParadeList];
          newParadeArray.splice(overPlaceIndex, 1, shuffledArray[itemIndex]);
          setPlanetsParadeList([...newParadeArray]);
    
          const newArray = [...shuffledArray];
          newArray.splice(itemIndex, 1, planetsParadeList[overPlaceIndex]); 
          setShuffledArray([...newArray]);

          // console.log('checkPoint 2');
          // console.log('check', checkAvailabilityItem(planetsParadeList, itemName));
        }

    } else if (e.target.parentElement.matches('div.game-board')) {

        if (checkAvailabilityItem(shuffledArray, itemName)) {
          const newArray = [...shuffledArray];
          newArray.splice(itemIndex, 1, shuffledArray[overPlaceIndex]);
          newArray.splice(overPlaceIndex, 1, shuffledArray[itemIndex]);

          setShuffledArray([...newArray]);

          // console.log('checkPoint 3');
          // console.log('check', checkAvailabilityItem(shuffledArray, itemName));

        } else {
            const newArray = [...shuffledArray];
            newArray.splice(overPlaceIndex, 1, planetsParadeList[itemIndex]);
      
            setShuffledArray([...newArray]);
      
            const newParadeArray = [...planetsParadeList];
            newParadeArray.splice(itemIndex, 1, shuffledArray[overPlaceIndex]);
      
            setPlanetsParadeList([...newParadeArray]);

            // console.log('checkPoint 4');
            // console.log('check', checkAvailabilityItem(shuffledArray, itemName));
          }

      }
  }


  return (
    <div className='game-planets__wrap'>    
      <h1>Game "parade planets"</h1>
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
    </div>
  );
}

export default GamePlanets;
