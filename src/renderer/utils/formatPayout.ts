/**
 * Formats a payout amount (in cents) for display.
 * @param payout a number in cents
 * @returns a string formatted for display
 */
const formatPayout = (payout: number): string => {
  const dollars = payout / 100;
  return dollars.toLocaleString('en-US', { style: 'currency', currency: 'CAD' });
};

export default formatPayout;
