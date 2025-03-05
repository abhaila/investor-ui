export type Investor = {
  id: number;
  name: string;
  type: string;
  date_added: string;
  country: string;
  total_commitment: number;
  commitments: Commitment[];
}

export type Commitment = {
  id: number;
  asset_class: AssetClasses;
  currency: string;
  amount: number;
  investor_id: number;
}

export const enum AssetClasses {
  PRIVATE_EQUITY = "Private Equity",
  NATURAL_RESOURCES = "Natural Resources",
  HEDGE_FUNDS = "Hedge Funds",
  REAL_ESTATE = "Real Estate",
  PRIVATE_DEBT = "Private Debt",
  INFRASTRUCTURE = "Infrastructure",
}