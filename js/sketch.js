////////////////////////////////
// WINDOW SIZE /////////////////
////////////////////////////////

var _WIDTH = 800;
var _HEIGHT = 600;

////////////////////////////////
// TWEAK VALUES HERE ///////////
////////////////////////////////

var _SIZE = 50;
var _LINEDRAW_STEP = 25;
var _LIFESPAN = 400;

var _COMPLETED_REWARD = 10;
var _STUCK_PENALTY = 0.1;
var _SPEED_FACTOR_MULT = 2;
var _MAGNITUDE = 0.25;
var _MUTATION_RATE = 0.01;

////////////////////////////////
////////////////////////////////
////////////////////////////////

var _LIFE_COUNTER = 0;
var _POPULATION_COUNT = 0;
var _OBSTACLES = [];
var _TARGET;

var _MOVE_LEFT = false;
var _MOVE_RIGHT = false;
var _MOVE_UP = false;
var _MOVE_DOWN = false;

var _AVERAGE_FITNESS_LIST_FIRST = [];
var _AVERAGE_FITNESS_LIST_SECOND = [];

var meter = new FPSMeter(document.getElementById('render'), {theme: 'dark', graph: 1, heat: 1});

function setup() {
  var canvas = createCanvas(_WIDTH, _HEIGHT);
  canvas.parent('render');

  _TARGET = createVector(width/2, 50);

  _OBSTACLES.push(new Obstacle(_WIDTH / 3, _HEIGHT / 4, _WIDTH / 3, 32));
  _OBSTACLES.push(new Obstacle(0, _HEIGHT / 1.75, _WIDTH / 2.5, 32));
  _OBSTACLES.push(new Obstacle(_WIDTH / 2 + _WIDTH / 10, _HEIGHT / 1.75, _WIDTH / 2.5, 32));

  var col = randomColor();
  population0 = new Population(col);
  population1 = new Population(contrast(col));

  updateChart();
}

function draw() {
  background(0);

  population0.update();
  population1.update();
  _LIFE_COUNTER++;

  if (_LIFE_COUNTER == _LIFESPAN) {
    population0.evaluate();
    population0.selection();

    population1.evaluate();
    population1.selection();
    _POPULATION_COUNT++;
    _LIFE_COUNTER = 0;

    updateChart();
  }

  for (var i = 0; i < _OBSTACLES.length; i++) {
    _OBSTACLES[i].draw();
  }

  strokeWeight(1);
  stroke(255, 200);
  fill(0, 200);
  rectMode(CORNER);
  rect(-1, _HEIGHT + 1, 180, -64);

  fill(255, 200);
  noStroke();
  updateTarget();
  ellipse(_TARGET.x, _TARGET.y, 32, 32);
  textSize(20);
  text("Age: "+_LIFE_COUNTER+"/"+_LIFESPAN, 5, height - 35);
  text("Population #: "+_POPULATION_COUNT, 5, height - 5);

  meter.tick();
}

function updateTarget() {
  if (_MOVE_RIGHT) {
    _TARGET.x += 5;
  } else
  if (_MOVE_LEFT) {
    _TARGET.x -= 5;
  }
  if (_MOVE_UP) {
    _TARGET.y -= 5;
  } else
  if (_MOVE_DOWN) {
    _TARGET.y += 5;
  }
}
function keyPressed() {
  if (key == 'D') {
    _MOVE_RIGHT = true;
  } else if (key == 'A') {
    _MOVE_LEFT = true;
  }
  if (key == 'W') {
    _MOVE_UP = true;
  }
  if (key == 'S') {
    _MOVE_DOWN = true;
  }
}

function keyReleased() {
  if (key == 'D') {
    _MOVE_RIGHT = false;
  } else if (key == 'A') {
    _MOVE_LEFT = false;
  }
  if (key == 'W') {
    _MOVE_UP = false;
  }
  if (key == 'S') {
    _MOVE_DOWN = false;
  }
}

function updateChart() {
  _AVERAGE_FITNESS_LIST_FIRST.push(population0.averageFitness);
  _AVERAGE_FITNESS_LIST_SECOND.push(population1.averageFitness);
  high();
}
