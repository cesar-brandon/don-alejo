"use client";

import { z } from "zod";

export const ProfileValidator = z
  .object({
    id: z.string().optional(), // Solo en actualizaciones
    first_name: z.string().nonempty({ message: "El nombre es requerido" }),
    last_name: z.string().nonempty({ message: "El apellido es requerido" }),
    role: z.string().nonempty({ message: "El rol es requerido" }),
    email: z.string().email({ message: "El email no es válido" }),
    password: z
      .string()
      .optional() // Permite que no se incluya en la edición
      .transform((val) => (val === "" ? undefined : val)) // Si es vacío, lo transforma en undefined
      .refine((val) => !val || val.length >= 6, {
        message: "La contraseña debe tener al menos 6 caracteres",
      }),
  })
  .superRefine((data, ctx) => {
    // Si no hay `id`, significa que es un registro nuevo y la contraseña es obligatoria
    if (!data.id && !data.password) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["password"],
        message: "La contraseña es requerida al registrar un usuario",
      });
    }
  });

export type ProfileRequest = z.infer<typeof ProfileValidator>;
