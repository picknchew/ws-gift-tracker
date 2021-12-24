import axios, { AxiosRequestHeaders } from 'axios';

const homeEndpoint = 'https://api-legacy.wealthsimple.com/graphql';

const HOME_QUERY = `query OnboardedHome {
  p2pRecentContactsTelephoneHashes(limit: 20)
  p2pContacts {
    nodes {
      ...Contact
      __typename
    }
    __typename
  }
  p2pActivePromo(includeGiveaways: true) {
    id
    startTime
    endTime
    payoutAmount
    payoutTrigger
    __typename
  }
}
fragment Contact on P2PContact {
  id
  identifier
  identifierType
  telephoneHash
  __typename
  contactee {
    ...Profile
    __typename
  }
}
fragment Profile on P2PProfile {
  __typename
  id
  name
  handle
  imageUrl
  color
  telephoneHash
}
`;

const queryHome = async () => {
  const headers: AxiosRequestHeaders = { 'Content-Type': 'application/json', Accept: 'application/json' };

  const res = await axios.post(
    homeEndpoint,
    {
      operationName: 'OnboardedHome',
      query: HOME_QUERY,
      variables: {},
    },
    { headers }
  );

  return res.data;
};

export default queryHome;
