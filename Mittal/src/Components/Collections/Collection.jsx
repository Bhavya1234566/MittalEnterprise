import React from 'react'
import './Collection.css'
import all_products from '../assets/all_products'
import Items from '../Items/Items'

const Collection = () => {
  return (
    <div className="collections">
      <h1>Collection</h1>
      <hr />
      <div className="collections-view">View all</div>

      <div className="collections-grid">
        {all_products.map((item) => (
          <Items
            key={item.id}
            id={item.id}
            name={item.name}
            image={item.image}
            new_price={item.new_price}
            old_price={item.old_price}
            badge={item.badge}
          />
        ))}
      </div>
    </div>
  )
}

export default Collection