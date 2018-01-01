var _WIDTH = 800;
var _HEIGHT = 600;

var _SIZE = 50;
var _LINEDRAW_STEP = 25;
var _LIFESPAN = 400;
var _COMPLETED_REWARD = 10;
var _STUCK_PENALTY = 0.1;
var _MAGNITUDE = 0.25;
var _MUTATION_RATE = 0.01;

var _LIFE_COUNTER = 0;
var _POPULATION_COUNT = 0;

var _OBSTACLE_X = _WIDTH / 2 - _WIDTH / 4;
var _OBSTACLE_Y = _HEIGHT / 2 - 16;
var _OBSTACLE_W = _WIDTH / 2;
var _OBSTACLE_H = 32;
// TODO: make obstacle class and global obstacles array, update collision function in rocket
// var _OBSTACLES = [];

var _TARGET;

var _AVERAGE_FITNESS_LIST_FIRST = [];
var _AVERAGE_FITNESS_LIST_SECOND = [];

var meter = new FPSMeter(document.getElementById('render'), {theme: 'dark', graph: 1, heat: 1});

function setup() {
  var canvas = createCanvas(_WIDTH, _HEIGHT);
  canvas.parent('render');
  _TARGET = createVector(width/2, 50);

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
  // TODO: draw obstacle array
  rect(_OBSTACLE_X, _OBSTACLE_Y, _OBSTACLE_W, _OBSTACLE_H, 10);

  ellipse(_TARGET.x, _TARGET.y, 32, 32);

  strokeWeight(1);
  stroke(255, 200);
  fill(0, 200);
  rect(-1, _HEIGHT + 1, 180, -64);

  fill(255, 200);
  noStroke();
  textSize(20);
  text("Age: "+_LIFE_COUNTER+"/"+_LIFESPAN, 5, height - 35);
  text("Population #: "+_POPULATION_COUNT, 5, height - 5);

  meter.tick();
}

function updateChart() {
  _AVERAGE_FITNESS_LIST_FIRST.push(population0.averageFitness);
  _AVERAGE_FITNESS_LIST_SECOND.push(population1.averageFitness);
  high();
}
