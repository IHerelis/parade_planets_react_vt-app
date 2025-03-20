import React from 'react';

const GameItem = ({planetItem, startDrag, index, dropped, dragOver, dragLeave, dragEnd}) => {

  return (
    <div className='field__item' 
    style={{background: `url(${planetItem.visualView}) center/cover no-repeat`}}
    onDragStart={startDrag} draggable="true" data-index={index} data-name={planetItem.name}
    onDrop={dropped} onDragOver={dragOver} onDragLeave={dragLeave} onDragEnd={dragEnd}
    >
      
    </div>
  );
}

export default GameItem;
