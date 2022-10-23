import React from "react"
import "./AlgoDescription.css"

const AlgoDescription = (props) => {
  return (
    <>
      <div id="card">
        <img
          className="card-img"
          src={`https://robohash.org/${props.id}?200*200`}
          alt="algo_name"
        />
        <div>
          <h2>{props.name}</h2>
          <p>{props.description}</p>
        </div>
      </div>
    </>
  )
}

export default AlgoDescription
