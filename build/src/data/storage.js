/**
 * Storage utility for managing localStorage operations
 */

/**
 * Load data from localStorage
 * @param {string} key - The localStorage key
 * @param {any} defaultValue - Default value if key doesn't exist
 * @returns {any} - The stored value or default value
 */
export function load(key, defaultValue = null) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error loading "${key}" from localStorage:`, error);
    return defaultValue;
  }
}

/**
 * Save data to localStorage
 * @param {string} key - The localStorage key
 * @param {any} value - The value to store
 * @returns {boolean} - Whether the save was successful
 */
export function save(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`Error saving "${key}" to localStorage:`, error);
    return false;
  }
}

/**
 * Remove data from localStorage
 * @param {string} key - The localStorage key
 * @returns {boolean} - Whether the removal was successful
 */
export function remove(key) {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`Error removing "${key}" from localStorage:`, error);
    return false;
  }
}

/**
 * Clear all data from localStorage
 * @returns {boolean} - Whether the clear was successful
 */
export function clear() {
  try {
    localStorage.clear();
    return true;
  } catch (error) {
    console.error('Error clearing localStorage:', error);
    return false;
  }
}
