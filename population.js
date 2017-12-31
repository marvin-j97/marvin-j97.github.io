function Population() {
  this.rockets = [];
  this.pool = [];
  this.color = color(100 + random(155), 100 + random(155), 100 + random(155), 200);
  this.averageFitness = 0;

  for (var i = 0; i < _SIZE; i++) {
    this.rockets[i] = new Rocket();
    this.rockets[i].color = this.color;
  }

  this.update = function() {
    for (var i = 0; i < this.rockets.length; i++) {
      this.rockets[i].update();
      this.rockets[i].draw();
    }
  }

  this.evaluate = function() {
    var maxFit = 0;
    this.averageFitness = 0;
    for (var i = 0; i < this.rockets.length; i++) {
      this.rockets[i].calcFitness();

      if (this.rockets[i].fitness > maxFit) {
        maxFit = this.rockets[i].fitness;
      }

      this.averageFitness += this.rockets[i].fitness;
    }
    _MAXIMUM_FITNESS = round(maxFit);
    this.averageFitness = round(this.averageFitness / this.rockets.length);

    for (var i = 0; i < this.rockets.length; i++) {
      this.rockets[i].fitness /= maxFit;
    }

    this.pool = [];
    for (var i = 0; i < this.rockets.length; i++) {
      var n = this.rockets[i].fitness * 100;

      for (var j = 0; j < n; j++) {
        this.pool.push(this.rockets[i]);
      }
    }
  }

  this.selection = function() {
    var newRockets = [];
    for (var i = 0; i < this.rockets.length; i++) {
      var partnerA = random(this.pool).dna;
      var partnerB = random(this.pool).dna;

      var child = partnerA.crossover(partnerB);
      child.mutate();

      newRockets[i] = new Rocket(child);
      newRockets[i].color = this.color;
    }
    this.rockets = newRockets;
  }
}
