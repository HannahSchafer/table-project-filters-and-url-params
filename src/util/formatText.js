/**
 * Format a number in US format.
 *
 * @param {string|number} val
 */
export const formatCommaNumbers = (val) => {
  if (!val) return null;

  return new Intl.NumberFormat().format(val);
};
