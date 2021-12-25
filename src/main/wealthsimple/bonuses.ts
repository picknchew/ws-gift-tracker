import axios, { AxiosRequestHeaders } from 'axios';
import { Referralsv2QueryResponse } from 'main/typings';

const bonusEndpoint = 'https://api-legacy.wealthsimple.com/graphql';

const BONUS_QUERY = `query Referralsv2Query(
  $status: [P2PReferralStatusEnum!]
  $type: P2PReferralTypeEnum
  $externalSourceCanonicalId: ID
  $category: [P2PReferralCategoryEnum!]
) {
  p2pReferralsv2(
    status: $status
    type: $type
    externalSourceCanonicalId: $externalSourceCanonicalId
    category: $category
  ) {
    ...Referralv2
    __typename
  }
}
fragment Referralv2 on P2PReferralv2 {
  __typename
  id
  payoutAmount
  payoutTriggeredAt
  type
  promoCode
  category
  opposingUserProfile {
    id
    handle
    __typename
  }
  createdAt
  updatedAt
}
`;

const queryBonuses = async () => {
  const headers: AxiosRequestHeaders = { 'Content-Type': 'application/json', Accept: 'application/json' };

  const res = await axios.post<Referralsv2QueryResponse>(
    bonusEndpoint,
    {
      operationName: 'Referralsv2Query',
      query: BONUS_QUERY,
      variables: {
        status: ['paidout'],
      },
    },
    { headers }
  );

  return res.data;
};

export default queryBonuses;
