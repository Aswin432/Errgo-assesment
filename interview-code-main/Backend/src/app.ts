import express, { Request, Response, RequestHandler } from "express";
import cors from "cors";
import { IProject, ICreateProjectRequest } from "./models/project.interface";
import { v4 as uuid } from "uuid";
import { z } from "zod"; // Import zod
import { createProjectSchema, projectIdSchema } from "./schemas/project.schema"; // Import schemas

import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ noServer: true });
const chatMessages: string[] = [];

wss.on("connection", (ws) => {
  console.log("Client connected");
  ws.send(JSON.stringify(chatMessages)); // Send existing messages to new client

  ws.on("message", (message) => {
    const msg = message.toString();
    chatMessages.push(msg);
    console.log(`Received: ${msg}`);
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify([msg])); // Send new message as an array
      }
    });
  });

  ws.on("close", () => {
    console.log("Client disconnected");
  });

  ws.on("error", (error) => {
    console.error("WebSocket error:", error);
  });
});
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

app.get("/", (_req: Request, res: Response) => {
  res.send("Errgo Backend Interview Module Loaded Successfully!");
});

const createProjectHandler: RequestHandler<{}, any, ICreateProjectRequest> = (
  req,
  res
): void => {
  try {
    // Validate request body using Zod schema
    const { name, description } = createProjectSchema.parse(req.body);

    const newProject: IProject = {
      id: uuid(),
      name,
      description,
    };

    projects.push(newProject);
    res.status(201).json(newProject);
  } catch (error: unknown) {
    // Explicitly type error as unknown
    if (error instanceof z.ZodError) {
      res
        .status(400)
        .json({ message: "Validation error", errors: error.errors });
    } else {
      console.error("Error creating project:", error); // error is now typed as unknown
      res.status(500).json({ message: "Internal server error" });
    }
  }
};

app.post("/projects", createProjectHandler);

app.get("/projects", (_req: Request, res: Response) => {
  res.status(200).json(projects);
});

const deleteProjectHandler: RequestHandler<{ id: string }> = (
  req,
  res
): void => {
  try {
    // Validate request params using Zod schema
    const { id } = projectIdSchema.parse(req.params);

    const projectIndex = projects.findIndex((project) => project.id === id);

    if (projectIndex === -1) {
      res.status(404).json({ message: "Project not found" });
      return;
    }

    projects.splice(projectIndex, 1);

    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error: unknown) {
    // Explicitly type error as unknown
    if (error instanceof z.ZodError) {
      res
        .status(400)
        .json({ message: "Validation error", errors: error.errors });
    } else {
      console.error("Error deleting project:", error); // error is now typed as unknown
      res.status(500).json({ message: "Internal server error" });
    }
  }
};

// Apply cors middleware directly to the delete route to ensure preflight is handled
app.delete("/projects/:id", cors(), deleteProjectHandler);

// This explicit options route is still good practice for clarity, but the above is more direct for the DELETE method
app.options("/projects/:id", cors());

const server = app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

server.on("upgrade", (request, socket, head) => {
  console.log(`WebSocket upgrade request URL: ${request.url}`);
  if (request.url === "/chat") {
    wss.handleUpgrade(request, socket, head, (ws) => {
      wss.emit("connection", ws, request);
    });
  } else {
    socket.destroy();
  }
});
