// form
import { Controller, useFormContext } from "react-hook-form";
// @mui
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormHelperText,
} from "@mui/material";

// ----------------------------------------------------------------------

export function RHFCheckbox({ name, label, error, helperText, ...other }) {
  const { control } = useFormContext();

  return (
    <div>
      <FormControlLabel
        control={
          <Controller
            name={name}
            control={control}
            render={({ field }) => (
              <Checkbox {...field} checked={field.value} />
            )}
          />
        }
        label={label}
        {...other}
      />
      {error && <FormHelperText error>{helperText}</FormHelperText>}
    </div>
  );
}

// ----------------------------------------------------------------------

export function RHFMultiCheckbox({ name, options, ...other }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        const onSelected = (option) =>
          field.value.includes(option)
            ? field.value.filter((value) => value !== option)
            : [...field.value, option];

        return (
          <FormGroup>
            {options.map((option) => (
              <FormControlLabel
                key={option}
                control={
                  <Checkbox
                    checked={field.value.includes(option)}
                    onChange={() => field.onChange(onSelected(option))}
                  />
                }
                label={option}
                {...other}
              />
            ))}
          </FormGroup>
        );
      }}
    />
  );
}
