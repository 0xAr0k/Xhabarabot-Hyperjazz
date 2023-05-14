import "p5/lib/addons/p5.sound";
import * as p5 from "p5";
import p5Types, { createButton } from "p5";
import "p5/lib/addons/p5.sound"

/***
 *    ██╗  ██╗██╗  ██╗ █████╗ ██████╗  █████╗ ██████╗  █████╗ ██████╗  ██████╗ ████████╗
 *    ╚██╗██╔╝██║  ██║██╔══██╗██╔══██╗██╔══██╗██╔══██╗██╔══██╗██╔══██╗██╔═══██╗╚══██╔══╝
 *     ╚███╔╝ ███████║███████║██████╔╝███████║██████╔╝███████║██████╔╝██║   ██║   ██║   
 *     ██╔██╗ ██╔══██║██╔══██║██╔══██╗██╔══██║██╔══██╗██╔══██║██╔══██╗██║   ██║   ██║   
 *    ██╔╝ ██╗██║  ██║██║  ██║██████╔╝██║  ██║██║  ██║██║  ██║██████╔╝╚██████╔╝   ██║   
 *    ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚═════╝  ╚═════╝    ╚═╝                                                                            
 */

// GLOBAL VARS & TYPES
let numberOfShapesControl: p5.Element;

let ellipses: number;
let paused: boolean = true;
let firstMouseClick: boolean = false;
let prevMouseX: number = 0;
let prevMouseY: number = 0;

let startButton = createButton("Start/Stop");

window.addEventListener("keydown", function (e) {
  if (e.key === "s") {
    saveSketch();
  } else if (e.key === " ") {
    paused = !paused;
  }
});

interface ISound {
  mySound1: p5.SoundFile;
  mySound2: p5.SoundFile;
  mySound3: p5.SoundFile;
}

const preload = (params: ISound) => {
  params.mySound1 = loadSound("");
  params.mySound2 = loadSound("");
  params.mySound3 = loadSound("");
}

const startSketch = (params: ISound) => {
  params.mySound1.loop();
  params.mySound2.loop();
  params.mySound3.loop();
}

const saveSketch = () => {
  saveCanvas("mySketch", "png");
}

function startStop(params: ISound) {
  paused = !paused;
  if (paused) {
    startButton.html("Start");
    startSketch(params);
  }
}

// P5 WILL AUTOMATICALLY USE GLOBAL MODE IF A DRAW() FUNCTION IS DEFINED
function setup(params: ISound) {
  console.log("🚀 - Setup initialized - P5 is running");

  createCanvas(windowWidth, windowHeight)
  rectMode(CENTER).noFill().frameRate(30);
  // NUMBER OF SHAPES SLIDER
  // numberOfShapesControl = createSlider(1, 30, 15, 1).position(10, 10).style("width", "100px");
  params.mySound1.setVolume(1);
  startButton.position(20, 20);
  startButton.mousePressed(startStop);
}


 
// p5 WILL AUTO RUN THIS FUNCTION IF THE BROWSER WINDOW SIZE CHANGES
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// p5 WILL HANDLE REQUESTING ANIMATION FRAMES FROM THE BROWSER AND WIL RUN DRAW() EACH ANIMATION FROME
function draw(params: ISound) {
  
   // CLEAR BACKGROUND
  background(0);

  // CENTER OF SCREEN
  translate(width / 2,height / 2);

  // Hyperjazz tools coming
  if (!paused) {
    let randomSound: number = Math.floor(Math.random() * 3) + 1;

    let randomColor = color(random(255), random(255), random(255));

    if (randomSound === 1) {
      params.mySound1.rate(map(mouseX, 0, width, 0.5, 10));

      if (mouseIsPressed === true) {
        params.mySound1.setVolume(70);
      } else {
        params.mySound1.setVolume(10);
      } 
    } else if (randomSound === 2) {
      params.mySound2.rate(map(mouseX, 0, width, 1, 3));

      if (mouseIsPressed === true) {
        params.mySound2.setVolume(20);
      } else {
        params.mySound2.setVolume(5);
      }
    } else {
      params.mySound3.rate(map(mouseX, 1, width, 10, 1));

      if (mouseIsPressed === true) {
        params.mySound3.setVolume(5);
      } else {
        params.mySound3.setVolume(0.8);
      }
    }
    if (!paused) {
      if (prevMouseY === mouseY) {
        fill(255);
      } else {
        fill(randomColor);
      }

      stroke(0);
      strokeWeight(5);

      let ellipseSize = map(dist(mouseX, mouseY, pmouseX, pmouseY), 0, 1, 1, 5);

      if (ellipses === 1) {
        ellipse(mouseX, mouseY, ellipseSize, ellipseSize);
      } else {
        rect(mouseX, mouseY, ellipseSize, ellipseSize);
      }
    }
  }
}

//Created by Rully Shabara.
//Refactored by 0xArok.