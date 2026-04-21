const logger = require("./logger");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "music_library_secret_key_2026";

const requestLogger = (request, response, next) => {
  logger.info("Method:", request.method);
  logger.info("Path:  ", request.path);
  logger.info("Body:  ", request.body);
  logger.info("---");
  next();
};

const authenticateToken = (request, response, next) => {
  const authorization = request.get("authorization");
  if (!authorization || !authorization.toLowerCase().startsWith("bearer ")) {
    return response.status(401).json({ error: "Токен не надано" });
  }

  const token = authorization.substring(7);
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    request.user = { id: decoded.id, email: decoded.email, role: decoded.role };
    next();
  } catch {
    return response.status(401).json({ error: "Невірний або прострочений токен" });
  }
};

const requireRole = (...roles) => {
  return (request, response, next) => {
    if (!request.user) {
      return response.status(401).json({ error: "Не авторизовано" });
    }
    if (!roles.includes(request.user.role)) {
      return response.status(403).json({ error: "Доступ заборонено" });
    }
    next();
  };
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, request, response, next) => {
  logger.error(error.message);

  if (error.code === "P2025") {
    return response.status(404).json({ error: "Record not found" });
  }

  if (error.code === "P2003") {
    return response
      .status(400)
      .json({ error: "Foreign key constraint failed" });
  }

  if (error.code === "P2002") {
    return response.status(400).json({ error: "Unique constraint failed" });
  }

  response.status(500).json({ error: "Internal server error" });
};

module.exports = {
  requestLogger,
  authenticateToken,
  requireRole,
  unknownEndpoint,
  errorHandler,
};
