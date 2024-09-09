"use client";
import {
  FormProvider,
  RHFSelect,
  RHFSwitch,
  RHFTextField,
} from "@/components/hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { Card, Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
//import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

const SESSION_OPTION = ["", "Fall", "Spring", "Summer"];
const DESTINATION_OPTION = ["", "USA", "Canada", "UK", "Australia"];
const FEES_OPTION = [
  { label: "", value: "" },
  { label: "Below $10,000", value: "10000" },
  { label: "$10,000 - $20,000", value: "20000" },
  { label: "$20,000 - $30,000", value: "30000" },
  { label: "Above $30,000", value: "30001" },
];

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

export default function UniversitySearch({ isEdit, currentFilters }) {
  //const { push } = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const SearchFilterSchema = Yup.object().shape({
    name: Yup.string().required("Institution or Program Name is required"),
    destination: Yup.string().required("Destination is required"),
    fees: Yup.string().required("Fees range is required"),
    session: Yup.string().required("Session is required"),
  });

  const defaultValues = useMemo(
    () => ({
      name: currentFilters?.name || "",
      destination: currentFilters?.destination || "",
      fees: currentFilters?.fees || "",
      session: currentFilters?.session || SESSION_OPTION[0],
    }),
    [currentFilters]
  );

  const methods = useForm({
    resolver: yupResolver(SearchFilterSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    setValue,
    getValues,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  useEffect(() => {
    if (isEdit && currentFilters) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
  }, [isEdit, currentFilters]);

  const onSubmit = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      enqueueSnackbar(!isEdit ? "Search initiated!" : "Filters updated!");
      // Push to results page or handle search logic
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Card sx={{ p: 3 }}>
        <Stack spacing={3}>
          <RHFTextField
            id="name"
            name="name"
            label="Institution or Program Name"
          />

          <RHFSelect name="destination" label="Destination">
            {DESTINATION_OPTION.map((destination) => (
              <option key={destination} value={destination}>
                {destination}
              </option>
            ))}
          </RHFSelect>

          <RHFSelect name="fees" label="Fees Range">
            {FEES_OPTION.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </RHFSelect>

          <RHFSelect name="session" label="Session">
            {SESSION_OPTION.map((session) => (
              <option key={session} value={session}>
                {session}
              </option>
            ))}
          </RHFSelect>
        </Stack>
      </Card>

      <Stack spacing={3}>
        <Card sx={{ p: 3 }}>
          <RHFSwitch name="includeScholarships" label="Include Scholarships" />
          <RHFSwitch
            name="includeAccommodation"
            label="Include Accommodation"
          />
        </Card>

        <LoadingButton
          type="submit"
          variant="contained"
          size="large"
          loading={isSubmitting}
        >
          {!isEdit ? "Search" : "Update Filters"}
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
