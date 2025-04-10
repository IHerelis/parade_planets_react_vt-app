import React from 'react';

const GameItem = ({planetItem, startDrag, index, dropped, dragOver, dragLeave, dragEnd}) => {
  
  // const nameFanLetters = (value) => {
  //   const lettersList = document.querySelectorAll(".item__name");

  //   let deg = 0;
  //   for (let item of lettersList) {
  //     item.style.transform = `rotate(${deg}deg)`;
  //     deg += value;
  //   }

  //   return value;
  // }
  // nameFanLetters(50);

  return (
    <div className='field__item' 
    style={{background: `url(${planetItem.visualView}) center/cover no-repeat`}}
    onDragStart={startDrag} draggable="true" data-index={index} data-name={planetItem.name}
    onDrop={dropped} onDragOver={dragOver} onDragLeave={dragLeave} onDragEnd={dragEnd}
    >
      <div className='item__name'>
        <div className='item__name__content'>{planetItem.name}</div>
        {/* {
          planetItem.name.split("").map((item, index) => {
            return  <div key={index} className='item__name__content'>{item}</div>
          })
        } */}
      </div>
      
    </div>
  );
}

export default GameItem;
