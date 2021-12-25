import { Gifter, Referralv2 } from 'main/typings';
import timeSince from 'renderer/utils/timeSince';

export const getNextGiftsToSend = (gifters: Array<Referralv2>, count = 10): Array<Gifter> => {
  const readyToSend = [];
  let i = 0;

  while (readyToSend.length < count && i < gifters.length) {
    const payoutTime = new Date(gifters[i].payoutTriggeredAt);
    const now = new Date();
    // if the payout was triggered more than 24 hours ago, add to the list
    if (gifters[i].category === 'payment_gift' && gifters[i].opposingUserProfile && now.getTime() - payoutTime.getTime() >= 86400000) {
      readyToSend.push({
        handle: gifters[i].opposingUserProfile?.handle ?? 'unknown',
        timeSinceLastSent: timeSince(payoutTime),
        timestamp: gifters[i].payoutTriggeredAt,
      });
    }
    i += 1;
  }

  return readyToSend;
};

/**
 * Calculates the total payout from gifts and # of gifts since a given date. Defaults to 12 AM of today.
 * @param {Array<Referralv2>} gifters array of gift information
 * @param {Date} startFrom the date to start counting from
 * @returns {{payout: number; numGifts: number;}} an object containing payout in cents and number of gifts
 */
export const getPayoutFromGifts = (gifters: Array<Referralv2>, startFrom?: Date): { payout: number; numGifts: number } => {
  const start = startFrom ?? new Date();
  // default value of startFrom is 12 AM of today
  if (!startFrom) {
    start.setHours(0, 0, 0, 0);
  }

  let payout = 0;
  let numGifts = 0;
  let i = 0;

  while (i < gifters.length) {
    const payoutTime = new Date(gifters[i].payoutTriggeredAt);
    // if the payout was triggered after start, add to the total
    if (gifters[i].category === 'payment_gift' && payoutTime.getTime() >= start.getTime()) {
      payout += gifters[i].payoutAmount;
      numGifts += 1;
    }
    i += 1;
  }

  return { payout, numGifts };
};
