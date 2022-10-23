import React from "react"
import Header from "./Header"
import "./AlgorithmAnimation.css"
import { Light as SyntaxHighlighter } from "react-syntax-highlighter"
import py from "react-syntax-highlighter/dist/esm/languages/hljs/python"
import { cb } from "react-syntax-highlighter/dist/esm/styles/prism"
SyntaxHighlighter.registerLanguage("python", py)

class BinarySearchAnimation extends React.Component {
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
    ctx.clearRect(x_axis_pos - 0.5, y_axis_pos - 0.5, edge + 5, edge + 5)
    ctx.fillText(nbr, x_axis_pos + edge / 2, y_axis_pos + edge / 2)

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
    console.log("Congrats We Found The Key !!")
    animationRslt.innerText = "Congrats We Found The Key :)"
    animationRslt.style.backgroundColor = "green"
    animationRslt.style.fontSize = "30px"
  }

  failure = (animationRslt) => {
    console.log("Unfortunately We Couldn't Find The Key !!")
    animationRslt.innerText = "Unfortunately We Couldn't Find The Key !!"
    animationRslt.style.backgroundColor = "red"
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

  binarySearch = (
    arrNbrs,
    key,
    ctx,
    canvas,
    animationRslt,
    btn1,
    low,
    high
  ) => {
    if (low > high) {
      this.failure(animationRslt)
      btn1.removeAttribute("disabled")
      btn1.classList.remove("not-working")
      //console.log(btn1)
      return -1
    } else {
      let mid = parseInt((low + high) / 2)
      let x_axis_pos =
        canvas.width / 10 -
        this.state.edge / 2 +
        (mid % 9) * (this.state.edge + this.state.dx)
      let y_axis_pos =
        canvas.height / 9 -
        this.state.edge / 2 +
        Math.floor(mid / 9) * (this.state.edge + this.state.dy)
      /*
        console.log("mid : " + mid)
        console.log("x_axis_pos : " + x_axis_pos)
        console.log("y_axis_pos : " + y_axis_pos)
        */
      this.rectToCircleAnimation(
        ctx,
        x_axis_pos,
        y_axis_pos,
        this.state.edge,
        arrNbrs[mid]
      )
      if (arrNbrs[mid] === parseInt(key)) {
        this.success(animationRslt)
        btn1.removeAttribute("disabled")
        btn1.classList.remove("not-working")
        //console.log(btn1)
        return mid
      } else if (arrNbrs[mid] < parseInt(key)) {
        console.log(arrNbrs[mid] + "<" + parseInt(key))
        setTimeout(() => {
          this.circleToRectAnimation(
            ctx,
            x_axis_pos,
            y_axis_pos,
            this.state.edge,
            arrNbrs[mid]
          )
          this.binarySearch(
            arrNbrs,
            key,
            ctx,
            canvas,
            animationRslt,
            btn1,
            mid + 1,
            high
          )
        }, 1700)
      } else {
        setTimeout(() => {
          this.circleToRectAnimation(
            ctx,
            x_axis_pos,
            y_axis_pos,
            this.state.edge,
            arrNbrs[mid]
          )
          this.binarySearch(
            arrNbrs,
            key,
            ctx,
            canvas,
            animationRslt,
            btn1,
            low,
            mid - 1
          )
        }, 1700)
      }
    }
  }

  onSubmitForm = (e) => {
    e.preventDefault()
    //Extract the HTML tags
    const btn1 = document.querySelector(".btn1")
    const arrInput = document.querySelector("#arr-input")
    const key = document.querySelector("#search-key")
    const errors = document.querySelector(".error")

    const canvas = document.querySelector("#canvas")
    const ctx = canvas.getContext("2d")
    const animationRslt = document.querySelector(".animation-result")

    // console.log(event.target)
    let errorMsgs = []
    let arrInputValues = [] //So that I can pass it to method "binarySearch"
    if (key.value === "" || key.value == null) {
      errorMsgs.push("Key value shouldn't be empty")
    }
    if (key.value.match(/[^0-9]+/)) {
      errorMsgs.push("Key value shouldn't contain more than 1 NUMERIC value")
    }

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
      errors.innerText = ""
      //We should disable "Begin Animation" btn + enable "Pause/Resume" btn
      //btn2.classList.remove("not-working")

      btn1.setAttribute("disabled", "")
      //console.log(btn1)
      btn1.classList.add("not-working")

      //1)Draw the initial array on the screen
      this.drawArray(arrInput, canvas, ctx, animationRslt)

      //2)Initiate animation
      this.binarySearch(
        arrInputValues,
        key.value,
        ctx,
        canvas,
        animationRslt,
        btn1,
        0,
        arrInputValues.length - 1
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
                <input type="text" name="arr-input" id="arr-input" />

                <label htmlFor="search-key">Key to search for</label>
                <input type="text" name="search-key" id="search-key" />
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
              language="python"
              style={cb}
              codeTagProps={{
                style: { fontSize: "1.5rem" },
              }}
            >
              {`def binarySearch(array,k,low,high):\n while (low <= high):
    mid = (high + low)//2   
    if (array[mid] == k):
      return mid
    elif (array[mid] < k):
      low = mid + 1
    else:
      high = mid - 1
  return -1`}
            </SyntaxHighlighter>

            <h1>Important Note</h1>
            <SyntaxHighlighter
              language="md"
              style={cb}
              codeTagProps={{
                style: { fontSize: "1.5rem" },
              }}
            >
              {`Requirement: Array must be sorted!`}
            </SyntaxHighlighter>

            <h1>Space & Time Complexity</h1>
            <SyntaxHighlighter
              language="md"
              style={cb}
              codeTagProps={{
                style: { fontSize: "1.5rem" },
              }}
            >
              {`Time Complexity: O(log(N))\nSpace Complexity: O(1)`}
            </SyntaxHighlighter>
          </div>
        </div>
      </>
    )
  }
}

export default BinarySearchAnimation
