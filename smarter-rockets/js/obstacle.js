function Obstacle(x, y, w, h) {
  this.position = createVector(x, y);
  this.dimensions = createVector(w, h);
  this.color = color(random(127, 255), random(127, 255), random(127, 255), 200);

  this.dragging = false; // Is the object being dragged?
}

Obstacle.prototype.hover = function() {
  return (mouseX >= this.position.x &&
          mouseY >= this.position.y &&
          mouseX < this.position.x + this.dimensions.x &&
          mouseY < this.position.y + this.dimensions.y);
}

Obstacle.prototype.draw = function() {
  if (this.dragging) {
    this.position.x = mouseX + _OFFSET_X;
    this.position.y = mouseY + _OFFSET_Y;
  }
  this.position.x = constrain(this.position.x, 0, width - this.dimensions.x);
  this.position.y = constrain(this.position.y, 0, height - this.dimensions.y);

  noStroke();
  fill(this.color, 200);
  rectMode(CORNERS);
  rect(this.position.x, this.position.y, this.position.x + this.dimensions.x, this.position.y + this.dimensions.y, 10);
}
