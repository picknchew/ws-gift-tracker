import axios, { AxiosRequestHeaders } from 'axios';

const dashboardEndpoint = 'https://api-legacy.wealthsimple.com/graphql';

const DASHBOARD_QUERY = `query CashClientDashboard($clientId: ID) {
  client(id: $clientId) {
    __typename
    ...AmlRecords
    id
    created_at
    jurisdiction
    identityDocumentReviews {
      decision
      status
      __typename
    }
    onboarding {
      states {
        kyc_application
        email_confirmation
        __typename
      }
      __typename
    }
    profile {
      email
      biometric_check {
        status
        __typename
      }
      residential_address {
        postal_code
        city
        __typename
      }
      __typename
    }
    p2pProfile {
      name
      handle
      color
      imageUrl
      telephone
      telephoneVerified
      referralCode
      school {
        id
        name
        __typename
      }
      __typename
    }
    accounts(accountTypes: [ca_cash, ca_cash_msb]) {
      id
      nickname
      type
      investNetLiquidationAmount: net_liquidation_amount
      currency
      signedAgreements {
        id
        className
        __typename
      }
      cashAccount {
        status
        balance
        spendingBalance
        withdrawalBalance
        __typename
      }
      custodianAccounts {
        id
        custodianAccountId
        status
        __typename
      }
      __typename
    }
    spend {
      id
      status
      eligibleForSpend
      eligibleForCardDrop
      __typename
    }
  }
}
fragment AmlRecords on Client {
  amlRecords {
    __typename
    results {
      __typename
      status
      requiredDocumentsCount
      requiredDocumentTypes
    }
  }
  __typename
}
`;

const queryDashboard = async (clientId: string) => {
  const headers: AxiosRequestHeaders = { 'Content-Type': 'application/json', Accept: 'application/json' };

  const res = await axios.post(
    dashboardEndpoint,
    {
      operationName: 'CashClientDashboard',
      query: DASHBOARD_QUERY,
      variables: {
        clientId,
      },
    },
    { headers }
  );

  return res.data;
};

export default queryDashboard;
