import {Box, Breadcrumbs, Link} from "@mui/joy";
import Header from "../components/Header.tsx";
import Sidebar from "../components/Sidebar.tsx";
import {ChevronRightRounded} from "@mui/icons-material";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import Typography from "@mui/joy/Typography";
import InvestorTable from "../components/InvestorTable/components/InvestorTable.tsx";
import {useState} from "react";
import CommitmentsTable from "../components/CommitmentsTable/CommitmentsTable.tsx";
import {Investor} from "../components/types.tsx";

export default function DashboardPage() {
  const [investor, setInvestor] = useState<Investor | null>(null);
  return (
    <Box sx={{ display: 'flex', minHeight: '100dvh' }}>
      <Header />
      <Sidebar />
      <Box
        component="main"
        className="MainContent"
        sx={{
          px: { xs: 2, md: 6 },
          pt: {
            xs: 'calc(12px + var(--Header-height))',
            sm: 'calc(12px + var(--Header-height))',
            md: 3,
          },
          pb: { xs: 2, sm: 2, md: 3 },
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minWidth: 0,
          height: '100dvh',
          gap: 1,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Breadcrumbs
            size="sm"
            aria-label="breadcrumbs"
            separator={<ChevronRightRounded fontSize="small" />}
            sx={{ pl: 0 }}
          >
            <Link
              underline="none"
              color="neutral"
              href="#some-link"
              aria-label="Home"
            >
              <HomeRoundedIcon />
            </Link>
            <Link
              underline="hover"
              color="neutral"
              onClick={() => setInvestor(null)}
              sx={{ fontSize: 12, fontWeight: 500 }}
            >
              Investors
            </Link>
            {investor && (
              <Link
                underline="hover"
                color="neutral"
                disabled
                sx={{ fontSize: 12, fontWeight: 500 }}
              >
                {investor.name}
              </Link>
            )}
          </Breadcrumbs>
        </Box>
        <Box
          sx={{
            display: 'flex',
            mb: 1,
            gap: 1,
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: { xs: 'start', sm: 'center' },
            flexWrap: 'wrap',
            justifyContent: 'space-between',
          }}
        >
          <Typography level="h2" component="h1">
            {investor ? investor.name : "Investors"}
          </Typography>
        </Box>
        {investor ? (
          <CommitmentsTable investor={investor} />
          ) : (
        <InvestorTable setInvestor={setInvestor} />
        )}
      </Box>
    </Box>
  );
}