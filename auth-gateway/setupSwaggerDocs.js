const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");

const setupSwaggerDocs = (app) => {
  const swaggerDocument = YAML.load("./documentation.yaml");

  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};

module.exports = setupSwaggerDocs;
