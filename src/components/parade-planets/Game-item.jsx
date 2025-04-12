import React, { useEffect, useRef } from 'react';

const GameItem = ({planetItem, startDrag, index, dropped, dragOver, dragLeave, dragEnd}) => {
  
  const itemNameBlock = useRef();

  useEffect(() => {  
    nameFanLetters(8);

  }, [planetItem]);
  


  const nameFanLetters = (value) => {
    const lettersList = itemNameBlock.current.querySelectorAll(".item__name__content");

    itemNameBlock.current.style.transform = `rotate(${(value * lettersList.length) / 2 - value}deg)`;

    let deg = 0;
    for (let item of lettersList) {
      item.style.transform = `rotate(${deg}deg)`;
      deg -= value;
    }

    return value;
  }


  return (
    <div className='field__item'
    style={{background: `url(${planetItem.visualView}) center/cover no-repeat`}}
    onDragStart={startDrag} draggable="true" data-index={index} data-name={planetItem.name}
    onDrop={dropped} onDragOver={dragOver} onDragLeave={dragLeave} onDragEnd={dragEnd}
    >
      <div ref={itemNameBlock} className='item__name'>
        {/* <div className='item__name__content'>{planetItem.name}</div> */}
        {
          planetItem.name.split("").map((item, index) => {
            return  <div key={index} className='item__name__content'>
              <div className='item__name__letter'>
                {item}
              </div>
            </div>
          })
        }
      </div>
      
    </div>
  );
}

export default GameItem;
