import React from 'react';

const GameItemEmpty = ({dropped, dragOver, index, dragLeave}) => {

  return (
    <div className='field__item__empty' 
    onDrop={dropped} onDragOver={dragOver} data-index={index}
    onDragLeave={dragLeave}
    >
      
    </div>
  );
}

export default GameItemEmpty;
