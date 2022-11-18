import React from "react"
import Header from "./Header"
import "./AlgorithmAnimation.css"
import { Light as SyntaxHighlighter } from "react-syntax-highlighter"
import py from "react-syntax-highlighter/dist/esm/languages/hljs/python"
import { cb } from "react-syntax-highlighter/dist/esm/styles/prism"
SyntaxHighlighter.registerLanguage("python", py)

class BubbleSortAnimation extends React.Component {
  constructor() {
    super()
    this.state = {
      radius: 40,
      edge: 80,
      dx: 20,
      dy: 30,
      speed: 2000,
    }
  }
  rectToCircleAnimation = (ctx, x_axis_pos, y_axis_pos, edge, nbr) => {
    ctx.clearRect(x_axis_pos - 0.5, y_axis_pos - 0.5, edge + 2, edge + 2)
    ctx.lineWidth = 5

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
    ctx.lineWidth = 1
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

  bubbleSort = (
    arr,
    i,
    j,
    x_axis_pos_back,
    y_axis_pos_back,
    x_axis_pos_front,
    y_axis_pos_front,
    ctx,
    canvas,
    animationRslt,
    btn1
  ) => {
    if (j > 1) {
      if (i < arr.length - 2) {
        //console.log(arr[i] + " , " + arr[i + 1])
        this.rectToCircleAnimation(
          ctx,
          x_axis_pos_back,
          y_axis_pos_back,
          this.state.edge,
          arr[i]
        )
        this.rectToCircleAnimation(
          ctx,
          x_axis_pos_front,
          y_axis_pos_front,
          this.state.edge,
          arr[i + 1]
        )
        if (arr[i] > arr[i + 1]) {
          setTimeout(() => {
            console.log("swap " + arr[i] + " & " + arr[i + 1])

            let temp = arr[i]
            arr[i] = arr[i + 1]
            arr[i + 1] = temp
            //console.log(arr)
            this.bubbleSort(
              arr,
              i,
              j,
              x_axis_pos_back,
              y_axis_pos_back,
              x_axis_pos_front,
              y_axis_pos_front,
              ctx,
              canvas,
              animationRslt,
              btn1
            )
          }, this.state.speed)
        } else {
          setTimeout(() => {
            this.circleToRectAnimation(
              ctx,
              x_axis_pos_back,
              y_axis_pos_back,
              this.state.edge,
              arr[i]
            )
            if (
              x_axis_pos_back + 2 * (this.state.edge + this.state.dx) <
              canvas.width
            ) {
              //Still on the same line
              x_axis_pos_back += this.state.edge + this.state.dx
            } else {
              //Back to a new line
              x_axis_pos_back = canvas.width / 10 - this.state.edge / 2
              y_axis_pos_back += this.state.edge + this.state.dy
            }

            //Same logic for x_axis_pos_front

            if (
              x_axis_pos_front + 2 * (this.state.edge + this.state.dx) <
              canvas.width
            ) {
              x_axis_pos_front += this.state.edge + this.state.dx
            } else {
              x_axis_pos_front = canvas.width / 10 - this.state.edge / 2
              y_axis_pos_front += this.state.edge + this.state.dy
            }

            //console.log("x: " + x_axis_pos)
            this.bubbleSort(
              arr,
              i + 1,
              j,
              x_axis_pos_back,
              y_axis_pos_back,
              x_axis_pos_front,
              y_axis_pos_front,
              ctx,
              canvas,
              animationRslt,
              btn1
            )
          }, this.state.speed)
        }
      } else if (i == arr.length - 2) {
        this.rectToCircleAnimation(
          ctx,
          x_axis_pos_back,
          y_axis_pos_back,
          this.state.edge,
          arr[arr.length - 2]
        )
        this.rectToCircleAnimation(
          ctx,
          x_axis_pos_front,
          y_axis_pos_front,
          this.state.edge,
          arr[arr.length - 1]
        )
        if (arr[arr.length - 2] > arr[arr.length - 1]) {
          setTimeout(() => {
            console.log("swap " + arr[i] + " & " + arr[i + 1])

            let temp = arr[i]
            arr[i] = arr[i + 1]
            arr[i + 1] = temp
            console.log(arr)
            this.bubbleSort(
              arr,
              i + 1,
              j,
              x_axis_pos_back,
              y_axis_pos_back,
              x_axis_pos_front,
              y_axis_pos_front,
              ctx,
              canvas,
              animationRslt,
              btn1
            )
          }, this.state.speed)
        } else {
          setTimeout(() => {
            this.bubbleSort(
              arr,
              i + 1,
              j,
              x_axis_pos_back,
              y_axis_pos_back,
              x_axis_pos_front,
              y_axis_pos_front,
              ctx,
              canvas,
              animationRslt,
              btn1
            )
          }, this.state.speed)
        }
      } else {
        this.rectToCircleAnimation(
          ctx,
          x_axis_pos_back,
          y_axis_pos_back,
          this.state.edge,
          arr[arr.length - 2]
        )
        this.rectToCircleAnimation(
          ctx,
          x_axis_pos_front,
          y_axis_pos_front,
          this.state.edge,
          arr[arr.length - 1]
        )

        setTimeout(() => {
          this.circleToRectAnimation(
            ctx,
            x_axis_pos_back,
            y_axis_pos_back,
            this.state.edge,
            arr[arr.length - 2]
          )
          this.circleToRectAnimation(
            ctx,
            x_axis_pos_front,
            y_axis_pos_front,
            this.state.edge,
            arr[arr.length - 1]
          )
          /*Get back to the beginning of the array to do another iteration +
          check whether or not there are more swaps to be done */
          x_axis_pos_back = canvas.width / 10 - this.state.edge / 2
          y_axis_pos_back = canvas.height / 9 - this.state.edge / 2

          x_axis_pos_front =
            canvas.width / 10 -
            this.state.edge / 2 +
            (this.state.edge + this.state.dx)
          y_axis_pos_front = canvas.height / 9 - this.state.edge / 2
          this.bubbleSort(
            arr,
            0,
            j - 1,
            x_axis_pos_back,
            y_axis_pos_back,
            x_axis_pos_front,
            y_axis_pos_front,
            ctx,
            canvas,
            animationRslt,
            btn1
          )
        }, this.state.speed)
      }
    } else {
      this.success(animationRslt)
      btn1.removeAttribute("disabled")
      btn1.classList.remove("not-working")
      console.log("Congrats: The array is Sorted")
    }
  }

  onSubmitForm = (event) => {
    event.preventDefault()
    //Extract the HTML tags
    const btn1 = document.querySelector(".btn1")
    const arrInput = document.querySelector("#arr-input")
    const errors = document.querySelector(".error")
    const selectTag = document.querySelector("#speed")

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
      //I don't think it works
      errors.innerText = errorMsgs
    } else {
      //Save the speed of the animation
      const speedAnimation = selectTag.value
      if (speedAnimation == "1X") {
        this.setState({ speed: 1500 })
      } else if (speedAnimation == "1.5X") {
        this.setState({ speed: 1000 })
      }

      errors.innerText = ""
      //We should disable "Begin Animation" btn + enable "Pause/Resume" btn
      //btn2.classList.remove("not-working")

      btn1.setAttribute("disabled", "")
      //console.log(btn1)
      btn1.classList.add("not-working")

      //1)Draw the initial array on the screen
      this.drawArray(arrInput, canvas, ctx, animationRslt)

      //2)Initiate animation

      this.bubbleSort(
        arrInputValues,
        0,
        arrInputValues.length,
        canvas.width / 10 - this.state.edge / 2,
        canvas.height / 9 - this.state.edge / 2,
        canvas.width / 10 -
          this.state.edge / 2 +
          (this.state.edge + this.state.dx),
        canvas.height / 9 - this.state.edge / 2,
        ctx,
        canvas,
        animationRslt,
        btn1
      )
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

                <select name="speed" id="speed">
                  <option value={"0.5X"}>0.5X</option>
                  <option value={"1X"}>1X</option>
                  <option value={"1.5X"}>1.5X</option>
                </select>
              </div>

              <div className="animation-control">
                <button type="submit" className="btn1">
                  Begin Animation
                </button>
              </div>
            </form>
          </div>
          <div className="leftpane">
            {/*<!-- Animation Section -->*/}
            <h1>Animation Section</h1>
            <div className="animation-result"></div>
            {/* If you add styling to the canvas in a CSS file the shapes displayed will be blurred, 
            we have to set the values of width and height in HTML to avoid that. 
            The prob is that it's not responsive at all */}
            <canvas id="canvas" width="1000" height="700"></canvas>
          </div>
          <div className="rightpane">
            {/*<!-- Code section -->*/}
            <h1>Code Section</h1>
            <SyntaxHighlighter
              language="python"
              style={cb}
              codeTagProps={{
                style: { fontSize: "1.5rem" },
              }}
            >
              {`def bubbleSort(arr):
  n = len(arr)
  for i in range(n):
    # Last i elements are already in place
    for j in range(0, n-i-1):
      if (arr[j] > arr[j+1]):
        # swap(arr[j],arr[j+1])
        arr[j],arr[j+1] = arr[j+1],arr[j]`}
            </SyntaxHighlighter>
            <h1>Space & Time Complexity</h1>
            <SyntaxHighlighter
              language="md"
              style={cb}
              codeTagProps={{
                style: { fontSize: "1.7rem" },
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

export default BubbleSortAnimation
