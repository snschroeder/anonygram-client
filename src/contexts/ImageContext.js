import React, { useContext } from 'react';
export const useImageContext = () => useContext(ImageContext);
const defaultValues = {
  //vars in ABC order
  alert: '',
  debounce: null,
  error: null,
  images: [],
  morePagesAvail: null,
  newContentLoaded: null, 
  page: null,
  sort: ['new', 'top'],
  user: null,
  userLocation: {},
  //funcs in ABC order
  clearAlert: () => {},
  clearError: () => {},
  handleDelete: () => {},
  incrementUpvotes: () => {},
  resetState: () => {},
  setAlert: () => {},
  setDebounce: () => {},
  setError: () => {},
  setMorePagesAvail: () => {},
  setNewContentLoaded: () => {},
  setPage: () => {},
  setView: () => {},
}
const ImageContext = React.createContext(defaultValues)

export default ImageContext;
