import React from 'react'
import './Collection.css'
import all_products from '../assets/all_products'

const Collection = () => {
  return (
    <div className="collections">
      <h1>Collection</h1>
      <hr />
      <div className="collections-view">View all</div>

      <div className="collections-grid">
        {all_products.map((item) => (
          <div className="collection-card" key={item.id}>
            <div className="collection-card-img">
              {item.image ? (
                <img src={item.image} alt={item.title} />
              ) : (
                <span>{item.emoji}</span>
              )}
              {item.badge && (
                <div className="collection-card-badge">{item.badge}</div>
              )}
            </div>
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
            <div className="collection-card-footer">
              <span className="collection-card-count">{item.count}</span>
              <button className="collection-card-btn">Shop now</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Collection