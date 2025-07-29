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
   "errors.prisma.record_not_found.message": "El registro solicitado no fue encontrado.",
  "errors.prisma.record_not_found.details": "No se pudo encontrar el registro para la operación. Es posible que haya sido eliminado o el ID es incorrecto.",
  "errors.prisma.invalid_input.message": "Error de validación en los datos de entrada.",
  "errors.prisma.foreign_key_constraint.message": "Error de restricción de clave foránea.",
  "errors.prisma.foreign_key_constraint.details": "No se puede realizar la operación debido a una relación dependiente. Asegúrate de que los registros relacionados existan o se manejen correctamente.",
  "errors.prisma.relation_violation.message": "Violación de relación.",
  "errors.prisma.relation_violation.details": "La operación que intentas realizar violaría una relación requerida entre los registros.",
  "errors.prisma.database_connection_error.message": "Error de conexión con la base de datos.",
  "errors.prisma.database_connection_error.details": "No se pudo establecer conexión con la base de datos. Por favor, inténtelo de nuevo más tarde o contacte al soporte.",
  "errors.zod.validation_failed": "Validación Fallida",
  "errors.conflict": "Conflicto",
  "errors.conflict.details": "Conflicto: {0}",

  "errors.validation.incorrect_password": "Contraseña incorrecta",
  "errors.validation.user_not_found": "Usuario no encontrado",
  "errors.validation.super_user_exists":
    "Ya existe un administrador. No se puede crear otro super usuario.",

  "errors.invalid_session": "Sesión inválida",
  "errors.already_logged_in":
    "El usuario ya tiene una sesión activa en este mismo equipo",
  "errors.not_logged_in": "El usuario no tiene una sesión iniciada",
  "errors.cannot_close_self_session":
    "No puedes cerrar la sesión activa. Si deseas cerrar sesión, utiliza el botón 'Cerrar sesión'.",

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
  "errors.validation.fullname.empty":
    "El nombre completo no puede estar vacío.",
  "errors.validation.fullname.max":
    "El nombre completo no puede exceder los {0} caracteres.",

  "errors.validation.document.min":
    "El documento debe tener al menos {0} caracteres.",
  "errors.validation.document.max":
    "El documento no puede exceder los {0} caracteres.",

  "errors.validation.phoneNumber.min":
    "El número de teléfono debe tener al menos {0} dígitos.",
  "errors.validation.phoneNumber.max":
    "El número de teléfono no puede exceder los {0} dígitos.",

  "errors.validation.email.invalid": "Formato de correo electrónico inválido.",

  "errors.auth.the_user_does_not_exist": "El usuario no existe",
};
