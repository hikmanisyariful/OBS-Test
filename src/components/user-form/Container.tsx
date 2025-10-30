import { Box, Stack, Button, Typography } from "@mui/material";
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

export default function Container({
  isEdit = false,
  onClose,
}: {
  isEdit?: boolean;
  onClose?: () => void;
}) {
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
        sx={{ width: "100%" }}
        display="flex"
        flexDirection="column"
        gap={3}
      >
        <div className="w-full flex justify-center">
          <Typography variant="h5" gutterBottom>
            {isEdit ? "Edit User profile" : "Add New User"}
          </Typography>
        </div>

        <div className="w-full flex justify-center">
          <ImageProfile avatarUrl="" onReset={() => {}} onChange={() => {}} />
        </div>

        <Box display="flex" flexDirection="column" gap={2}>
          <Box
            display="flex"
            gap={2}
            flexWrap="wrap"
            sx={{
              "& > div": {
                flex: {
                  xs: "1 1 100%",
                  sm: "1 1 48%",
                },
                minWidth: { xs: "100%", sm: "260px" },
              },
            }}
          >
            <Box flex={1}>
              <RHFTextField id="name" name="name" label="Name" requiredMessage />
            </Box>
            <Box flex={1}>
              <RHFTextField id="username" name="username" label="Username" requiredMessage />
            </Box>
          </Box>

          <Box
            display="flex"
            gap={2}
            flexWrap="wrap"
            sx={{
              "& > div": {
                flex: {
                  xs: "1 1 100%",
                  sm: "1 1 48%",
                },
                minWidth: { xs: "100%", sm: "260px" },
              },
            }}
          >
            <Box flex={1}>
              <RHFTextField id="email" name="email" label="Email" type="email" requiredMessage />
            </Box>
            <Box flex={1}>
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

        <Stack direction="row" spacing={2} justifyContent="flex-end" mt={3}>
          <Button
            type="button"
            variant="outlined"
            onClick={() => {
              reset();
              onClose?.();
            }}
          >
            Cancel
          </Button>
          <Button data-testid="submit-user-form" type="submit" variant="contained">
            {isEdit ? "Save" : "Add"}
          </Button>
        </Stack>
      </Box>
    </FormProvider>
  );
}
