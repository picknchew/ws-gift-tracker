import { Gifter, Referralv2 } from 'renderer/typings';
import timeSince from 'renderer/utils/timeSince';

export const getNextGiftsToSend = (gifters: Array<Referralv2>, count = 10): Array<Gifter> => {
  const readyToSend = [];
  let i = 0;

  while (readyToSend.length < count) {
    const payoutTime = new Date(gifters[i].payoutTriggeredAt);
    const now = new Date();
    // if the payout was triggered more than 24 hours ago, add to the list
    if (gifters[i].category === 'payment_gift' && gifters[i].opposingUserProfile && now.getTime() - payoutTime.getTime() >= 86400000) {
      readyToSend.push({ handle: gifters[i].opposingUserProfile?.handle ?? 'unknown', timeSinceLastSent: timeSince(payoutTime) });
    }
    i += 1;
  }

  return readyToSend;
};

export const eslintBruh = () => {};
