/**
 * Formats a payout amount (in cents) for display.
 * @param payout a number in cents
 * @returns a string formatted for display
 */
const formatPayout = (payout?: number): string => {
  if (payout === undefined) return 'error';

  const dollars = payout / 100;
  return dollars.toLocaleString('en-CA', { style: 'currency', currency: 'CAD' });
};

export default formatPayout;
