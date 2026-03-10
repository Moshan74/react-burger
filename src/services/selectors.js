import { createSelector } from 'reselect';

export const selectIngredientCounts = createSelector(
  (selectedIngredients) => selectedIngredients,
  (ingredients) => {
    const counts = {};

    ingredients.forEach((ingredient) => {
      const id = ingredient._id;
      if (counts[id]) {
        counts[id] += 1;
      } else {
        counts[id] = 1;
      }
    });

    // Для булок устанавливаем счётчик = 2, если булка есть в конструкторе
    ingredients.forEach((ingredient) => {
      if (ingredient.type === 'bun' && counts[ingredient._id]) {
        counts[ingredient._id] = 2;
      }
    });

    return counts;
  }
);

export const selectIngredientCountById = createSelector(
  (counts, ingredientId) => ({ counts, ingredientId }),
  ({ counts, ingredientId }) => {
    return counts[ingredientId] || 0;
  }
);
