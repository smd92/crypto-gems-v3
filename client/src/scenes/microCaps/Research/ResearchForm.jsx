import React from "react";
import { Box, TextField, useMediaQuery, useTheme } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";

const researchSchema = yup.object().shape({
  dexToolsURL: yup.string().url().required("required"),
  symbol: yup.string().uppercase().required("required"),
  name: yup.string().required("required"),
  tokenAdress: yup.string().required("required"),
  marketCapUSD: yup.number().min(0).required("required"),
  buyTaxPct: yup.number().min(0).max(100).required("required"),
  sellTaxPct: yup.number().min(0).max(100).required("required"),
  dextScore: yup.number().min(0).max(99).integer().required("required"),
  tokenSnifferScore: yup
    .number()
    .min(0)
    .max(100)
    .integer()
    .required("required"),
  ownershipRenounced: yup.boolean().required("required"),
  liqLockedPct: yup.number().min(0).max(100).required("required"),
  numberOfHolders: yup.number().positive().required("required"),
  numberOfWhales: yup.number().positive().required("required"),
  isBuy: yup.boolean().required("required"),
  notes: yup.string().required("required"),
});

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
};

const ResearchForm = (props) => {
  const { palette } = useTheme();
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const SubmitButton = () => props.submitButton;

  const handleFormSubmit = async (values, onSubmitProps) => {
   await props.callOnSubmit(values);
   onSubmitProps.resetForm();
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={initialValues}
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
            <TextField
              label="DEXTools URL"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.dexToolsURL}
              name="dexToolsURL"
              error={
                Boolean(touched.dexToolsURL) && Boolean(errors.dexToolsURL)
              }
              helperText={touched.dexToolsURL && errors.dexToolsURL}
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              label="Symbol"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.symbol}
              name="symbol"
              error={Boolean(touched.symbol) && Boolean(errors.symbol)}
              helperText={touched.symbol && errors.symbol}
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              label="Name"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.name}
              name="name"
              error={Boolean(touched.name) && Boolean(errors.name)}
              helperText={touched.name && errors.name}
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              label="Token Address"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.tokenAdress}
              name="tokenAdress"
              error={
                Boolean(touched.tokenAdress) && Boolean(errors.tokenAdress)
              }
              helperText={touched.tokenAdress && errors.tokenAdress}
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              label="Marketcap USD"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.marketCapUSD}
              name="marketCapUSD"
              error={
                Boolean(touched.marketCapUSD) && Boolean(errors.marketCapUSD)
              }
              helperText={touched.marketCapUSD && errors.marketCapUSD}
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              label="Buy Tax %"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.buyTaxPct}
              name="buyTaxPct"
              error={Boolean(touched.buyTaxPct) && Boolean(errors.buyTaxPct)}
              helperText={touched.buyTaxPct && errors.buyTaxPct}
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              label="Sell Tax %"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.sellTaxPct}
              name="sellTaxPct"
              error={Boolean(touched.sellTaxPct) && Boolean(errors.sellTaxPct)}
              helperText={touched.sellTaxPct && errors.sellTaxPct}
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              label="DEXTScore"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.dextScore}
              name="dextScore"
              error={Boolean(touched.dextScore) && Boolean(errors.dextScore)}
              helperText={touched.dextScore && errors.dextScore}
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              label="Tokensniffer Score"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.tokenSnifferScore}
              name="tokenSnifferScore"
              error={
                Boolean(touched.tokenSnifferScore) &&
                Boolean(errors.tokenSnifferScore)
              }
              helperText={touched.tokenSnifferScore && errors.tokenSnifferScore}
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              label="Ownership renounced?"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.ownershipRenounced}
              name="ownershipRenounced"
              error={
                Boolean(touched.ownershipRenounced) &&
                Boolean(errors.ownershipRenounced)
              }
              helperText={
                touched.ownershipRenounced && errors.ownershipRenounced
              }
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              label="Liq locked %"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.liqLockedPct}
              name="liqLockedPct"
              error={
                Boolean(touched.liqLockedPct) && Boolean(errors.liqLockedPct)
              }
              helperText={touched.liqLockedPct && errors.liqLockedPct}
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              label="Number of Holders"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.numberOfHolders}
              name="numberOfHolders"
              error={
                Boolean(touched.numberOfHolders) &&
                Boolean(errors.numberOfHolders)
              }
              helperText={touched.numberOfHolders && errors.numberOfHolders}
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              label="Number of Whales"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.numberOfWhales}
              name="numberOfWhales"
              error={
                Boolean(touched.numberOfWhales) &&
                Boolean(errors.numberOfWhales)
              }
              helperText={touched.numberOfWhales && errors.numberOfWhales}
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              label="Buy?"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.isBuy}
              name="isBuy"
              error={Boolean(touched.isBuy) && Boolean(errors.isBuy)}
              helperText={touched.isBuy && errors.isBuy}
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              label="Notes"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.notes}
              name="notes"
              error={Boolean(touched.notes) && Boolean(errors.notes)}
              helperText={touched.notes && errors.notes}
              sx={{ gridColumn: "span 2" }}
            />
          </Box>
          <Box>
            <SubmitButton />
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default ResearchForm;
