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
let optionsButton
let mainMenuButton

// Misc
let title
let volumeSliderLabel
let volumeSliderCounter
let volumeSlider
let vol = 100

function setup() {
    // Create canvas
    createCanvas(W, H)
    // Resize transition div
    document.getElementById("transition").style.width = (W + "px")
    document.getElementById("transition").style.height = (H + "px")
    // Load backgrounds
    backgroundGradient = loadImage("images/gradient-bg.png")
    backgroundDesign = loadImage("images/design-bg.png")
    // Create Title
    title = createElement("h1", "Learn2Draw")
    title.size(W, H/4)
    title.position(0, -W/16)
    title.style("text-align", "center")
    title.style("font-size", W/8 + "px")
    title.style("color", "#FF8C00")
    // Create start button
    startButton = createButton("Start")
    startButton.size(W/4, H/8)
    startButton.position(W/2-W/8, H/2-H/8)
    startButton.mousePressed(() => {
        transitioning = true
        gameState = "level select_"
    })
    startButton.style("font-size", W/16 + "px")
    startButton.style("font-family", "TheFountainofWishes")
    // Create options button
    optionsButton = createButton("Options")
    optionsButton.size(W/4, H/8)
    optionsButton.position(W/2-W/8, H/2+H/16)
    optionsButton.mousePressed(() => {
        transitioning = true
        gameState = "options_"
    })
    optionsButton.style("font-size", W/16 + "px")
    optionsButton.style("font-family", "TheFountainofWishes")
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
    // Create volume slider
    volumeSlider = createSlider(0, 100, 50, 1)
    volumeSlider.size(W/5, H/16)
    volumeSlider.position(W/2-W/8, H/3)
    // Create volume slider label
    volumeSliderLabel = createElement("h2", "Volume")
    volumeSliderLabel.size(W/4, H/16)
    volumeSliderLabel.position(W/2-W/8, H/3-H/8)
    volumeSliderLabel.style("font-size", W/24 + "px")
    volumeSliderLabel.style("font-family", "TheFountainofWishes")
    volumeSliderLabel.style("color", "orange")
    volumeSliderLabel.style("text-align", "center")
    // Create volume slider counter
    volumeSliderCounter = createElement("h2", vol + "%")
    volumeSliderCounter.size(W/5, H/16)
    volumeSliderCounter.position(W/2+W/12, H/3-H/24)
    volumeSliderCounter.style("font-size", W/32 + "px")
    volumeSliderCounter.style("font-family", "TheFountainofWishes")
    volumeSliderCounter.style("color", "orange")
}

function draw() {
    // Main menu
    if(gameState === "main menu") {
        // Hide things from other states
        mainMenuButton.hide()
        volumeSlider.hide()
        volumeSliderLabel.hide()
        volumeSliderCounter.hide()
        // Draw main menu
        background(backgroundGradient)
        title.html("Learn2Draw")
        startButton.show()
        optionsButton.show()
    }
    // Level select
    else if(gameState === "level select") {
        // Hide things from other states
        startButton.hide()
        optionsButton.hide()
        // Draw level select screen
        background(backgroundDesign)
        title.html("Level Select")
        mainMenuButton.show()
    }
    // Options menu
    else if(gameState === "options") {
        // Hide things from other states
        startButton.hide()
        optionsButton.hide()
        // Draw options menu
        background(backgroundDesign)
        title.html("Options")
        mainMenuButton.show()
        volumeSlider.show()
        volumeSliderLabel.show()
        volumeSliderCounter.show()
        // Update volume slider counter
        vol = volumeSlider.value()
        volumeSliderCounter.html(vol + "%")
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