function Rocket(dna) {
  this.position = createVector(width / 2, height - 5);
  this.velocity = createVector();
  this.acceleration = createVector();
  if (dna) {
    this.dna = dna;
  } else {
    this.dna = new DNA();
  }
  this.fitness = 0;
  this.completed = false;
  this.speedFactor = _LIFESPAN;
  this.stuck = false;

  this.color = color(0);
  this.line = [];
}

Rocket.prototype.applyForce = function(force) {
  this.acceleration.add(force);
}

Rocket.prototype.update = function() {
  this.applyForce(this.dna.genes[_LIFE_COUNTER]);

  var d = dist(this.position.x, this.position.y, _TARGET.position.x, _TARGET.position.y);
  if (d < _TARGET.radius) {
    if (!this.completed) {
      this.completed = true;
      this.line.push(this.position.copy());
    }
    this.position = _TARGET.position.copy();
  }

  if (this.collision()) {
    this.stuck = true;
    this.line.push(this.position.copy());
  }

  if (this.outOfBounds()) {
    this.stuck = true;
    this.line.push(this.position.copy());
  }

  if (!this.completed && !this.stuck) {
    this.speedFactor--;
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  if (_LIFE_COUNTER % _LINEDRAW_STEP == 0 && !this.completed && !this.stuck) {
    this.line.push(this.position.copy());
  }
}

Rocket.prototype.collision = function() {
  for (var i = 0; i < _OBSTACLES.length; i++) {
    if ((this.position.x > _OBSTACLES[i].position.x && this.position.x < _OBSTACLES[i].position.x + _OBSTACLES[i].dimensions.x &&
        this.position.y > _OBSTACLES[i].position.y && this.position.y < _OBSTACLES[i].position.y + _OBSTACLES[i].dimensions.y) && !this.stuck) {
      return true;
    }
  }
  return false;
}

Rocket.prototype.outOfBounds = function() {
  if ((this.position.x > _WIDTH || this.position.x < 0 ||
      this.position.y > _HEIGHT || this.position.y < 0) && !this.stuck) {
    return true;
  }
  return false;
}

Rocket.prototype.calcFitness = function() {
  var d = dist(this.position.x, this.position.y, _TARGET.position.x, _TARGET.position.y);
  this.fitness = map(d, 0, width, width, 0);
  if (this.completed) {
    this.fitness *= _COMPLETED_REWARD;
    this.fitness += this.speedFactor * _SPEED_FACTOR_MULT;
  }
  if (this.stuck) {
    this.fitness *= _STUCK_PENALTY;
  }
}

Rocket.prototype.draw = function() {
  push();

  this.drawLine();

  noStroke();
  fill(this.color);
  translate(this.position.x, this.position.y);
  rotate(this.velocity.heading());
  rectMode(CENTER);
  rect(0, 0, 24, 8, 10);

  pop();
}

Rocket.prototype.drawLine = function() {
  beginShape();
  noFill();
  stroke(red(this.color), green(this.color), blue(this.color), 33);
  strokeWeight(2);

  for (var i = 0; i < this.line.length; i++) {
    vertex(this.line[i].x, this.line[i].y);
  }
  endShape();
}
