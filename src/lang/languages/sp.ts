export const spanishTranslations = {
  errors: {
    unauthorized: "No autorizado",
    unauthorized_details: "No autorizado: {0}",
    unauthorized_rolemismatch: "Rol incorrecto",
    internal_server_error: "Error interno del servidor",
    bad_request: "Solicitud Incorrecta",
    bad_request_details: "Solicitud Incorrecta: {0}",
    no_token_provided: "No se proporcionó un token",
    invalid_expired_token: "Token inválido o expirado",

    prisma: {
      duplicate_entry: {
        message: "Entrada duplicada para {0}.",
        details: "El valor proporcionado para {0} ya existe.",
      },
      database_error: "Error de base de datos",
      field_fallback: "campo(s)",
      record_not_found: {
        message: "El registro solicitado no fue encontrado.",
        details:
          "No se pudo encontrar el registro para la operación. Es posible que haya sido eliminado o el ID es incorrecto.",
      },
      invalid_input: {
        message: "Error de validación en los datos de entrada.",
      },
      foreign_key_constraint: {
        message: "Error de restricción de clave foránea.",
        details:
          "No se puede realizar la operación debido a una relación dependiente. Asegúrate de que los registros relacionados existan o se manejen correctamente.",
      },
      relation_violation: {
        message: "Violación de relación.",
        details:
          "La operación que intentas realizar violaría una relación requerida entre los registros.",
      },
      database_connection_error: {
        message: "Error de conexión con la base de datos.",
        details:
          "No se pudo establecer conexión con la base de datos. Por favor, inténtelo de nuevo más tarde o contacte al soporte.",
      },
    },

    zod: {
      validation_failed: "Validación Fallida",
    },

    conflict: "Conflicto",
    conflict_details: "Conflicto: {0}",

    validation: {
      incorrect_password: "Contraseña incorrecta",
      user_not_found: "Usuario no encontrado",
      super_user_exists:
        "Ya existe un administrador. No se puede crear otro super usuario.",
      username: {
        min: "El nombre de usuario debe tener al menos {0} caracteres.",
        max: "El nombre de usuario no puede exceder los {0} caracteres.",
        regex:
          "El nombre de usuario solo puede contener letras, números y guiones bajos.",
      },
      password: {
        min: "La contraseña debe tener al menos {0} caracteres.",
        max: "La contraseña no puede exceder los {0} caracteres.",
        uppercase: "La contraseña debe contener al menos una letra mayúscula.",
        lowercase: "La contraseña debe contener al menos una letra minúscula.",
        number: "La contraseña debe contener al menos un número.",
        specialChar:
          "La contraseña debe contener al menos un carácter especial (por ejemplo: !@#$%^&*).",
      },
      name: {
        empty: "El nombre no puede estar vacío.",
        min: "El nombre no puede estar vacío.",
        max: "El nombre no puede exceder los {0} caracteres.",
      },
      fullname: {
        empty: "El nombre completo no puede estar vacío.",
        max: "El nombre completo no puede exceder los {0} caracteres.",
      },
      document: {
        min: "El documento debe tener al menos {0} caracteres.",
        max: "El documento no puede exceder los {0} caracteres.",
      },
      phoneNumber: {
        min: "El número de teléfono debe tener al menos {0} dígitos.",
        max: "El número de teléfono no puede exceder los {0} dígitos.",
      },
      email: {
        invalid: "Formato de correo electrónico inválido.",
      },
      birthday: {
        invalid: "Fecha de nacimiento inválida.",
      },
      section: {
        max: "La sección no puede exceder los {0} caracteres.",
      },
      description: {
        max: "La descripción no puede exceder los {0} caracteres.",
      },
      maxLevel: {
        invalid: "El nivel máximo debe ser un número entero.",
        positive: "El nivel máximo debe ser mayor que cero.",
      },
      fee: {
        nonnegative: "La tarifa debe ser un número positivo o cero.",
      },
      no_data: "No se proporcionó ningún dato para realizar una actualización.",
    },

    auth: {
      the_user_does_not_exist: "El usuario no existe",
    },

    invalid_session: "Sesión inválida",
    already_logged_in:
      "El usuario ya tiene una sesión activa en este mismo equipo",
    not_logged_in: "El usuario no tiene una sesión iniciada",
    cannot_close_self_session:
      "No puedes cerrar la sesión activa. Si deseas cerrar sesión, utiliza el botón 'Cerrar sesión'.",
  },

  server: {
    listening: "Servidor escuchando peticiones en el puerto {0}",
  },
};
