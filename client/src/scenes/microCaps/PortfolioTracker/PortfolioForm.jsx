import React from "react";
import { Box, TextField, useMediaQuery, useTheme } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";

const portfolioTokenSchema = yup.object().shape({
  tokenAddress: yup.string().required("required"),
  tokenSymbol: yup.string().uppercase().required("required"),
  tokenName: yup.string().required("required"),
  buyAmount: yup.number().required("required"),
  buyPriceUSD: yup.number().required("required"),
  buyFeeUSD: yup.number().required("required"),
});

const initialValues = {
  tokenAddress: "",
  tokenSymbol: "",
  tokenName: "",
  buyAmount: "",
  buyPriceUSD: "",
  buyFeeUSD: "",
  buyTaxPct: "",
  sellTaxPct: "",
};

const PortfolioForm = (props) => {
  const { palette } = useTheme();
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const SubmitButton = () => props.submitButton;

  const handleFormSubmit = async (values, onSubmitProps) => {
    await props.crudFunction(values);
    onSubmitProps.resetForm();
    props.closeModal();
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={props.formValues ? props.formValues : initialValues}
      validationSchema={portfolioTokenSchema}
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
              label="Token Address"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.tokenAddress}
              name="tokenAddress"
              error={
                Boolean(touched.tokenAddress) && Boolean(errors.tokenAddress)
              }
              helperText={touched.tokenAddress && errors.tokenAddress}
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              label="Token Symbol"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.tokenSymbol}
              name="tokenSymbol"
              error={
                Boolean(touched.tokenSymbol) && Boolean(errors.tokenSymbol)
              }
              helperText={touched.tokenSymbol && errors.tokenSymbol}
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              label="Token Name"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.tokenName}
              name="tokenName"
              error={Boolean(touched.tokenName) && Boolean(errors.tokenName)}
              helperText={touched.tokenName && errors.tokenName}
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              label="Buy Amount"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.buyAmount}
              name="buyAmount"
              error={Boolean(touched.buyAmount) && Boolean(errors.buyAmount)}
              helperText={touched.buyAmount && errors.buyAmount}
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              label="Buy Price USD"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.buyPriceUSD}
              name="buyPriceUSD"
              error={
                Boolean(touched.buyPriceUSD) && Boolean(errors.buyPriceUSD)
              }
              helperText={touched.buyPriceUSD && errors.buyPriceUSD}
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              label="Buy Fee USD"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.buyFeeUSD}
              name="buyFeeUSD"
              error={Boolean(touched.buyFeeUSD) && Boolean(errors.buyFeeUSD)}
              helperText={touched.buyFeeUSD && errors.buyFeeUSD}
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
          </Box>
          <Box>
            <SubmitButton />
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default PortfolioForm;
