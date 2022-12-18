import { Box } from "@mui/material";
import Navbar from "scenes/navbar";
import RawDataPage from "./RawData/RawDataPage";
import ResearchPage from "./Research/ResearchPage";

const MicroCaps = () => {
  return (
    <Box>
      <Navbar />
      <RawDataPage />
    </Box>
  );
};

export default MicroCaps;
