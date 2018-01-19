function Population(col) {
  this.rockets = [];
  this.pool = [];
  this.color = col;
  this.averageFitness = 0;

  for (var i = 0; i < _POPULATION_SIZE; i++) {
    this.rockets[i] = new Rocket();
    var rand = random(0, 50);
    this.rockets[i].color = color(red(this.color) - rand, green(this.color) - rand, blue(this.color) - rand);
  }

  this.recolor = function(col) {
    this.color = col;
    for (var i = 0; i < _POPULATION_SIZE; i++) {
      var rand = random(0, 50);
      this.rockets[i].color = color(red(this.color) - rand, green(this.color) - rand, blue(this.color) - rand);
    }
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
