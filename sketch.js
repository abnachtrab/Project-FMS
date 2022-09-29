let gameState = "main menu"
let startButton;
let mainMenuButton;

function setup() {
    // Create canvas
    createCanvas(1280, 720)
    // Create start button
    startButton = createButton("Start")
    startButton.size(128, 64)
    startButton.position(576, 296)
    startButton.mousePressed(() => {gameState = "level select"})
    // Create quit button
    mainMenuButton = createButton("Quit")


    // Create main menu button
    mainMenuButton = createButton("< Main Menu")
    mainMenuButton.mousePressed(() => {gameState = "main menu"})
    mainMenuButton.position(0, 0)

}

function draw() {
    if(gameState === "main menu") {
        // Hide things from other states
        mainMenuButton.hide()
        // Draw main menu
        startButton.show()
        background(220)
        fill(0)
        ellipse(200, 200, 100, 100)
    } else if(gameState === "level select") {
        // Hide things from other states
        startButton.hide()
        // Draw level select screen
        mainMenuButton.show()
        background(0)
        fill(255)
        ellipse(200, 200, 100, 100)
    }

}

// Sample edit