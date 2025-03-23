import React from 'react';

const GameItemPlanet = ({planetItem, index}) => {

  // console.log("planetItem", planetItem);

  return (
    <span className='field__item__planet'
      // style={{background: `url(${planetItem.visualView}) center/cover no-repeat`}}
      style={{"--i": `${index + 1}`}}
      data-index={index} data-name={planetItem.name}
    >
      <img src={planetItem.visualView} alt="" />
    </span>
  );
}

export default GameItemPlanet;
