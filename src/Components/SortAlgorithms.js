import React from "react"
import Header from "./Header"
import AlgoDescription from "./AlgoDescription"
import { Link } from "react-router-dom"

const SortAlgorithms = () => {
  const arr_sort_algos = [
    {
      id: 0,
      name: "Bubble",
      description: "BUBBLES are in COMPUTER SCIENCE ?!",
    },
    {
      id: 1,
      name: "Selection",
      description: "Where's the SMALLEST ELEMENT at ??",
    },
    {
      id: 2,
      name: "Insertion",
      description: "Let's see if ' ARR[ i ] ' fits here or not !",
    },
  ]
  const arr_list = arr_sort_algos.map((algo) => {
    return (
      <Link to={algo.name}>
        <AlgoDescription
          key={algo.id}
          id={algo.id}
          name={algo.name + " Sort"}
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

export default SortAlgorithms
