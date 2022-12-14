import { Route, Routes, Navigate } from "react-router-dom"
import SortAlgorithms from "./Components/SortAlgorithms"
import SearchAlgorithms from "./Components/SearchAlgorithms"
import LinearSearchAnimation from "./Components/LinearSearchAnimation"
import BinarySearchAnimation from "./Components/BinarySearchAnimation"
import BubbleSortAnimation from "./Components/BubbleSortAnimation"
import SelectionSortAnimation from "./Components/SelectionSortAnimation"
import InsertionSortAnimation from "./Components/InsertionSortAnimation"

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/sort" />} />
        <Route path="/sort" element={<SortAlgorithms />} />
        <Route path="/sort/bubble" element={<BubbleSortAnimation />} />
        <Route path="/sort/selection" element={<SelectionSortAnimation />} />
        <Route path="/sort/insertion" element={<InsertionSortAnimation />} />
        <Route path="/search" element={<SearchAlgorithms />} />
        <Route path="/search/linear" element={<LinearSearchAnimation />} />
        <Route path="/search/binary" element={<BinarySearchAnimation />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  )
}

export default App
