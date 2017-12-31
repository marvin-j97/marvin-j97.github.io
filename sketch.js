var _WIDTH = 800;
var _HEIGHT = 600;

var _SIZE = 100;
var _LINEDRAW_STEP = 50;
var _LIFESPAN = 400;
var _COMPLETED_REWARD = 10;
var _STUCK_PENALTY = 0.1;
var _MAGNITUDE = 0.25;
var _MUTATION_RATE = 0.01;

var _LIFE_COUNTER = 0;
var _MAXIMUM_FITNESS = 0;
var _POPULATION_COUNT = 0;

var _OBSTACLE_X = _WIDTH / 2 - _WIDTH / 4;
var _OBSTACLE_Y = _HEIGHT / 2 - 16;
var _OBSTACLE_W = _WIDTH / 2;
var _OBSTACLE_H = 32;

var population;
var _TARGET;
var _AVERAGE_FITNESS_LIST_FIRST = [];
var _AVERAGE_FITNESS_LIST_SECOND = [];

var LIST_FIRST_COLOR;
var LIST_SECOND_COLOR;

var meter = new FPSMeter(document.getElementById('render'), {graph: 1});

function setup() {
  var canvas = createCanvas(_WIDTH, _HEIGHT);
  canvas.parent('render');
  _TARGET = createVector(width/2, 50);

  population1 = new Population();
  LIST_FIRST_COLOR = population1.color;
  population2 = new Population();
  //population2.color = ;
  LIST_SECOND_COLOR = population2.color;

  updateChart();
}

function draw() {
  background(0);

  population1.update();
  population2.update();
  _LIFE_COUNTER++;

  if (_LIFE_COUNTER == _LIFESPAN) {
    population1.evaluate();
    population1.selection();

    population2.evaluate();
    population2.selection();
    _POPULATION_COUNT++;
    _LIFE_COUNTER = 0;

    updateChart();
  }

  rect(_OBSTACLE_X, _OBSTACLE_Y, _OBSTACLE_W, _OBSTACLE_H, 10);

  ellipse(_TARGET.x, _TARGET.y, 32, 32);

  strokeWeight(2);
  stroke(255, 200);
  fill(0, 200);
  rect(-1, _HEIGHT + 1, 180, -108);

  fill(255, 200);
  noStroke();
  textSize(20);
  text("Age: "+_LIFE_COUNTER, 5, height - 80);
  //text("Max. fitness: "+_MAXIMUM_FITNESS, 5, height - 55);
  //text("Avg. fitness: "+_AVERAGE_FITNESS, 5, height - 30);
  text("Population #: "+_POPULATION_COUNT, 5, height - 5);

  meter.tick();
}

function updateChart() {
  _AVERAGE_FITNESS_LIST_FIRST.push(population1.averageFitness);
  _AVERAGE_FITNESS_LIST_SECOND.push(population2.averageFitness);
  high();
}
