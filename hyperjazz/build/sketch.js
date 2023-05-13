"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("p5/lib/addons/p5.sound");
var numberOfShapesControl;
var ellipses;
var paused = true;
var firstMouseClick = false;
var prevMouseX = 0;
var prevMouseY = 0;
var startButton = createButton("Start/Stop");
window.addEventListener("keydown", function (e) {
    if (e.key === "s") {
        saveSketch();
    }
    else if (e.key === " ") {
        paused = !paused;
    }
});
var preload = function (params) {
    params.mySound1 = loadSound("");
    params.mySound2 = loadSound("");
    params.mySound3 = loadSound("");
};
var startSketch = function (params) {
    params.mySound1.loop();
    params.mySound2.loop();
    params.mySound3.loop();
};
var saveSketch = function () {
    saveCanvas("mySketch", "png");
};
function startStop(params) {
    paused = !paused;
    if (paused) {
        startButton.html("Start");
        startSketch(params);
    }
}
function setup(params) {
    console.log("🚀 - Setup initialized - P5 is running");
    createCanvas(windowWidth, windowHeight);
    rectMode(CENTER).noFill().frameRate(30);
    params.mySound1.setVolume(1);
    startButton.position(20, 20);
    startButton.mousePressed(startStop);
}
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
function draw(params) {
    background(0);
    translate(width / 2, height / 2);
    if (!paused) {
        var randomSound = Math.floor(Math.random() * 3) + 1;
        var randomColor = color(random(255), random(255), random(255));
        if (randomSound === 1) {
            params.mySound1.rate(map(mouseX, 0, width, 0.5, 10));
            if (mouseIsPressed === true) {
                params.mySound1.setVolume(70);
            }
            else {
                params.mySound1.setVolume(10);
            }
        }
        else if (randomSound === 2) {
            params.mySound2.rate(map(mouseX, 0, width, 1, 3));
            if (mouseIsPressed === true) {
                params.mySound2.setVolume(20);
            }
            else {
                params.mySound2.setVolume(5);
            }
        }
        else {
            params.mySound3.rate(map(mouseX, 1, width, 10, 1));
            if (mouseIsPressed === true) {
                params.mySound3.setVolume(5);
            }
            else {
                params.mySound3.setVolume(0.8);
            }
        }
        if (!paused) {
            if (prevMouseY === mouseY) {
                fill(255);
            }
            else {
                fill(randomColor);
            }
            stroke(0);
            strokeWeight(5);
            var ellipseSize = map(dist(mouseX, mouseY, pmouseX, pmouseY), 0, 1, 1, 5);
            if (ellipses === 1) {
                ellipse(mouseX, mouseY, ellipseSize, ellipseSize);
            }
            else {
                rect(mouseX, mouseY, ellipseSize, ellipseSize);
            }
        }
    }
}
//# sourceMappingURL=sketch.js.map