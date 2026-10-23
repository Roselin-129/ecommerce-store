export const selectCartItems = (state) => state.cart.items;

export const selectTotalItems = (state) =>
  state.cart.items.reduce(
    (total, item) => total + item.quantity,
    0
  );

export const selectTotalPrice = (state) =>
  state.cart.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );