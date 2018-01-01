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
  this.stuck = false;

  this.color = color(0);
  this.line = [];

  this.applyForce = function(force) {
    this.acceleration.add(force);
  }

  this.update = function() {
    this.applyForce(this.dna.genes[_LIFE_COUNTER]);

    var d = dist(this.position.x, this.position.y, _TARGET.x, _TARGET.y);
    if (d < 16) {
      this.completed = true;
      this.position = _TARGET.copy();
    }

    if (this.position.x > _OBSTACLE_X && this.position.x < _OBSTACLE_X + _OBSTACLE_W &&
        this.position.y > _OBSTACLE_Y && this.position.y < _OBSTACLE_Y + _OBSTACLE_H && !this.stuck) {
      this.stuck = true;
      this.line.push(this.position.copy());
    }

    // TODO: outOfBounds function
    if ((this.position.x > _WIDTH || this.position.x < 0 ||
        this.position.y > _HEIGHT || this.position.y < 0) && !this.stuck) {
      this.stuck = true;
      this.line.push(this.position.copy());
    }

    if (!this.completed && !this.stuck) {
      this.velocity.add(this.acceleration);
      this.position.add(this.velocity);
      this.acceleration.mult(0);
    }

    if (_LIFE_COUNTER % _LINEDRAW_STEP == 0 && !this.completed && !this.stuck) {
      this.line.push(this.position.copy());
    }
  }

  this.calcFitness = function() {
    var d = dist(this.position.x, this.position.y, _TARGET.x, _TARGET.y);
    this.fitness = map(d, 0, width, width, 0);
    if (this.completed) {
      this.fitness *= _COMPLETED_REWARD;
    }
    if (this.stuck) {
      this.fitness *= _STUCK_PENALTY;
    }
  }

  this.draw = function() {
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

  this.drawLine = function() {
    beginShape();
    noFill();
    stroke(red(this.color), green(this.color), blue(this.color), 33);
    strokeWeight(2);

    for (var i = 0; i < this.line.length; i++) {
      vertex(this.line[i].x, this.line[i].y);
    }
    endShape();
  }
}
