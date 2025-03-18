import reducer, { addIngredient, delIngredient, moveIngredient, resetConstructor, initialState } from './slice.ts';

const buns = Array.from({ length: 2 }, (_, i) => ({
  _id: `bun${i + 1}`,
  type: 'bun',
}))

const fillings = Array.from({ length: 3 }, (_, i) => ({
  _id: `filling${i + 1}`,
  type: 'main',
}));

const stateWithIngredients = {
  bun: buns[0],
  fillings: fillings.map((n, i) => ({ ...n, id: `${i + 1}` })),
};

describe('burger constructor test', () => {

  it('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should add bun', () => {
    const bun = buns[0];

    expect(reducer(initialState, addIngredient(bun))).toEqual({
      ...initialState,
      bun: {
        ...bun,
        id: expect.any(String),
      },
    });
  });

  it('should replace bun', () => {
    const bun = buns[1];

    expect(reducer(stateWithIngredients, addIngredient(bun))).toEqual({
      ...stateWithIngredients,
      bun: {
        ...bun,
        id: expect.any(String),
      },
    });
  });

  it('should add filling', () => {
    const filling = fillings[0];

    expect(reducer(initialState, addIngredient(filling))).toEqual({
      ...initialState,
      fillings: [
        {
          ...filling,
          id: expect.any(String),
        },
      ],
    });
  });

  it('should move filling', () => {
    const { fillings } = stateWithIngredients;

    expect(reducer(stateWithIngredients, moveIngredient({ oldIndex: 2, newIndex: 0 }))).toEqual({
      ...stateWithIngredients,
      fillings: [ fillings[2], fillings[0], fillings[1] ],
    });
  });

  it('should remove filling', () => {
    const { fillings } = stateWithIngredients;

    expect(reducer(stateWithIngredients, delIngredient(fillings[0].id))).toEqual({
      ...stateWithIngredients,
      fillings: [ fillings[1], fillings[2] ],
    })
  });

  it('should reset state', () => {
    const stateToReset = {
      text: 'lorem ipsum dolor sit amet',
    };

    expect(reducer(stateToReset, resetConstructor())).toEqual(initialState);
  });

});
