export const incrementCounter = () => {
  return {
    type: 'COUNTER_INCREMENT',
  };
};

export const decrementCounter = () => {
  return {
    type: 'COUNTER_DECREMENT',
  };
};
