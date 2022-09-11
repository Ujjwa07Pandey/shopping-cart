const INITIAL_STATE = {
  products: null,
  cart: [],
};

export const ProductsActionTypes = {
  SET_PRODUCTS: "SET_PRODUCTS",
  ADD_PRODUCT: "ADD_PRODUCT",
  DELETE_PRODUCT: "DELETE_PRODUCT",
};

export const setProducts = (products) => ({
  type: ProductsActionTypes.SET_PRODUCTS,
  payload: { products },
});

export const addProduct = (productId) => ({
  type: ProductsActionTypes.ADD_PRODUCT,
  payload: { productId },
});

export const deleteProduct = (productId) => ({
  type: ProductsActionTypes.DELETE_PRODUCT,
  payload: { productId },
});

export const productsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ProductsActionTypes.SET_PRODUCTS:
      return { ...state, products: action.payload.products };
    case ProductsActionTypes.ADD_PRODUCT:
      return { ...state, cart: [...state.cart, action.payload.productId] };
    case ProductsActionTypes.DELETE_PRODUCT:
      return {
        ...state,
        cart: state.cart.filter((x) => x !== action.payload.productId),
      };
    default:
      return state;
  }
};

export const productsSelector = (state) => state.products.products;
export const cartSelector = (state) => state.products.cart;
