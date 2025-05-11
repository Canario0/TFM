export class CustomError extends Error {
  constructor(public code: string, message: string) {
    super(message);
  }
}

export const InternalError = {
  code: "INTERNAL",
  message: "Error interno",
};

export const UnauthorizedError = {
  code: "UNAUTHORIZED",
  message: "Credenciales incorrectas",
};
