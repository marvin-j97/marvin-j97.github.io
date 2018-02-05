function Target(x, y, r) {
  this.position = createVector(x, y);
  this.radius = r;

  this.dragging = false; // Is the object being dragged?
}

Target.prototype.hover = function() {
  return (p5.Vector.dist(createVector(mouseX, mouseY), this.position) < this.radius);
}

Target.prototype.draw = function() {
  if (this.dragging) {
    this.position.x = mouseX + _OFFSET_X;
    this.position.y = mouseY + _OFFSET_Y;
  }
  this.position.x = constrain(this.position.x, this.radius, width - this.radius);
  this.position.y = constrain(this.position.y, this.radius, height - this.radius);

  fill(255, 200);
  noStroke();
  ellipse(this.position.x, this.position.y, this.radius * 2, this.radius * 2);
}
