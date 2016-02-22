
'use strict';

export const MultiStepMixin = {

  steps: [],

  initSteps(steps) {
    this.steps = steps;

    this.setState({
      step: 0
    });
  },

  renderStep() {
    if (this.state.step >= this.steps.length) {
      throw new Error(`Invalid step ${this.state.step}. There are only ${this.steps.length} steps.`);
    }

    return this.steps[this.state.step];
  },

  nextStep() {
    this.setState({
      step: this.state.step + 1
    });
  },

  isLastStep() {
    return this.state.step === this.steps.length - 1;
  }

};


