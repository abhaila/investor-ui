import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import {CssBaseline, CssVarsProvider} from "@mui/joy";

export const REACT_APP_API_URL = "http://127.0.0.1:8000"

function AppRoutes() {
  const queryClient = new QueryClient()
  return (
    <CssVarsProvider disableTransitionOnChange>
      <CssBaseline/>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/" element={<DashboardPage/>}/>
        </Routes>
      </QueryClientProvider>
    </CssVarsProvider>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes/>
    </BrowserRouter>
  )
}

export default App
