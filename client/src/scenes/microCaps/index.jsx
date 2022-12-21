import { Box } from "@mui/material";
import Navbar from "scenes/navbar";
import RawDataPage from "./RawData/RawDataPage";
import ResearchPage from "./Research/ResearchPage";
import PortfolioTable from "./PortfolioTracker/PortfolioTable";

const MicroCaps = () => {
  return (
    <Box>
      <Navbar />
      <PortfolioTable />
    </Box>
  );
};

export default MicroCaps;
