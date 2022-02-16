import React from "react";

const Pizza =({guests, allGuests})=>{

  let sliseStep = 360/guests.length;
      
    return(
        <div className="pizza-wrapper">
        <div className="pizza">
          {guests.map((item, index)=>{
            let styleLine = {
              transform: `rotate(${sliseStep*index}deg)`
            }
            return (
              <div className="sliсe-line" style={styleLine} key={index}></div>
            )
          })} 
        </div>
        <div className="descriptions">
          <p>всего гостей: {allGuests.length} гостей</p>
          <p>пиццу едят: {guests.length} гостей</p>
        </div>
    </div>
    )
}
export default Pizza