export enum Role {
  SAdmin = "sadmin",
  Admin = "admin",
  Cajero = "cajero",
  Mesero = "mesero",
  Cocinero = "cocinero",
}

export const roles = [
  // {
  //   value: Role.SAdmin,
  //   label: "Super Administrador",
  //   description: "Tiene acceso a todas las funcionalidades",
  // },
  {
    value: Role.Admin,
    label: "Administrador",
    description: "Tiene acceso a todas las funcionalidades",
  },
  {
    value: Role.Cajero,
    label: "Cajero",
    description: "Tiene acceso a caja y ventas",
  },
  {
    value: Role.Mesero,
    label: "Mesero",
    description: "Tiene acceso a mesas y pedidos",
  },
  {
    value: Role.Cocinero,
    label: "Cocinero",
    description: "Tiene acceso a la cocina y pedidos",
  },
];
