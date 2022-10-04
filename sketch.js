//// Constants

// Width and height of canvas (in pixels) Default: 854x480
const W = 854
const H = 480

// Multiplier for transition speed. A transMult of 1 lasts 1 second
const transMult = 1

//// Global variables

// Current game state
let gameState = "main menu"

// Transition variables
let transitioning = false
let transTime = 0
let transDir = 1

// Background image variables
let backgroundGradient
let backgroundDesign

// Buttons
let startButton
let quitButton
let mainMenuButton


function setup() {
    // Create canvas
    createCanvas(W, H)
    // Resize transition div
    document.getElementById("transition").style.width = (W + "px")
    document.getElementById("transition").style.height = (H + "px")
    // Load backgrounds
    backgroundGradient = loadImage("images/gradient-bg.png")
    backgroundDesign = loadImage("images/design-bg.png")
    // Create start button
    startButton = createButton("Start")
    startButton.size(W/4, H/8)
    startButton.position(W/2-W/8, H/2-H/16)
    startButton.mousePressed(() => {
        transitioning = true
        gameState = "level select_"
    })
    startButton.style("font-size", W/16 + "px")
    startButton.style("font-family", "TheFountainofWishes")
    // Create main menu button
    mainMenuButton = createButton("< Main Menu")
    mainMenuButton.size(W/6.5, H/16)
    mainMenuButton.position(-2, -2)
    mainMenuButton.mousePressed(() => {
        transitioning = true
        gameState = "main menu_"
    })
    mainMenuButton.style("font-size", W/28 + "px")
    mainMenuButton.style("font-family", "TheFountainofWishes")
    mainMenuButton.style("color", "orange")
    mainMenuButton.style("font-weight", "bold")
    mainMenuButton.style("background-color", "rgba(0, 0, 0, 0.4)")
    mainMenuButton.style("border", "none")
    mainMenuButton.style("border-radius", "0 0 10px")
    mainMenuButton.style("text-align", "left")
    mainMenuButton.mouseOver(() => {
        mainMenuButton.style("color", "#FF8C00")
        mainMenuButton.style("background-color", "rgba(0, 0, 0, 0.6)")
    })
    mainMenuButton.mouseOut(() => {
        mainMenuButton.style("color", "orange")
        mainMenuButton.style("background-color", "rgba(0, 0, 0, 0.4)")
    })

}

function draw() {
    // Main menu
    if(gameState === "main menu") {
        // Hide things from other states
        mainMenuButton.hide()
        // Draw main menu
        background(backgroundGradient)
        startButton.show()
    }
    // Level select
    else if(gameState === "level select") {
        // Hide things from other states
        startButton.hide()
        // Draw level select screen
        background(backgroundDesign)
        mainMenuButton.show()
    }
    // Fancy transition bs cause I was bored one night
    if(transitioning) {
        // If transition is complete, stop transitioning
        if(transTime<0) {
            transitioning = false
            transTime = 0
            transDir = 1
        }
        // If screen is fully black, change game state and invert transition direction
        else if(transTime>1.0) {
            transDir = -1
            transTime = 1
            gameState = gameState.slice(0, -1)
        }
        // Otherwise, update transition time
        else {
            document.getElementById("transition").style.opacity = transTime
            transTime += (deltaTime / (500 * transMult)) * transDir
        }
    }
}