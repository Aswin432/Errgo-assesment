import express, {
  Request,
  Response,
  RequestHandler,
  NextFunction,
  ErrorRequestHandler,
} from "express";
import cors from "cors";
import { IProject, ICreateProjectRequest } from "./models/project.interface";
import { v4 as uuid } from "uuid";
import { z } from "zod";
import { createProjectSchema, projectIdSchema } from "./schemas/project.schema";
import { handleWebSocketUpgrade } from "./websocket";

const app = express();
const PORT = 3000;

const projects: IProject[] = [];

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());

// Centralized error handling middleware
const errorHandler: ErrorRequestHandler = (err, _req, res, next) => {
  if (err instanceof z.ZodError) {
    res.status(400).json({ message: "Validation error", errors: err.errors });
    return; // Exit the middleware after sending response
  }
  console.error("Internal server error:", err);
  res.status(500).json({ message: "Internal server error" });
  // Do not call next(err) here, as a response has already been sent.
  // If you want to pass it to another error handler, you would typically
  // not send a response here.
};

app.get("/", (_req: Request, res: Response) => {
  res.send("Errgo Backend Interview Module Loaded Successfully!");
});

const createProjectHandler: RequestHandler<{}, any, ICreateProjectRequest> = (
  req,
  res,
  next
): void => {
  try {
    const { name, description } = createProjectSchema.parse(req.body);

    const newProject: IProject = {
      id: uuid(),
      name,
      description,
    };

    projects.push(newProject);
    res.status(201).json(newProject);
  } catch (error: unknown) {
    next(error);
  }
};

app.post("/projects", createProjectHandler);

app.get("/projects", (_req: Request, res: Response) => {
  res.status(200).json(projects);
});

const deleteProjectHandler: RequestHandler<{ id: string }> = (
  req,
  res,
  next
): void => {
  try {
    const { id } = projectIdSchema.parse(req.params);

    const projectIndex = projects.findIndex((project) => project.id === id);

    if (projectIndex === -1) {
      res.status(404).json({ message: "Project not found" });
      return;
    }

    projects.splice(projectIndex, 1);

    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error: unknown) {
    next(error);
  }
};

app.delete("/projects/:id", deleteProjectHandler);

app.options("/projects/:id", cors());

// Apply the error handling middleware last
app.use(errorHandler);

const server = app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

server.on("upgrade", handleWebSocketUpgrade);
