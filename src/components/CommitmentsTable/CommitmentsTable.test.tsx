import CommitmentsTable from "./CommitmentsTable.tsx";
import {act, render, screen} from "@testing-library/react";
import {AssetClasses} from "../types.tsx";
import '@testing-library/jest-dom';

const mockInvestor = {
  id: 1,
  name: "Investor 1",
  type: "Bank",
  date_added: "2022-01-01",
  country: "USA",
  total_commitment: 3000000000,
  commitments: [
    {
      id: 1,
      asset_class: AssetClasses.INFRASTRUCTURE,
      currency: "GBP",
      amount: 1000000000,
      investor_id: 1,
    },
    {
      id: 2,
      asset_class: AssetClasses.PRIVATE_EQUITY,
      currency: "GBP",
      amount: 2000000000,
      investor_id: 1,
    },
  ],
}

const setup = () => {
  return render(
    <CommitmentsTable investor={mockInvestor} />
  )
}

describe("<CommitmentsTable/>", () => {
  it("should render commitments table", () => {
    setup();

    // Check for Asset Class and Amount values
    expect(screen.getAllByText('£1000M')).toHaveLength(2)
    expect(screen.getAllByText('Infrastructure')).toHaveLength(2)
    expect(screen.getAllByText('£2000M')).toHaveLength(2)
    expect(screen.getAllByText('Private Equity')).toHaveLength(2)

    // Check for table headers
    expect(screen.getByText('Id')).toBeInTheDocument();
    expect(screen.getByText('Asset Class')).toBeInTheDocument();
    expect(screen.getByText('Currency')).toBeInTheDocument();
    expect(screen.getByText('Amount')).toBeInTheDocument();
  });

  it("should filter commitments by asset class", () => {
    setup();

    expect(screen.getAllByTestId('commitment-row')).toHaveLength(2)

    // Filter by Private Equity
    const radioPE = screen.getByLabelText('Private Equity');
    act(() => {
      radioPE.click()
    });
    expect(screen.getAllByTestId('commitment-row')).toHaveLength(1)
  });
});