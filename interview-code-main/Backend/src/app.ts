import express, { Request, Response, RequestHandler } from "express";
import cors from "cors";
import { IProject, ICreateProjectRequest } from "./models/project.interface";
import { v4 as uuid } from "uuid";

const app = express();
const PORT = 3000;
// List of projects
const projects: IProject[] = [];

// Setup cors and express.json()
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());

app.get("/", (_req: Request, res: Response) => {
  res.send("Errgo Backend Interview Module Loaded Successfully!");
});

const createProjectHandler: RequestHandler<{}, any, ICreateProjectRequest> = (
  req,
  res
) => {
  const { name, description } = req.body;
  if (!name || !description) {
    res.status(400).json({ message: "Name and description are required" });
    return; // Explicitly return void after sending response
  }
  const newProject: IProject = {
    id: uuid(),
    name,
    description,
  };
  projects.push(newProject);
  res.status(201).json(newProject);
};

app.post("/projects", createProjectHandler);

app.get("/projects", (req: Request, res: Response) => {
  res.status(200).json(projects);
});

app.delete("/projects/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const initialLength = projects.length;
  const updatedProjects = projects.filter((project) => project.id !== id);
  projects.splice(0, projects.length, ...updatedProjects); // Efficiently update the original array

  if (projects.length < initialLength) {
    res.status(200).json({ message: "Project deleted successfully" });
  } else {
    res.status(404).json({ message: "Project not found" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
