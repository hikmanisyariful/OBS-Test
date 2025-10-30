import { Box, Typography, Stack, Button } from "@mui/material";
import ImageProfile from "./ImageProfile";
import { useForm, FormProvider } from "react-hook-form";
import RHFTextField from "../hooks/RHFTextField";

type FormValues = {
  name: string;
  username: string;
  email: string;
  phone?: string;
  address?: string;
  website?: string;
  company: string;
};

export default function Container() {
  const methods = useForm<FormValues>({
    mode: "onSubmit",
    defaultValues: {
      name: "",
      username: "",
      email: "",
      phone: "",
      address: "",
      website: "",
      company: "",
    },
  });

  const { handleSubmit, reset } = methods;

  const onSubmit = (data: FormValues) => {
    console.log({ ...data });
    alert("Submitted! Cek console untuk payload.");
    // reset(); // aktifkan bila mau reset form setelah submit
  };

  return (
    <FormProvider {...methods}>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        p={3}
        sx={{ width: "70%" }}
        display="flex"
        flexDirection="column"
        gap={3}
      >
        <Typography variant="h5" gutterBottom>
          User Form
        </Typography>

        <ImageProfile avatarUrl="" onReset={() => {}} onChange={() => {}} />

        <Box display="flex" flexDirection="column" gap={2}>
          {/* Row 1 */}
          <Box display="flex" gap={2} flexWrap="wrap">
            <Box flex={1} minWidth="250px">
              <RHFTextField id="name" name="name" label="Name" requiredMessage />
            </Box>
            <Box flex={1} minWidth="250px">
              <RHFTextField id="username" name="username" label="Username" requiredMessage />
            </Box>
          </Box>

          {/* Row 2 */}
          <Box display="flex" gap={2} flexWrap="wrap">
            <Box flex={1} minWidth="250px">
              <RHFTextField id="email" name="email" label="Email" type="email" requiredMessage />
            </Box>
            <Box flex={1} minWidth="250px">
              <RHFTextField
                id="phone"
                name="phone"
                label="Phone Number"
                type="tel"
                requiredMessage
              />
            </Box>
          </Box>

          {/* Row 3–5 full width */}
          <RHFTextField id="address" name="address" label="Address" />
          <RHFTextField id="website" name="website" label="Website" />
          <RHFTextField id="company" name="company" label="Company" requiredMessage />
        </Box>

        <Stack direction="row" spacing={2} justifyContent="flex-end">
          <Button type="button" variant="outlined" onClick={() => reset()}>
            Reset
          </Button>
          <Button data-testid="submit-user-form" type="submit" variant="contained">
            Submit
          </Button>
        </Stack>
      </Box>
    </FormProvider>
  );
}
