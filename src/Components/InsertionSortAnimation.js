import React from "react"
import Header from "./Header"
import "./AlgorithmAnimation.css"
import { Light as SyntaxHighlighter } from "react-syntax-highlighter"
import py from "react-syntax-highlighter/dist/esm/languages/hljs/python"
import { cb } from "react-syntax-highlighter/dist/esm/styles/prism"
SyntaxHighlighter.registerLanguage("python", py)

class InsertionSortAnimation extends React.Component {
  constructor() {
    super()
    this.state = {
      radius: 40,
      edge: 80,
      dx: 20,
      dy: 30,
    }
  }

  rectToCircleAnimation = (ctx, x_axis_pos, y_axis_pos, edge, nbr) => {
    ctx.clearRect(x_axis_pos - 0.5, y_axis_pos - 0.5, edge + 2, edge + 2)
    ctx.lineWidth = 4

    ctx.fillText(nbr, x_axis_pos + edge / 2, y_axis_pos + edge / 2)
    ctx.beginPath()
    ctx.arc(
      x_axis_pos + edge / 2,
      y_axis_pos + edge / 2,
      edge / 2,
      0,
      2 * Math.PI
    )
    ctx.stroke()
  }

  circleToRectAnimation = (ctx, x_axis_pos, y_axis_pos, edge, nbr) => {
    ctx.clearRect(x_axis_pos - 3, y_axis_pos - 3, edge + 6, edge + 6)
    ctx.fillText(nbr, x_axis_pos + edge / 2, y_axis_pos + edge / 2)
    //Attention to below "lineWidth"
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.rect(x_axis_pos, y_axis_pos, edge, edge)
    ctx.stroke()
  }

  clearPreviousData = (ctx, canvasWidth, canvasHeight, animationRslt) => {
    console.log("Clearning Canvas")
    ctx.clearRect(0, 0, canvasWidth, canvasHeight)
    animationRslt.innerHTML = ""
  }

  success = (animationRslt) => {
    console.log("Congrats The Array is Sorted !!")
    animationRslt.innerText = "Congrats The Array is Sorted :)"
    animationRslt.style.backgroundColor = "green"
    animationRslt.style.fontSize = "30px"
  }

  /** 9 is the nbr of squares that we can fit in 1 line (taking into account this config) */
  swap = (arr, step, min_indx, canvas, ctx) => {
    const temp = arr[step]
    //I used green to mark that the current min is included inside the sorted part of the array
    ctx.strokeStyle = "green"
    this.rectToCircleAnimation(
      ctx,
      canvas.width / 10 -
        this.state.edge / 2 +
        (min_indx % 9) * (this.state.edge + this.state.dx),
      canvas.height / 9 -
        this.state.edge / 2 +
        Math.floor(min_indx / 9) * (this.state.edge + this.state.dy),
      this.state.edge,
      temp
    )
    this.circleToRectAnimation(
      ctx,
      canvas.width / 10 -
        this.state.edge / 2 +
        (min_indx % 9) * (this.state.edge + this.state.dx),
      canvas.height / 9 -
        this.state.edge / 2 +
        Math.floor(min_indx / 9) * (this.state.edge + this.state.dy),
      this.state.edge,
      temp
    )
    this.rectToCircleAnimation(
      ctx,
      canvas.width / 10 -
        this.state.edge / 2 +
        (step % 9) * (this.state.edge + this.state.dx),
      canvas.height / 9 -
        this.state.edge / 2 +
        Math.floor(step / 9) * (this.state.edge + this.state.dy),
      this.state.edge,
      arr[min_indx]
    )
    this.circleToRectAnimation(
      ctx,
      canvas.width / 10 -
        this.state.edge / 2 +
        (step % 9) * (this.state.edge + this.state.dx),
      canvas.height / 9 -
        this.state.edge / 2 +
        Math.floor(step / 9) * (this.state.edge + this.state.dy),
      this.state.edge,
      arr[min_indx]
    )

    //Return the stroke to the default color
    ctx.strokeStyle = "black"

    arr[step] = arr[min_indx]
    arr[min_indx] = temp
    return arr
  }

  drawArray = (arrInput, canvas, ctx, animationRslt) => {
    console.log("Drawing Input Array ")

    this.clearPreviousData(ctx, canvas.width, canvas.height, animationRslt)
    /*Note : "x_axis_pos" is different depending on the shape that's being drawn 
              //Circle: it represents the center
              //Square: represents the upper left corner
      
              + to be on top of each other: 
              1) radius = edge / 2
              2) X_circle = X_square + edge/2
                 Y_circle = Y_square + edge/2
          */

    // We start by drawing the squares (ie coordinates below represent upper left corner of square)
    let x_axis_pos = canvas.width / 10 - this.state.radius
    let y_axis_pos = canvas.height / 9 - this.state.radius

    let arrInputValues = arrInput.value.split(",")
    arrInputValues = arrInputValues.map((elt) => {
      return parseInt(elt)
    })

    arrInputValues.forEach((nbr) => {
      if (x_axis_pos + this.state.edge + this.state.dx < canvas.width) {
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        ctx.font = "20px Helvetica"
        ctx.fillStyle = "#38f"
        ctx.lineWidth = 1
        //Code for drawing
        ctx.beginPath()
        ctx.rect(x_axis_pos, y_axis_pos, this.state.edge, this.state.edge)
        ctx.stroke()
        //Write the text inside the shape
        ctx.fillText(
          nbr,
          x_axis_pos + this.state.edge / 2,
          y_axis_pos + this.state.edge / 2
        )

        x_axis_pos += this.state.edge + this.state.dx
      } else {
        //Return to a new line
        y_axis_pos += this.state.edge + this.state.dy
        x_axis_pos = canvas.width / 10 - this.state.radius

        ctx.beginPath()
        ctx.rect(x_axis_pos, y_axis_pos, this.state.edge, this.state.edge)
        ctx.stroke()
        //Write the text inside the shape
        ctx.fillText(
          nbr,
          x_axis_pos + this.state.edge / 2,
          y_axis_pos + this.state.edge / 2
        )
        x_axis_pos += this.state.edge + this.state.dx
      }
    })

    console.log("Let's start the Animation !!")
  }

  onSubmitForm = (event) => {
    event.preventDefault()
    //Extract the HTML tags
    const btn1 = document.querySelector(".btn1")
    const arrInput = document.querySelector("#arr-input")
    const errors = document.querySelector(".error")

    const canvas = document.querySelector("#canvas")
    const ctx = canvas.getContext("2d")
    const animationRslt = document.querySelector(".animation-result")

    // console.log(event.target)
    let errorMsgs = []
    let arrInputValues = [] //So that I can pass it to method "linearSearch"

    if (arrInput.value.length === 0) {
      errorMsgs.push("Array shouldn't be empty")
    } else {
      //Chosen delimitor is "," + all values should be numbers
      arrInputValues = arrInput.value.split(",")
      arrInputValues = arrInputValues.map((elt) => {
        return parseInt(elt)
      })
      const isNumeric = arrInputValues.every((elt) => {
        return typeof elt === "number" && !isNaN(elt)
      })
      if (!isNumeric) {
        errorMsgs.push("Array shouldn't contain non number elements")
      }
    }
    if (errorMsgs.length > 0) {
      console.log(errorMsgs)
      errors.innerText = errorMsgs
    } else {
      errors.innerText = ""
      //We should disable "Begin Animation" btn + enable "Pause/Resume" btn
      //btn2.classList.remove("not-working")

      btn1.setAttribute("disabled", "")
      //console.log(btn1)
      btn1.classList.add("not-working")

      //1)Draw the initial array on the screen
      this.drawArray(arrInput, canvas, ctx, animationRslt)

      //2)Initiate animation
      this.insertionSort(
        arrInputValues,
        arrInputValues.length,
        1,
        0,
        canvas.width / 10 -
          this.state.edge / 2 +
          this.state.edge +
          this.state.dx,
        canvas.height / 9 - this.state.edge / 2,
        canvas.width / 10 - this.state.edge / 2,
        canvas.height / 9 - this.state.edge / 2,
        canvas,
        ctx,
        animationRslt,
        btn1
      )
    }
  }

  insertionSort = (
    arr,
    n,
    i,
    j,
    key_x,
    key_y,
    left_side_x,
    left_side_y,
    canvas,
    ctx,
    animationRslt,
    btn1
  ) => {
    if (i < n) {
      //Condition to Color with orange the key at the beginning of the for loop
      if (j == i - 1) {
        this.rectToCircleAnimation(ctx, key_x, key_y, this.state.edge, arr[i])
        ctx.strokeStyle = "#FFA500"
        this.circleToRectAnimation(ctx, key_x, key_y, this.state.edge, arr[i])
      }

      ctx.strokeStyle = "black"

      if (j >= 0) {
        //Change to circle next possible swap condidate
        this.rectToCircleAnimation(
          ctx,
          left_side_x,
          left_side_y,
          this.state.edge,
          arr[j]
        )
        if (arr[j + 1] < arr[j]) {
          setTimeout(() => {
            arr = this.swap(arr, j, j + 1, canvas, ctx)
            console.log(arr)
            /**Testing area */
            key_x =
              canvas.width / 10 -
              this.state.edge / 2 +
              (j % 9) * (this.state.edge + this.state.dx)
            key_y =
              canvas.height / 9 -
              this.state.edge / 2 +
              Math.floor(j / 9) * (this.state.edge + this.state.dy)

            left_side_x =
              canvas.width / 10 -
              this.state.edge / 2 +
              ((j - 1) % 9) * (this.state.edge + this.state.dx)
            left_side_y =
              canvas.height / 9 -
              this.state.edge / 2 +
              Math.floor((j - 1) / 9) * (this.state.edge + this.state.dy)

            this.insertionSort(
              arr,
              n,
              i,
              j - 1,
              key_x,
              key_y,
              left_side_x,
              left_side_y,
              canvas,
              ctx,
              animationRslt,
              btn1
            )
          }, 1500)
        } else {
          //There are no possible swaps on the left side of the key
          setTimeout(() => {
            //Let the key + element on left of it become green rectangles
            ctx.strokeStyle = "green"
            this.circleToRectAnimation(
              ctx,
              key_x,
              key_y,
              this.state.edge,
              arr[j + 1]
            )
            this.circleToRectAnimation(
              ctx,
              left_side_x,
              left_side_y,
              this.state.edge,
              arr[j]
            )
            ctx.strokeStyle = "black"

            //Change the (x,y) coord for both the key & elt left of it.
            key_x =
              canvas.width / 10 -
              this.state.edge / 2 +
              ((i + 1) % 9) * (this.state.edge + this.state.dx)
            key_y =
              canvas.height / 9 -
              this.state.edge / 2 +
              Math.floor((i + 1) / 9) * (this.state.edge + this.state.dy)

            left_side_x =
              canvas.width / 10 -
              this.state.edge / 2 +
              (i % 9) * (this.state.edge + this.state.dx)
            left_side_y =
              canvas.height / 9 -
              this.state.edge / 2 +
              Math.floor(i / 9) * (this.state.edge + this.state.dy)

            this.insertionSort(
              arr,
              n,
              i + 1,
              i,
              key_x,
              key_y,
              left_side_x,
              left_side_y,
              canvas,
              ctx,
              animationRslt,
              btn1
            )
          }, 1500)
        }
      } else {
        //Next iteration
        setTimeout(() => {
          //Change the (x,y) coord for both the key & elt left of it.
          key_x =
            canvas.width / 10 -
            this.state.edge / 2 +
            ((i + 1) % 9) * (this.state.edge + this.state.dx)
          key_y =
            canvas.height / 9 -
            this.state.edge / 2 +
            Math.floor((i + 1) / 9) * (this.state.edge + this.state.dy)

          left_side_x =
            canvas.width / 10 -
            this.state.edge / 2 +
            (i % 9) * (this.state.edge + this.state.dx)
          left_side_y =
            canvas.height / 9 -
            this.state.edge / 2 +
            Math.floor(i / 9) * (this.state.edge + this.state.dy)

          this.insertionSort(
            arr,
            n,
            i + 1,
            i,
            key_x,
            key_y,
            left_side_x,
            left_side_y,
            canvas,
            ctx,
            animationRslt,
            btn1
          )
        }, 1500)
      }
    } else {
      console.log("Array is sorted !!")
      this.success(animationRslt)
      btn1.removeAttribute("disabled")
      btn1.classList.remove("not-working")
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="error"></div>
        <div className="container">
          <div className="toppane">
            {/* Input Section */}
            <form action="#" onSubmit={this.onSubmitForm}>
              <div className="input-values">
                <label htmlFor="arr-input">Array values </label>
                <input
                  type="text"
                  name="arr-input"
                  id="arr-input"
                  className="arr-input-sort"
                />
              </div>

              <div className="animation-control">
                <button type="submit" className="btn1">
                  Begin Animation
                </button>
                {/*<!-- <button className="btn2 not-working" disabled>Pause/Resume</button> -->*/}
              </div>
            </form>
          </div>
          <div className="leftpane">
            {/*<!-- Animation Section -->*/}
            <h1>Animation Section</h1>
            <div className="animation-result"></div>
            <canvas id="canvas" width="1000" height="700"></canvas>
          </div>
          <div className="rightpane">
            {/*<!-- Code section -->*/}
            <h1>Code Section</h1>
            <SyntaxHighlighter
              language="cpp"
              style={cb}
              codeTagProps={{
                style: { fontSize: "1.3rem" },
              }}
            >
              {`def insertionSort(arr):
  for i in range(1, len(arr)):
    key = arr[i]
    j = i-1
    #swap(arr[j+1] & arr[j]) until we reach 
    #the correct position
    while j >=0 and key < arr[j] :
      arr[j+1] = arr[j]
      j -= 1
    arr[j+1] = key`}
            </SyntaxHighlighter>
            <h1>Space & Time Complexity</h1>
            <SyntaxHighlighter
              language="md"
              style={cb}
              codeTagProps={{
                style: { fontSize: "1.6rem" },
              }}
            >
              {`Time Complexity: O(N²)\nSpace Complexity: O(1)`}
            </SyntaxHighlighter>
          </div>
        </div>
      </>
    )
  }
}

export default InsertionSortAnimation
