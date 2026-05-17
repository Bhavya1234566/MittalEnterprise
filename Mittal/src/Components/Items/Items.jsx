import React from 'react'
import './Items.css'

const Items = (props) => {

  const popularcart = () => {
    alert ("Added")
  }
  return (
    <div>
      <img src={props.image} alt="" />
      <p>{props.name}</p>
      <div className='item-prices'>
        <div className='item-price-new'>
            ${props.new_price}
        </div>
        <div className='item-price-old'>
            ${props.old_price}
        </div>
      </div>
      <button type="button" className="btn btn-success item-cart" onClick={popularcart}>Shop now</button>
    </div>
  )
}

export default Items
