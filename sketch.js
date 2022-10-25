/*
 * This project was created by Adam Nachtrab, Erkhem Erdembileg, Eyan Martucci, and Thomas Jennewein.
 * This project was created during the Fall 2022 semester at Arizona State University for the course FSE 100.
 * Code in this project is original and was created by the authors listed above.
 * Font used in this project is licensed for non-commercial use, and can be found at https://www.fontspace.com/the-fountain-of-wishes-font-f85599.
 * Images used in this project were either created by the authors or are free to use with modification.
 * P5.js was used to create this project, it's license can be found at https://p5js.org/copyright.html.
 * The copying or distribution all or portions of this project is prohibited without the express written consent of the authors.
 */

//// Constants

// Width and height of canvas (in pixels) Default: 854x480
let W = 854
let H = 480

// Multiplier for transition speed. A transMult of 1 lasts 1 second
const transMult = 1

//// Global variables

// Current game state
let gameState = "main menu"
let ee = ""
let bones = false
let bonez
let drawnPos = []

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
let fs
let title
let volumeSliderLabel
let volumeSliderCounter
let volumeSlider
let vol = 100

// Levels
let levelCount = 8
let levelButtons = []

function setup() {
    // Set window size
    W = windowWidth
    H = windowWidth * 9 / 16
    // Create canvas
    createCanvas(W, H)
    // Set framerate
    frameRate(240)
    // Fullscreen button
    fs = createButton("&#x26F6;")
    fs.position(W - 35, -5)
    fs.mousePressed(() => {
        fullscreen(!fullscreen())
    })
    fs.mouseOver(() => {
        fs.style("color", "#aaa")
    })
    fs.mouseOut(() => {
        fs.style("color", "white")
    })
    fs.style("background-color", "rgba(0, 0, 0, 0)")
    fs.style("color", "white")
    fs.style("font-family", "sans-serif")
    fs.style("border", "none")
    fs.style("text-align", "center")
    fs.style("text-decoration", "none")
    fs.style("display", "inline-block")
    fs.style("font-size", "32px")
    // Resize transition div
    document.getElementById("transition").style.width = (W + "px")
    document.getElementById("transition").style.height = (H + "px")
    // Load backgrounds
    backgroundGradient = loadImage("images/gradient-bg.png")
    backgroundDesign = loadImage("images/design-bg.png")
    // Create Title
    title = createElement("h1", "Learn2Draw")
    title.size(W, H / 4)
    title.position(0, -W / 16)
    title.style("text-align", "center")
    title.style("font-size", W / 8 + "px")
    title.style("color", "#FF8C00")
    // Create start button
    startButton = createButton("Start")
    startButton.size(W / 4, H / 8)
    startButton.position(W / 2 - W / 8, H / 2 - H / 8)
    startButton.mousePressed(() => {
        transitioning = true
        gameState = "level select_"
    })
    startButton.style("font-size", W / 16 + "px")
    startButton.style("font-family", "TheFountainofWishes")
    // Create options button
    optionsButton = createButton("Options")
    optionsButton.size(W / 4, H / 8)
    optionsButton.position(W / 2 - W / 8, H / 2 + H / 16)
    optionsButton.mousePressed(() => {
        transitioning = true
        gameState = "options_"
    })
    optionsButton.style("font-size", W / 16 + "px")
    optionsButton.style("font-family", "TheFountainofWishes")
    // Create main menu button
    mainMenuButton = createButton("< Main Menu")
    mainMenuButton.size(W / 6.5, H / 16)
    mainMenuButton.position(-2, -2)
    mainMenuButton.mousePressed(() => {
        transitioning = true
        gameState = "main menu_"
    })
    mainMenuButton.style("font-size", W / 28 + "px")
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
    volumeSlider.size(W / 5, H / 16)
    volumeSlider.position(W / 2 - W / 8, H / 3)
    volumeSlider.style("background-color", "rgba(0, 0, 0, 0.4)")
    // Create volume slider label
    volumeSliderLabel = createElement("h2", "Volume")
    volumeSliderLabel.size(W / 4, H / 16)
    volumeSliderLabel.position(W / 2 - W / 8, H / 3 - H / 8)
    volumeSliderLabel.style("font-size", W / 24 + "px")
    volumeSliderLabel.style("font-family", "TheFountainofWishes")
    volumeSliderLabel.style("color", "orange")
    volumeSliderLabel.style("text-align", "center")
    // Create volume slider counter
    volumeSliderCounter = createElement("h2", vol + "%")
    volumeSliderCounter.size(W / 5, H / 16)
    volumeSliderCounter.position(W / 2 + W / 12, H / 3 - H / 24)
    volumeSliderCounter.style("font-size", W / 32 + "px")
    volumeSliderCounter.style("font-family", "TheFountainofWishes")
    volumeSliderCounter.style("color", "orange")
    // Create level buttons
    for (let i = 0; i < levelCount; i++) {
        levelButtons[i] = createButton("Level " + (i + 1))
        levelButtons[i].size(W / 4, H / 8)
        levelButtons[i].position(
            W / 2 - (35 * W / 128) + (i % 2) * (W / 4 + W / 32),
            H / 2 - H / 5 + Math.floor(i / 2) * H / 6
        )
        levelButtons[i].mousePressed(() => {
            transitioning = true
            gameState = "level " + (i + 1) + "_"
        })
        levelButtons[i].style("font-size", W / 16 + "px")
        levelButtons[i].style("font-family", "TheFountainofWishes")
        if (i > 0) {
            levelButtons[i].addClass("locked")
        }
    }
    // Bonez
    bonez = loadImage("images/what.gif")
}

function draw() {
    function resizeStuff() {
        resizeCanvas(W, H)
        document.getElementById("transition").style.width = (W + "px")
        document.getElementById("transition").style.height = (H + "px")
        title.size(W, H / 4)
        title.style("font-size", W / 8 + "px")
        startButton.size(W / 4, H / 8)
        startButton.position(W / 2 - W / 8, H / 2 - H / 8)
        startButton.style("font-size", W / 16 + "px")
        optionsButton.size(W / 4, H / 8)
        optionsButton.position(W / 2 - W / 8, H / 2 + H / 16)
        optionsButton.style("font-size", W / 16 + "px")
        mainMenuButton.size(W / 6.5, H / 16)
        mainMenuButton.position(-2, -2)
        mainMenuButton.style("font-size", W / 28 + "px")
        volumeSlider.size(W / 5, H / 16)
        volumeSlider.position(W / 2 - W / 8, H / 3)
        volumeSliderLabel.size(W / 4, H / 16)
        volumeSliderLabel.position(W / 2 - W / 8, H / 3 - H / 8)
        volumeSliderLabel.style("font-size", W / 24 + "px")
        volumeSliderCounter.size(W / 5, H / 16)
        volumeSliderCounter.position(W / 2 + W / 12, H / 3 - H / 24)
        volumeSliderCounter.style("font-size", W / 32 + "px")
        for (let i = 0; i < levelCount; i++) {
            levelButtons[i].size(W / 4, H / 8)
            levelButtons[i].position(
                W / 2 - (35 * W / 128) + (i % 2) * (W / 4 + W / 32),
                H / 2 - H / 5 + Math.floor(i / 2) * H / 6
            )
            levelButtons[i].style("font-size", W / 16 + "px")
        }
        fs.position(W - 35, -5)
    }

    // Fullscreen resize
    if (fullscreen() && (W !== displayWidth)) {
        W = displayWidth
        H = displayWidth * 9 / 16
        resizeStuff()
    } else if (!fullscreen() && (W !== windowWidth)) {
        W = windowWidth
        H = windowWidth * 9 / 16
        resizeStuff()
        // Resize transition div
        document.getElementById("transition").style.width = (W + "px")
        document.getElementById("transition").style.height = (H + "px")
    }
    // Main menu
    if (gameState === "main menu") {
        // Hide things from other states
        mainMenuButton.hide()
        volumeSlider.hide()
        volumeSliderLabel.hide()
        volumeSliderCounter.hide()
        for (let i = 0; i < levelCount; i++) {
            levelButtons[i].hide()
        }
        // Draw main menu
        background(backgroundGradient)
        title.html("Learn2Draw")
        startButton.show()
        optionsButton.show()
    }
    // Level select
    else if (gameState === "level select") {
        // Hide things from other states
        startButton.hide()
        optionsButton.hide()
        // Draw level select screen
        background(backgroundDesign)
        title.html("Level Select")
        mainMenuButton.show()
        for (let i = 0; i < levelCount; i++) {
            if (levelButtons[i].hasClass("locked")) {
                levelButtons[i].style("background-image", "url(images/lock.png)")
                levelButtons[i].style("background-size", "50% 100%")
                levelButtons[i].style("background-repeat", "no-repeat")
                levelButtons[i].style("background-position", "center")
                // Prevent clicking
                levelButtons[i].mousePressed(() => {
                })
                levelButtons[i].mouseOver(() => {
                })
                levelButtons[i].mouseOut(() => {
                })
                levelButtons[i].style("background-color", "rgba(0, 0, 0, 0.4)")
                levelButtons[i].style("color", "rgba(255, 255, 255, 0.4)")
            }
            levelButtons[i].show()
        }
    }
    // Options menu
    else if (gameState === "options") {
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
    } else if (/[0-9]+$/.test(gameState)) {
        // Hide everything
        startButton.hide()
        optionsButton.hide()
        for (let i = 0; i < levelCount; i++) {
            levelButtons[i].hide()
        }
        // Draw level
        background(backgroundDesign)
        mainMenuButton.show()
        if (gameState === "level 1") {
            level1()
        } else if (gameState === "level 2") {
            level2()
        } else if (gameState === "level 3") {
            level3()
        } else if (gameState === "level 4") {
            level4()
        } else if (gameState === "level 5") {
            level5()
        } else if (gameState === "level 6") {
            level6()
        } else if (gameState === "level 7") {
            level7()
        } else if (gameState === "level 8") {
            level8()
        }
    }
    // Fancy transition bs cause I was bored one night
    if (transitioning) {
        // If transition is complete, stop transitioning
        if (transTime < 0) {
            transitioning = false
            transTime = 0
            transDir = 1
        }
        // If screen is fully black, change game state and invert transition direction
        else if (transTime > 1.0) {
            transDir = -1
            transTime = 1
            gameState = gameState.slice(0, -1)
        }
        // Otherwise, update transition time
        else {
            document.getElementById("transition").style.opacity = transTime
            transTime += (deltaTime / (500 * transMult)) * transDir
        }
    } else {
        document.getElementById("transition").style.opacity = "0"
    }
    if (bones) background(bonez)

    function level1() {
        background(backgroundGradient)
        fill(0)
        if (mouseIsPressed) {
            drawnPos.push([mouseX, mouseY])
        }
        drawnPos.forEach((i) => {
            circle(i[0], i[1], 20)
        })

    }
}


function keyPressed() {
    if (keyCode === 27) {
        transitioning = true
        gameState = "main menu_"
    } else {
        ee += key
        if (ee.includes("bones") && !bones && !ee.includes("no  bones") && !ee.includes("nobones")) {
            ee = ""
            bones = true
        } else if ((ee.includes("nobones") || ee.includes("no bones")) && bones) {
            ee = ""
            bones = false
        }
    }
}