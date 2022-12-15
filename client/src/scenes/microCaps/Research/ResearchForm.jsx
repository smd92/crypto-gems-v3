import React from 'react'
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";

const researchSchema = {

}

/*
const initialValues = {
  dexToolsURL: "",
  symbol: "",
  name: "",
  tokenAdress: "",
  marketCapUSD: "",
  buyTaxPct: "",
  sellTaxPct: "",
  dextScore: "",
  tokenSnifferScore: "",
  ownershipRenounced: "",
  liqLockedPct: "", //Was liquidity locked right after launch? This can imply team has a longer term vision and isn’t looking to rug liquidity right out of the gate
  numberOfHolders: "",
  numberOfWhales: "", //You generally want very few people holding over 1.5-2% of supply (1% rare) | Good devs often put a cap on how much a single wallet can hold to prevent someone from painting the charts
  isBuy: "",
  notes: "",
}; */

const ResearchForm = (props) => {
  const { palette } = useTheme();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={props.initialValues}
      validationSchema={researchSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
          </Box>
        </form>
      )}
    </Formik>
  )
}

export default ResearchForm;