export const englishTranslations: { [key: string]: string } = {
  "errors.unauthorized": "Unauthorized",
  "errors.unauthorized.details": "Unauthorized: {0}",
  "errors.unauthorized.rolemismatch": "Role mismatch",
  "errors.internal_server_error": "Internal Server Error",
  "errors.bad_request": "Bad Request",
  "errors.bad_request.details": "Bad Request: {0}",
  "errors.no_token_provided": "No token provided",
  "errors.invalid_expired_token": "Invalid or expired token",
  "errors.prisma.duplicate_entry.message": "Duplicate entry for {0}.",
  "errors.prisma.duplicate_entry.details":
    "The provided value for {0} already exists.",
  "errors.prisma.database_error": "Database error",
  "errors.prisma.field_fallback": "field(s)",
  "errors.zod.validation_failed": "Validation Failed",
  "errors.conflict": "Conflict",
  "errors.conflict.details": "Conflict: {0}",

  "errors.validation.incorrect_password": "Incorrect password",
  "errors.validation.user_not_found": "User not found",
  "errors.validation.super_user_exists":
    "An admin user already exists. Cannot create another initial admin.",

  "errors.invalid_session": "Invalid session",
  "errors.already_logged_in": "The user is already logged-in on this device",
  "errors.not_logged_in": "The user is not logged-in on this device",
  "errors.cannot_close_self_session":
    "You can't close your active session. Please use the logout button instead.",

  "server.listening": "Server listening on port {0}",

  "errors.validation.username.min":
    "Username must be at least {0} characters long.",
  "errors.validation.username.max": "Username cannot exceed {0} characters.",
  "errors.validation.username.regex":
    "Username can only contain letters, numbers, and underscores.",
  "errors.validation.password.min":
    "Password must be at least {0} characters long.",
  "errors.validation.password.max": "Password cannot exceed {0} characters.",
  "errors.validation.password.uppercase":
    "Password must contain at least one uppercase letter.",
  "errors.validation.password.lowercase":
    "Password must contain at least one lowercase letter.",
  "errors.validation.password.number":
    "Password must contain at least one number.",
  "errors.validation.password.specialChar":
    "Password must contain at least one special character (e.g., !@#$%^&*).",
  "errors.validation.name.empty": "Name cannot be empty.",
  "errors.validation.name.min": "Name cannot be empty.",
  "errors.validation.name.max": "Name cannot exceed {0} characters.",
  "errors.validation.fullname.empty": "Full name cannot be empty.",
  "errors.validation.fullname.max": "Full name cannot exceed {0} characters.",

  "errors.validation.document.min": "Document must be at least {0} characters.",
  "errors.validation.document.max": "Document cannot exceed {0} characters.",

  "errors.validation.phoneNumber.min":
    "Phone number must be at least {0} digits.",
  "errors.validation.phoneNumber.max": "Phone number cannot exceed {0} digits.",

  "errors.validation.email.invalid": "Invalid email format.",
};
