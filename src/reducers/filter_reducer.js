import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from "../actions";

const filter_reducer = (state, action) => {
  if (action.type === LOAD_PRODUCTS) {
    let max_price = action.payload.map((product) => product.price);
    max_price = Math.max(...max_price);
    return {
      ...state,
      all_products: [...action.payload],
      filtered_products: [...action.payload],
      filters: { ...state.filters, max_price: max_price, price: max_price },
    };
  }
  if (action.type === SET_GRIDVIEW) {
    return {
      ...state,
      grid_view: true,
    };
  }
  if (action.type === SET_LISTVIEW) {
    return {
      ...state,
      grid_view: false,
    };
  }
  if (action.type === UPDATE_SORT) {
    return {
      ...state,
      sort: action.payload,
    };
  }
  if (action.type === SORT_PRODUCTS) {
    const { sort, filtered_products } = state;
    let temp_products = [...filtered_products];
    if (sort === "price-lowest") {
      temp_products = temp_products.sort((a, b) => a.price - b.price);
    }
    if (sort === "price-highest") {
      temp_products = temp_products.sort((a, b) => b.price - a.price);
    }
    if (sort === "name-a") {
      temp_products = temp_products.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
    }
    if (sort === "name-z") {
      temp_products = temp_products.sort((a, b) => {
        return b.name.localeCompare(a.name);
      });
    }
    return {
      ...state,
      filtered_products: temp_products,
    };
  }
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default filter_reducer;
