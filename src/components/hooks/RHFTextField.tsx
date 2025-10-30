/* eslint-disable @typescript-eslint/no-explicit-any */
import { TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

const baseSx = {
  "& .MuiOutlinedInput-root": { borderRadius: "12px" },
  "& .MuiInputLabel-root": { fontSize: "0.875rem" },
  "& input": { fontSize: "0.95rem", backgroundColor: "white" },
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Validasi telp: terima E.164 (+62...), atau lokal ID (08...) dengan panjang wajar
const isValidPhone = (raw: string) => {
  const v = raw.replace(/[^\d+]/g, ""); // buang spasi/dash, simpan + kalau ada
  const e164 = /^\+?[1-9]\d{7,14}$/; // 8–15 digit, opsi +
  const indo = /^(?:\+62|0)8\d{7,11}$/; // Indonesia: +62/0, lalu 8xxxxxxxx
  return e164.test(v) || indo.test(v);
};

type Props = {
  id?: string;
  name: string;
  label: string;
  type?: "text" | "email" | "tel" | "password";
  requiredMessage?: string | boolean; // true => pakai default msg
  rules?: any; // tambahan/override rules RHF
  sx?: any;
  textFieldProps?: Omit<
    React.ComponentProps<typeof TextField>,
    "name" | "label" | "type" | "error" | "helperText"
  >;
};

export default function RHFTextField({
  id,
  name,
  label,
  type = "text",
  requiredMessage = false,
  rules = {},
  sx,
  textFieldProps = {},
}: Props) {
  const { control } = useFormContext();

  // Default rules per type
  const defaultRules: any = {};

  if (requiredMessage) {
    defaultRules.required =
      typeof requiredMessage === "string" ? requiredMessage : `${label} is required`;
  }

  if (type === "email") {
    defaultRules.pattern = {
      value: emailRegex,
      message: "Invalid format for email",
    };
  }

  if (type === "tel") {
    defaultRules.validate = (val: string) =>
      !val ||
      isValidPhone(val) ||
      "Invalid format for phone number (e.g. 08123456789 or +628123456789)";
  }

  // Gabungkan default rules + custom rules
  const mergedRules =
    typeof rules === "function" ? rules(defaultRules) : { ...defaultRules, ...rules };

  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      rules={mergedRules}
      render={({ field, fieldState }) => {
        const { onChange, value, ...restField } = field;

        // Normalisasi input telp: hapus spasi & dash saat mengetik (biar clean)
        const handleChange =
          type === "tel"
            ? (e: React.ChangeEvent<HTMLInputElement>) => {
                const raw = e.target.value;
                const normalized = raw
                  .replace(/(?!^\+)[^\d]/g, "") // buang semua non-digit kecuali leading '+'
                  .replace(/^(\+\+)+/, "+"); // sanitasi kelebihan '+'
                onChange(normalized);
              }
            : onChange;

        return (
          <TextField
            {...restField}
            data-testid={id}
            id={id}
            value={value ?? ""}
            onChange={handleChange}
            label={label}
            type={type === "tel" ? "text" : type} // gunakan text agar mask tidak konflik, inputMode di bawah
            fullWidth
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
            sx={{ ...baseSx, ...sx }}
            size="small"
            variant="outlined"
            autoComplete={type === "email" ? "email" : type === "tel" ? "tel" : "on"}
            slotProps={{
              input: {
                autoComplete: type === "email" ? "email" : type === "tel" ? "tel" : "on",
              },
            }}
            {...textFieldProps}
          />
        );
      }}
    />
  );
}
