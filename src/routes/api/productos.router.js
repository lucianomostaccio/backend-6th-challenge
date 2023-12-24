import { Router } from "express";
import { onlyLogueadosWeb } from "../../middlewares/autorizacion.js";

export const productosRouter = Router();

// Middleware para asegurar que solo usuarios logueados pueden acceder
productosRouter.use(onlyLogueadosWeb);

// Controlador para la vista de productos
productosRouter.get("/", (req, res) => {
  // Obtén los datos del usuario desde la sesión
  const { nombre, apellido, email } = req.session["user"];

  // Mensaje de bienvenida en la vista de productos
  const mensajeBienvenida = `¡Bienvenido, ${nombre} ${apellido} (${email})!`;

  // Renderiza la vista de productos con el mensaje de bienvenida
  res.render("productos", { pageTitle: "Productos", mensajeBienvenida });
});
