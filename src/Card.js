import React from 'react'

const Card = ({joke}) => {

    return (
        <div className="card bg-dark border-light"  style={{width: '18rem'}}>
  <img src={joke.icon_url} className="card-img-top" alt="..." />
  <div className="card-body">
    <p className="card-text">{joke.value}</p>
  </div>
</div>

    )
}

export default Card
