import * as React from 'react';
import {useState} from 'react';
import Link from '@mui/joy/Link';

import Table from '@mui/joy/Table';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import {useGetInvestors} from "../hooks/useGetInvestors.tsx";
import {Box} from "@mui/joy";
import {Investor} from "../../types.tsx";

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string },
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

type InvestorTableProps = {
  setInvestor: (investor: Investor) => void;
}

export default function InvestorTable({setInvestor} : InvestorTableProps) {
  const [order, setOrder] = useState<Order>('desc');
  const investors = useGetInvestors().data;

  const convertToUpperCase = (str: string) => {
    return str[0].toUpperCase() + str.slice(1);
  };

  const convertToBillions = (num: number) => {
    return `£${(num / 1000000000).toFixed(2)}B`;
  };

  return (
    <React.Fragment>
      <Sheet
        className="OrderTableContainer"
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
            <th style={{width: 40, padding: '12px 6px'}}>Id</th>
            <th style={{width: 120, padding: '12px 6px'}}>
              <Link
                underline="none"
                color="primary"
                component="button"
                onClick={() => setOrder(order === 'asc' ? 'desc' : 'asc')}
                endDecorator={<ArrowDropDownIcon/>}
                sx={[
                  {
                    fontWeight: 'lg',
                    '& svg': {
                      transition: '0.2s',
                      transform:
                        order === 'desc' ? 'rotate(0deg)' : 'rotate(180deg)',
                    },
                  },
                  order === 'desc'
                    ? {'& svg': {transform: 'rotate(0deg)'}}
                    : {'& svg': {transform: 'rotate(180deg)'}},
                ]}
              >
                Name
              </Link>
            </th>
            <th style={{width: 140, padding: '12px 6px'}}>Type</th>
            <th style={{width: 140, padding: '12px 6px'}}>Date Added</th>
            <th style={{width: 140, padding: '12px 6px'}}>Country</th>
            <th style={{width: 140, padding: '12px 6px'}}>Total Commitment</th>
            <th style={{width: 40}} aria-label="empty"/>
          </tr>
          </thead>
          <tbody>
          {investors?.sort(getComparator(order, 'name')).map((row: Investor) => (
            <tr key={row.id}>
              <td>
                <Typography level="body-xs">{row.id}</Typography>
              </td>
              <td>
                <Typography level="body-xs">{row.name}</Typography>
              </td>
              <td>
                <Typography level="body-xs">{convertToUpperCase(row.type)}</Typography>
              </td>
              <td>
                <Typography level="body-xs">{row.date_added}</Typography>
              </td>
              <td>
                <Typography level="body-xs">{row.country}</Typography>
              </td>
              <td>
                <Typography level="body-xs">{convertToBillions(row.total_commitment)}</Typography>
              </td>
              <td>
                <Box sx={{display: 'flex', gap: 2, alignItems: 'center'}}>
                  <Link level="body-xs" component="button" onClick={() => setInvestor(row)}>
                    View
                  </Link>
                </Box>
              </td>
            </tr>
          ))}
          </tbody>
        </Table>
      </Sheet>
    </React.Fragment>
  );
}