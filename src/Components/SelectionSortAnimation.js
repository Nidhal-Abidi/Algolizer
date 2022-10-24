import React from "react"
import Header from "./Header"
import "./AlgorithmAnimation.css"
import { Light as SyntaxHighlighter } from "react-syntax-highlighter"
import cpp from "react-syntax-highlighter/dist/esm/languages/hljs/cpp"
import { cb } from "react-syntax-highlighter/dist/esm/styles/prism"
SyntaxHighlighter.registerLanguage("cpp", cpp)

class SelectionSortAnimation extends React.Component {
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
    //The cell having lowest(increasing sort)/ highest(decreasing sort) value in this iteration
    ctx.strokeStyle = "black"
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
    //I used green to mark that the current min is included inside the sorted part of the array
    ctx.strokeStyle = "green"
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
        (this.state.step % 9) * (this.state.edge + this.state.dx),
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

  selectionSort = (
    arr,
    n,
    current_min_x,
    current_min_y,
    current_item_x,
    current_item_y,
    step,
    j,
    min_indx,
    canvas,
    ctx,
    animationRslt,
    btn1
  ) => {
    if (step < n - 1) {
      //Condition needed to color with orange local min at the beginning of iteration
      if (j == step + 1) {
        this.rectToCircleAnimation(
          ctx,
          current_min_x,
          current_min_y,
          this.state.edge,
          arr[step]
        )
        ctx.strokeStyle = "#FFA500"
        this.circleToRectAnimation(
          ctx,
          current_min_x,
          current_min_y,
          this.state.edge,
          arr[step]
        )
      }

      ctx.strokeStyle = "black"

      if (j < n) {
        this.rectToCircleAnimation(
          ctx,
          current_item_x,
          current_item_y,
          this.state.edge,
          arr[j]
        )

        if (arr[j] < arr[min_indx]) {
          setTimeout(() => {
            if (min_indx !== step) {
              //Change the color of previous min from red to black
              let x_coord =
                canvas.width / 10 -
                this.state.edge / 2 +
                (min_indx % 9) * (this.state.edge + this.state.dx)
              let y_coord =
                canvas.height / 9 -
                this.state.edge / 2 +
                Math.floor(min_indx / 9) * (this.state.edge + this.state.dy)

              this.rectToCircleAnimation(
                ctx,
                x_coord,
                y_coord,
                this.state.edge,
                arr[min_indx]
              )
              ctx.strokeStyle = "black"
              this.circleToRectAnimation(
                ctx,
                x_coord,
                y_coord,
                this.state.edge,
                arr[min_indx]
              )
            }

            //Draw the new minimum as a red rectangle
            ctx.strokeStyle = "red"
            this.circleToRectAnimation(
              ctx,
              current_item_x,
              current_item_y,
              this.state.edge,
              arr[j]
            )

            if (
              current_item_x + 2 * (this.state.edge + this.state.dx) <
              canvas.width
            ) {
              this.selectionSort(
                arr,
                n,
                current_item_x,
                current_item_y,
                current_item_x + this.state.edge + this.state.dx,
                current_item_y,
                step,
                j + 1,
                j,
                canvas,
                ctx,
                animationRslt,
                btn1
              )
            } else {
              this.selectionSort(
                arr,
                n,
                current_item_x,
                current_item_y,
                canvas.width / 10 - this.state.edge / 2,
                current_item_y + this.state.edge + this.state.dy,
                step,
                j + 1,
                j,
                canvas,
                ctx,
                animationRslt,
                btn1
              )
            }
          }, 2000)
        } else {
          setTimeout(() => {
            this.circleToRectAnimation(
              ctx,
              current_item_x,
              current_item_y,
              this.state.edge,
              arr[j]
            )

            if (
              current_item_x + 2 * (this.state.edge + this.state.dx) <
              canvas.width
            ) {
              this.selectionSort(
                arr,
                n,
                current_min_x,
                current_min_y,
                current_item_x + this.state.edge + this.state.dx,
                current_item_y,
                step,
                j + 1,
                min_indx,
                canvas,
                ctx,
                animationRslt,
                btn1
              )
            } else {
              this.selectionSort(
                arr,
                n,
                current_min_x,
                current_min_y,
                canvas.width / 10 - this.state.edge / 2,
                current_item_y + this.state.edge + this.state.dy,
                step,
                j + 1,
                min_indx,
                canvas,
                ctx,
                animationRslt,
                btn1
              )
            }
          }, 2000)
        }
      } else {
        //Time for swapping if there's another local min. Else move on to the next step
        if (min_indx !== step) {
          setTimeout(() => {
            console.log("Swap " + arr[step] + " & " + arr[min_indx])

            //Swap the nbrs also manually ( Code not similar to bubble Sort )

            arr = this.swap(arr, step, min_indx, canvas, ctx)

            this.selectionSort(
              arr,
              n,
              current_min_x,
              current_min_y,
              current_item_x,
              current_item_y,
              step,
              j,
              step,
              canvas,
              ctx,
              animationRslt,
              btn1
            )
          }, 2000)
        } else {
          //This line below serves to change the color of the cell when there are no swaps
          console.log(arr)
          this.swap(arr, step, step, canvas, ctx)
          console.log(arr)
          step += 1
          min_indx = step
          j = step + 1

          let min_x =
            canvas.width / 10 -
            this.state.edge / 2 +
            (this.state.step % 9) * (this.state.edge + this.state.dx)
          let min_y =
            canvas.height / 9 -
            this.state.edge / 2 +
            Math.floor(step / 9) * (this.state.edge + this.state.dy)

          let current_val_x =
            canvas.width / 10 -
            this.state.edge / 2 +
            (j % 9) * (this.state.edge + this.state.dx)
          let current_val_y =
            canvas.height / 9 -
            this.state.edge / 2 +
            Math.floor(j / 9) * (this.state.edge + this.state.dy)

          this.selectionSort(
            arr,
            n,
            min_x,
            min_y,
            current_val_x,
            current_val_y,
            step,
            j,
            min_indx,
            canvas,
            ctx,
            animationRslt,
            btn1
          )

          console.log("Next iteration")
        }
      }
    } else {
      //This line below serves to change the color of the last cell
      this.swap(arr, n - 1, n - 1, canvas, ctx)
      console.log("Array is sorted")
      this.success(animationRslt)
      btn1.removeAttribute("disabled")
      btn1.classList.remove("not-working")
    }
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
      this.selectionSort(
        arrInputValues,
        arrInputValues.length,
        canvas.width / 10 - this.state.edge / 2,
        canvas.height / 9 - this.state.edge / 2,
        canvas.width / 10 -
          this.state.edge / 2 +
          (this.state.edge + this.state.dx),
        canvas.height / 9 - this.state.edge / 2,
        0,
        1,
        0,
        canvas,
        ctx,
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
                style: { fontSize: "1.17rem" },
              }}
            >
              {`void selectionSort(int array[], int size) {
  for (int step = 0; step < size - 1; step++) {
    int min_idx = step;
    
    for (int i = step + 1; i < size; i++) {
      // Select the minimum element in each loop.
      if (array[i] < array[min_idx]){
        min_idx = i;
      }
    }   
    
    if (min_idx != step){
      swap(&array[min_idx], &array[step]);
    }
  }
}`}
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

export default SelectionSortAnimation
