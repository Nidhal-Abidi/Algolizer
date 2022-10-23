import React from "react"
import Header from "./Header"
import AlgoDescription from "./AlgoDescription"
import { Link } from "react-router-dom"

const SearchAlgorithms = () => {
  const arr_search_algos = [
    {
      id: 0,
      name: "Linear",
      description: "Let's Take It ONE STEP AT A TIME !",
    },
    {
      id: 1,
      name: "Binary",
      description: "I HAVE To Jump To The MIDDLE ELEMENT !!",
    },
  ]
  const arr_list = arr_search_algos.map((algo) => {
    return (
      <Link to={algo.name}>
        <AlgoDescription
          key={algo.id}
          id={algo.id}
          name={algo.name + " Search"}
          description={algo.description}
        />
      </Link>
    )
  })
  return (
    <>
      <Header />
      <center>
        <div style={{ display: "flex", justifyContent: "center" }}>
          {arr_list}
        </div>
      </center>
    </>
  )
}

export default SearchAlgorithms
