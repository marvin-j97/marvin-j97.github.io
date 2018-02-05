////////////////////////////////
// WINDOW SIZE /////////////////
////////////////////////////////

var _WIDTH = 800;
var _HEIGHT = 600;

////////////////////////////////
// TWEAK VALUES HERE ///////////
////////////////////////////////

var _POPULATION_SIZE;
var _LINEDRAW_STEP;
var _LIFESPAN;

var _COMPLETED_REWARD;
var _STUCK_PENALTY;
var _SPEED_FACTOR_MULT;
var _MAGNITUDE;
var _MUTATION_RATE;

function UpdateTweakValues(){
  _POPULATION_SIZE = $('#txtPopulationSize').val();
  _LINEDRAW_STEP = $('#txtLineDrawStep').val();
  _LIFESPAN = $('#txtLifespan').val();

  _COMPLETED_REWARD = $('#txtCompletedReward').val();
  _STUCK_PENALTY = $('#txtStuckPenalty').val();
  _SPEED_FACTOR_MULT = $('#txtSpeedFactorMult').val();
  _MAGNITUDE = $('#txtMagnitude').val();
  _MUTATION_RATE = $('#txtMutationRate').val();
}

////////////////////////////////
////////////////////////////////
////////////////////////////////

var _LIFE_COUNTER;
var _POPULATION_COUNT;
var _OBSTACLES = [];
var _TARGET;

var _AVERAGE_FITNESS_LIST_FIRST = [];
var _AVERAGE_FITNESS_LIST_SECOND = [];

var _OFFSET_X, _OFFSET_Y; // Mouseclick offset
var _DELETING = false;
var _HINT = true;
var _SHIFT = false;

function setup() {
  var canvas = createCanvas(_WIDTH, _HEIGHT);
  canvas.parent('render');
  _TARGET = new Target(width / 2, 32, 16);

  var col = randomColor();
  population0 = new Population(col);
  population1 = new Population(contrast(col));

  updateChart();
}

function StartNew() {
  UpdateTweakValues();
  _POPULATION_COUNT = 0;
  _LIFE_COUNTER = 0;
  _AVERAGE_FITNESS_LIST_FIRST = [];
  _AVERAGE_FITNESS_LIST_SECOND = [];

  var col = randomColor();
  population0 = new Population(col);
  population1 = new Population(contrast(col));

  if (!initFinished){
    initFinished = true;
  }
}

function Recolor() {
  var col = randomColor();
  population0.recolor(col)
  population1.recolor(contrast(col));
}

function draw() {
  if (initFinished){
    background(5);

    if (_HINT) {
      textAlign(CENTER);
      textSize(20);
      fill(255, 127);
      text("Create and drag obstacles with <Left Click>", width / 2, height / 2);
      text("Delete obstacles with <Right Click>", width / 2, height / 2 + 32);
      text("Resize them while dragging with the <Mouse Wheel>", width / 2, height / 2 + 64);
      text("Hold <Shift> for vertical resizing", width / 2, height / 2 + 96);
    }

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

    if (_DELETING) {
      for (var i = 0; i < _OBSTACLES.length; i++) {
        if (_OBSTACLES[i].hover()) {
          _OBSTACLES.splice(i, 1);
        }
      }
    }

    for (var i = 0; i < _OBSTACLES.length; i++) {
      _OBSTACLES[i].draw();
    }

    _TARGET.draw();

    noStroke();
    fill(0, 200);
    rectMode(CORNER);
    rect(0, _HEIGHT-64, 172, 64, 0, 32, 0, 0);

    textAlign(LEFT);
    textSize(20);
    fill(255, 200);
    text("Age: "+_LIFE_COUNTER+"/"+_LIFESPAN, 5, height - 40);
    text("Population #: "+_POPULATION_COUNT, 5, height - 10);
  }
}

function mouseWheel(event) {
  for (var i = 0; i < _OBSTACLES.length; i++) {
    if (_OBSTACLES[i].dragging) {
      if (_SHIFT) {
        _OBSTACLES[i].dimensions.y -= event.delta * _OBSTACLES[i].dimensions.y / height;
        _OBSTACLES[i].dimensions.y = constrain(_OBSTACLES[i].dimensions.y, 4, height);
      }
      else {
        _OBSTACLES[i].dimensions.x -= event.delta * _OBSTACLES[i].dimensions.x / width;
        _OBSTACLES[i].dimensions.x = constrain(_OBSTACLES[i].dimensions.x, 4, width);
      }
    }
  }
  return false;
}

function mousePressed() {
  _HINT = false;

  if (mouseButton === LEFT) {
    var pressedObject = false;

    if (_TARGET.hover()) {
      _TARGET.dragging = true;
      _OFFSET_X = _TARGET.position.x-mouseX;
      _OFFSET_Y = _TARGET.position.y-mouseY;
      pressedObject = true;
    }

    for (var i = 0; i < _OBSTACLES.length; i++) {
      if (_OBSTACLES[i].hover() && !pressedObject) {
        _OBSTACLES[i].dragging = true;
        _OFFSET_X = _OBSTACLES[i].position.x-mouseX;
        _OFFSET_Y = _OBSTACLES[i].position.y-mouseY;
        pressedObject = true;
      }
    }
    if (!pressedObject && mouseX >= 0 && mouseY >= 0 && mouseX < width && mouseY < height) {
      var newObstacle = new Obstacle(mouseX - 100, mouseY - 12, 200, 24);
      newObstacle.dragging = true;
      _OFFSET_X = newObstacle.position.x-mouseX;
      _OFFSET_Y = newObstacle.position.y-mouseY;
      pressedObject = true;
      _OBSTACLES.push(newObstacle);
    }
  }
  if (mouseButton === RIGHT) {
    _DELETING = true;
  }
}

function mouseReleased() {
  for (var i = 0; i < _OBSTACLES.length; i++) {
    _OBSTACLES[i].dragging = false;
  }

  _TARGET.dragging = false;

  if (mouseButton === RIGHT) {
    _DELETING = false;
  }
}

function keyPressed() {
  if (keyCode === SHIFT)
    _SHIFT = true;
}

function keyReleased() {
  if (keyCode === SHIFT)
    _SHIFT = false;
}

function updateChart() {
  _AVERAGE_FITNESS_LIST_FIRST.push(population0.averageFitness);
  _AVERAGE_FITNESS_LIST_SECOND.push(population1.averageFitness);
  high();
}
