import swaggerJSDoc from "swagger-jsdoc";

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "DevDrive API",
      version: "1.0.0",
      description: "API documentation for my starter kit",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Development server",
      },
    ],
  },
  apis: ["./src/**/*.ts"], // Chemins vers les fichiers contenant les annotations
};

export const swaggerSpec = swaggerJSDoc(options);
