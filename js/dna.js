function DNA(genes) {
  if (genes) {
    this.genes = genes;
  } else {
    this.genes = [];
    for (var i = 0; i < _LIFESPAN; i++) {
      this.genes[i] = p5.Vector.random2D();
      this.genes[i].setMag(_MAGNITUDE);
    }
  }
}

DNA.prototype.crossover = function(partner) {
  var newGenes = [];
  var mid = floor(random(this.genes.length));
  for (var i = 0; i < this.genes.length; i++) {
    if (i > mid) {
      newGenes[i] = this.genes[i];
    } else {
      newGenes[i] = partner.genes[i];
    }
  }
  return new DNA(newGenes);
}

DNA.prototype.mutate = function() {
  for (var i = 0; i < this.genes.length; i++) {
    if (random(1) < _MUTATION_RATE) {
      this.genes[i] = p5.Vector.random2D();
      this.genes[i].setMag(_MAGNITUDE);
    }
  }
}
