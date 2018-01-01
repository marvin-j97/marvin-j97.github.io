function Obstacle(x, y, w, h) {
  this.position = createVector(x, y);
  this.dimensions = createVector(w, h);
  this.color = color(random(127, 255), random(127, 255), random(127, 255), 200);

  this.draw = function() {
    fill(this.color, 200);
    rectMode(CORNERS);
    rect(this.position.x, this.position.y, this.position.x + this.dimensions.x, this.position.y + this.dimensions.y, 10);
  }
}
