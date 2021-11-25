import Commerce from '@chec/commerce.js';

// ceate new instance of the commerce
// true for creating a new store
export const commerce = new Commerce(process.env.REACT_APP_CHEC_PUBLIC_KEY, true);