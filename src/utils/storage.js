/**
 * Saves an item to localStorage
 * @param {string} key
 * @param {string} value
 */
export const saveAs = key => value => localStorage.setItem(key, value);

/**
 * Loads an item from localStorage
 * @param {string} key
 * @return {string} value
 */
export const load = key => () => localStorage.getItem(key);
