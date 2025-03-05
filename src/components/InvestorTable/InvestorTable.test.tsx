import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import InvestorTable from "./components/InvestorTable";
import {act, render, screen} from '@testing-library/react';
import {useGetInvestors} from "./hooks/useGetInvestors";
import '@testing-library/jest-dom';

jest.mock("./hooks/useGetInvestors");

const mockInvestorsValue = [
  { id: 1, name: 'Investor A', type: "Fund Manager", date_added: '2022-01-01', country: 'USA', total_commitment: 3000000000, commitments: [] },
  { id: 2, name: 'Investor B', type: "Wealth Manager", date_added: '2022-02-01', country: 'Canada', total_commitment: 2000000000, commitments: [] },
];

const queryClient = new QueryClient();

const setup = () => {
  return render(
    <QueryClientProvider client={queryClient}>
      <InvestorTable setInvestor={() => {}} />
    </QueryClientProvider>
  )
}

describe("<InvestorTable/>", () => {
  beforeEach(() => {
    // Provide a mock implementation for the hook
    (useGetInvestors as jest.Mock).mockReturnValue({
      data: mockInvestorsValue,
    });
  });

  it("should render investor table", async () => {
    setup();

    expect(await screen.findByText('Investor A')).toBeInTheDocument();
    expect(await screen.findByText('Investor B')).toBeInTheDocument();
    expect(await screen.findByText('Fund Manager')).toBeInTheDocument();
    expect(await screen.findByText('Wealth Manager')).toBeInTheDocument();
    expect(await screen.findByText('2022-01-01')).toBeInTheDocument();
    expect(await screen.findByText('2022-02-01')).toBeInTheDocument();
    expect(await screen.findByText('USA')).toBeInTheDocument();
    expect(await screen.findByText('Canada')).toBeInTheDocument();
    expect(await screen.findByText('$3.00B')).toBeInTheDocument();
    expect(await screen.findByText('$2.00B')).toBeInTheDocument();
  });

  it("should sort by name in descending order", async () => {
    setup();

    const nameHeader = await screen.findByText('Name');
    act(() => {
      nameHeader.click();
    });

    expect(await screen.findByText('Investor B')).toBeInTheDocument();
    expect(await screen.findByText('Investor A')).toBeInTheDocument();
  });
});