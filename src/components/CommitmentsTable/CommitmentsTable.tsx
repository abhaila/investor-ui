import React, {useMemo, useState} from "react";
import {Box, FormLabel, Radio, radioClasses, RadioGroup} from "@mui/joy";
import Sheet from "@mui/joy/Sheet";
import Typography from "@mui/joy/Typography";
import Table from "@mui/joy/Table";
import {AssetClasses, Commitment, Investor} from "../types.tsx";

type CommitmentsTableProps = {
  investor: Investor;
}

function CheckCircleRoundedIcon() {
  return null;
}

export default function CommitmentsTable({investor}: CommitmentsTableProps) {
  const [assetClassFilter, setAssetClassFilter] = useState<AssetClasses | string>("All");
  const commitments = useMemo(() => {
    if (assetClassFilter === "All") {
      return investor.commitments;
    }
    return investor.commitments.filter((commitment) => commitment.asset_class === assetClassFilter);
  }, [assetClassFilter, investor.commitments]);

  const convertToMillions = (num: number) => {
  //  return billions if the number is greater than 1 billion
    if (num >= 1000000000) {
      return `£${(num / 1000000000).toFixed(2)}B`;
    }
    return `£${(num / 1000000).toFixed(0)}M`;
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAssetClassFilter(event.target.value as AssetClasses);
  };

  const calculateTotalCommitments = (commitments: Commitment[], assetClass: AssetClasses) => {
    return commitments.filter((commitment) => commitment.asset_class === assetClass)
      .reduce((acc, commitment) => acc + commitment.amount, 0);
  };

  const totalCommitmentsByAssetClass = {
    "Private Equity": calculateTotalCommitments(investor.commitments, AssetClasses.PRIVATE_EQUITY),
    "Natural Resources": calculateTotalCommitments(investor.commitments, AssetClasses.NATURAL_RESOURCES),
    "Real Estate": calculateTotalCommitments(investor.commitments, AssetClasses.REAL_ESTATE),
    "Infrastructure": calculateTotalCommitments(investor.commitments, AssetClasses.INFRASTRUCTURE),
    "Hedge Funds": calculateTotalCommitments(investor.commitments, AssetClasses.HEDGE_FUNDS),
    "Private Debt": calculateTotalCommitments(investor.commitments, AssetClasses.PRIVATE_DEBT),
  }

  const renderFilters = () => (
    <React.Fragment>
      <RadioGroup
        aria-label="asset-class-filter"
        defaultValue="All"
        overlay
        name="asset-class-filter"
        sx={{
          flexDirection: 'row',
          gap: 2,
          [`& .${radioClasses.checked}`]: {
            [`& .${radioClasses.action}`]: {
              inset: -1,
              border: '3px solid',
              borderColor: 'primary.500',
            },
          },
          [`& .${radioClasses.radio}`]: {
            display: 'contents',
            '& > svg': {
              zIndex: 2,
              position: 'absolute',
              top: '-8px',
              right: '-8px',
              bgcolor: 'background.surface',
              borderRadius: '50%',
            },
          },
        }}
      >
        <Sheet
          key="All"
          variant="outlined"
          sx={{
            borderRadius: 'md',
            boxShadow: 'sm',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 1.5,
            p: 2,
            minWidth: 120,
          }}
        >
          <Radio id="All" value="All" checkedIcon={<CheckCircleRoundedIcon />} onChange={handleChange} />
          <FormLabel htmlFor="All">All</FormLabel>
          <Typography level="body-xs">{convertToMillions(investor.total_commitment)}</Typography>
        </Sheet>
        {Object.entries(totalCommitmentsByAssetClass).map(([assetClass, total]) => (
          <Sheet
            key={assetClass}
            variant="outlined"
            sx={{
              borderRadius: 'md',

              boxShadow: 'sm',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 1.5,
              p: 2,
              minWidth: 120,
            }}
          >
            <Radio id={assetClass} value={assetClass} checkedIcon={<CheckCircleRoundedIcon />} onChange={handleChange}/>
            <FormLabel htmlFor={assetClass}>{assetClass}</FormLabel>
            <Typography level="body-xs">{convertToMillions(total)}</Typography>
          </Sheet>
        ))}
      </RadioGroup>
    </React.Fragment>
  );
  return (
    <React.Fragment>
      <Box
        className="SearchAndFilters-tabletUp"
        sx={{
          borderRadius: 'sm',
          py: 2,
          display: { xs: 'none', sm: 'flex' },
          flexWrap: 'wrap',
          gap: 1.5,
          '& > *': {
            minWidth: { xs: '120px', md: '160px' },
          },
        }}
      >
        {renderFilters()}
      </Box>
      <Sheet
        className="CommitmentTableContainer"
        variant="outlined"
        sx={{
          display: { xs: 'none', sm: 'initial' },
          width: '100%',
          borderRadius: 'sm',
          flexShrink: 1,
          overflow: 'auto',
          minHeight: 0,
        }}
      >
        <Table
          aria-labelledby="tableTitle"
          stickyHeader
          hoverRow
          sx={{
            '--TableCell-headBackground': 'var(--joy-palette-background-level1)',
            '--Table-headerUnderlineThickness': '1px',
            '--TableRow-hoverBackground': 'var(--joy-palette-background-level1)',
            '--TableCell-paddingY': '4px',
            '--TableCell-paddingX': '8px',
          }}
        >
          <thead>
          <tr>
            <th style={{ width: 48, padding: '12px 6px' }}>Id</th>
            <th style={{ width: 120, padding: '12px 6px' }}>
                Asset Class
            </th>
            <th style={{ width: 140, padding: '12px 6px' }}>Currency</th>
            <th style={{ width: 140, padding: '12px 6px' }}>Amount</th>
          </tr>
          </thead>
          <tbody>
          {commitments.map((row: Commitment) => (
            <tr key={row.id} data-testid="commitment-row">
              <td>
                <Typography level="body-xs">{row.id}</Typography>
              </td>
              <td>
                <Typography level="body-xs">{row.asset_class}</Typography>
              </td>
              <td>
                <Typography level="body-xs">{row.currency}</Typography>
              </td>
              <td>
                <Typography level="body-xs">{convertToMillions(row.amount)}</Typography>
              </td>
            </tr>
          ))}
          </tbody>
        </Table>
      </Sheet>
    </React.Fragment>
  );
}