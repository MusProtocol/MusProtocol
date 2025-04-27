class TensorFlowModel {
  constructor(config) {
    this.layers = config.layers;
    this.weights = new Map();
    this.biases = new Map();
    this.initializeWeights();
  }

  initializeWeights() {
    this.layers.forEach((layer, index) => {
      const inputSize = index === 0 ? 64 : this.layers[index - 1].neurons;
      const outputSize = layer.neurons;
      
      // Initialize weights with Xavier initialization
      const weights = Array(inputSize).fill().map(() => 
        Array(outputSize).fill().map(() => 
          (Math.random() * 2 - 1) * Math.sqrt(6 / (inputSize + outputSize))
        )
      );
      
      this.weights.set(index, weights);
      this.biases.set(index, Array(outputSize).fill(0));
    });
  }

  async predict(input) {
    let currentOutput = input;

    for (let i = 0; i < this.layers.length; i++) {
      const weights = this.weights.get(i);
      const biases = this.biases.get(i);
      const activation = this.layers[i].activation;

      // Matrix multiplication and bias addition
      currentOutput = this.matrixMultiply(currentOutput, weights);
      currentOutput = currentOutput.map((row, i) => 
        row.map((val, j) => val + biases[j])
      );

      // Apply activation function
      currentOutput = this.applyActivation(currentOutput, activation);
    }

    return currentOutput;
  }

  // Helper methods
  matrixMultiply(a, b) {
    return a.map(row => 
      b[0].map((_, i) => 
        row.reduce((sum, cell, j) => sum + cell * b[j][i], 0)
      )
    );
  }

  applyActivation(matrix, activation) {
    const activationFns = {
      'relu': x => Math.max(0, x),
      'sigmoid': x => 1 / (1 + Math.exp(-x)),
      'tanh': x => Math.tanh(x)
    };

    return matrix.map(row => 
      row.map(val => activationFns[activation](val))
    );
  }
}

module.exports = { TensorFlowModel }; 