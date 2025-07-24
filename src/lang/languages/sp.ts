export const spanishTranslations: { [key: string]: string } = {
  "errors.unauthorized": "No autorizado",
  "errors.unauthorized.details": "No autorizado: {0}",
  "errors.unauthorized.rolemismatch": "Rol incorrecto",
  "errors.internal_server_error": "Error interno del servidor",
  "errors.bad_request": "Solicitud Incorrecta",
  "errors.bad_request.details": "Solicitud Incorrecta: {0}",
  "errors.no_token_provided": "No se proporcionó un token",
  "errors.invalid_expired_token": "Token inválido o expirado",
  "errors.prisma.duplicate_entry.message": "Entrada duplicada para {0}.",
  "errors.prisma.duplicate_entry.details":
    "El valor proporcionado para {0} ya existe.",
  "errors.prisma.database_error": "Error de base de datos",
  "errors.prisma.field_fallback": "campo(s)",

  "server.listening": "Servidor escuchando peticiones en el puerto {0}",

  "errors.validation.username.min":
    "El nombre de usuario debe tener al menos {0} caracteres.",
  "errors.validation.username.max":
    "El nombre de usuario no puede exceder los {0} caracteres.",
  "errors.validation.username.regex":
    "El nombre de usuario solo puede contener letras, números y guiones bajos.",
  "errors.validation.password.min":
    "La contraseña debe tener al menos {0} caracteres.",
  "errors.validation.password.max":
    "La contraseña no puede exceder los {0} caracteres.",
  "errors.validation.password.uppercase":
    "La contraseña debe contener al menos una letra mayúscula.",
  "errors.validation.password.lowercase":
    "La contraseña debe contener al menos una letra minúscula.",
  "errors.validation.password.number":
    "La contraseña debe contener al menos un número.",
  "errors.validation.password.specialChar":
    "La contraseña debe contener al menos un carácter especial (por ejemplo: !@#$%^&*).",
  "errors.validation.name.empty": "El nombre no puede estar vacío.",
  "errors.validation.name.min": "El nombre no puede estar vacío.",
  "errors.validation.name.max":
    "El nombre no puede exceder los {0} caracteres.",
};
