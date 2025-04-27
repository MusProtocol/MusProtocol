class NeuralNetwork {
  constructor() {
    this.synapticConnections = new Map();
    this.activationHistory = [];
    this.learningThreshold = 0.75;
  }

  processSignal(input, context) {
    const signalStrength = this.calculateSignalStrength(input);
    const synapticResponse = this.generateSynapticResponse(signalStrength, context);
    
    this.updateSynapticWeights(synapticResponse);
    this.recordActivation(synapticResponse);
    
    return this.normalizeOutput(synapticResponse);
  }

  calculateSignalStrength(input) {
    return Object.entries(input).reduce((strength, [key, value]) => {
      const synapticWeight = this.synapticConnections.get(key) || Math.random();
      return strength + (value * synapticWeight);
    }, 0);
  }

  generateSynapticResponse(strength, context) {
    const baseResponse = Math.tanh(strength);
    const contextualModulation = this.calculateContextModulation(context);
    
    return {
      amplitude: baseResponse * contextualModulation,
      frequency: this.calculateResponseFrequency(strength),
      coherence: this.calculateCoherence(baseResponse, contextualModulation)
    };
  }

  calculateContextModulation(context) {
    if (!context) return 1;
    
    const recentActivations = this.activationHistory.slice(-5);
    const contextualWeight = recentActivations.reduce((weight, activation) => {
      return weight + (activation.coherence * context.intensity || 0);
    }, 1);
    
    return Math.min(contextualWeight / recentActivations.length, 2);
  }

  calculateResponseFrequency(strength) {
    return (1 / (1 + Math.exp(-strength))) * Math.PI * 2;
  }

  calculateCoherence(response, modulation) {
    return Math.abs(response) * modulation / (1 + this.activationHistory.length);
  }

  updateSynapticWeights(response) {
    this.synapticConnections.forEach((weight, key) => {
      const learningRate = 0.01 * Math.exp(-this.activationHistory.length / 100);
      const update = response.amplitude * learningRate;
      
      this.synapticConnections.set(
        key,
        Math.max(0, Math.min(1, weight + update))
      );
    });
  }

  recordActivation(response) {
    this.activationHistory.push({
      timestamp: Date.now(),
      ...response
    });

    // Keep only last 100 activations
    if (this.activationHistory.length > 100) {
      this.activationHistory.shift();
    }
  }

  normalizeOutput(response) {
    return {
      signal: response.amplitude,
      phase: response.frequency,
      stability: response.coherence,
      confidence: this.calculateConfidence(response)
    };
  }

  calculateConfidence(response) {
    const recentResponses = this.activationHistory.slice(-10);
    const averageCoherence = recentResponses.reduce(
      (sum, activation) => sum + activation.coherence, 0
    ) / Math.max(1, recentResponses.length);
    
    return Math.min(1, averageCoherence * response.coherence);
  }
}

module.exports = { NeuralNetwork }; 