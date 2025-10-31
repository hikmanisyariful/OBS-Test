import { Box, Stack, Button, Typography } from "@mui/material";
import ImageProfile from "./ImageProfile";
import { useForm, FormProvider } from "react-hook-form";
import RHFTextField from "../hooks/RHFTextField";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useEffect, useMemo, useState } from "react";
import { addUser, updateUser } from "../../redux/reducers/users";
import { showAlert } from "../../redux/reducers/alert";

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
  const dispatch = useAppDispatch();
  const usersState = useAppSelector((state) => state.users);
  const userFormState = useAppSelector((state) => state.userForm);

  const [loading, setLoading] = useState(false);

  const methods = useForm<FormValues>({
    mode: "onChange",
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

  const { handleSubmit, reset, setValue } = methods;

  const onSubmit = async (data: FormValues) => {
    if (isEdit) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        dispatch(
          updateUser({
            id: detailUser!.id,
            name: data.name,
            username: data.username,
            email: data.email,
            phone: data.phone,
            website: data.website,
            address: { street: data.address },
            company: { name: data.company },
          })
        );
        dispatch(
          showAlert({ message: "User saved!", severity: "success", autoHideDuration: 3000 })
        );
        onClose?.();
      }, 1000);

      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      dispatch(
        addUser({
          id: newId,
          name: data.name,
          username: data.username,
          email: data.email,
          phone: data.phone,
          website: data.website,
          address: { street: data.address },
          company: { name: data.company },
        })
      );
      dispatch(
        showAlert({
          message: "User successfuly added!",
          severity: "success",
          autoHideDuration: 3000,
        })
      );
      onClose?.();
    }, 1000);
  };

  const newId = useMemo(() => {
    if (!usersState.userList.length) return 1;
    const lastId = Math.max(...usersState.userList.map((u) => Number(u.id)));
    return lastId + 1;
  }, [usersState.userList]);

  const detailUser = useMemo(() => {
    if (!isEdit) return;
    return usersState.userList?.find((user) => user.id === userFormState.editUserId);
  }, [userFormState.editUserId, usersState.userList, isEdit]);

  useEffect(() => {
    if (!isEdit) return;
    if (!detailUser) return;
    setValue("name", detailUser.name);
    setValue("username", detailUser.username);
    setValue("email", detailUser.email);
    setValue("phone", detailUser?.phone);
    setValue("address", detailUser?.address?.street);
    setValue("website", detailUser?.website);
    setValue("company", detailUser?.company?.name ?? "");
  }, [detailUser, setValue]);

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
          <ImageProfile id={detailUser?.id} newId={newId} />
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
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            data-testid="submit-user-form"
            type="submit"
            variant="contained"
            loading={loading}
            disabled={loading}
          >
            {isEdit ? "Save" : "Add"}
          </Button>
        </Stack>
      </Box>
    </FormProvider>
  );
}
