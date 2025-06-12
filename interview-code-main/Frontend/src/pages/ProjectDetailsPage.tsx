import { useState } from "react";
import { useEffect } from "react";
import type { IProject } from "../models/ProjectModels";
import { getProjects, deleteProject } from "../controller/ProjectController";
import { toast } from "react-toastify";

const ProjectDetailsPage = () => {
  const [projects, setProjects] = useState<IProject[]>([]);

  const fetchProjects = async () => {
    const fetchedProjects = await getProjects();
    setProjects(fetchedProjects);
  };

  /**
   * Fetch all the projects on load
   */
  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await deleteProject(id);
      toast.success("Project deleted successfully!");
      fetchProjects(); // Refresh the list after deletion
    } catch (error) {
      console.error("Error deleting project:", error);
      toast.error("Failed to delete project.");
    }
  };

  return (
    <div className="flex flex-col flex-1">
      {/* Main content area */}
      {projects.length > 0 &&
        projects.map((project: IProject) => {
          return (
            <div className="flex-1 p-6" key={project.id}>
              <div className="bg-gray-200 rounded-lg p-6">
                <div className="flex items-center mb-6">
                  <div className="mr-4">
                    <div className="bg-purple-600 rounded p-2 w-8 h-8 flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-white"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M3 3h18v18H3V3z" fillOpacity="0.2" />
                        <path
                          d="M13 7h5v12H6v-5"
                          stroke="currentColor"
                          strokeWidth="2"
                          fill="none"
                        />
                      </svg>
                    </div>
                  </div>

                  <div className="flex-grow">
                    <div className="text-xs text-gray-500">Project Name</div>
                    <div className="font-medium">{project.name}</div>
                  </div>

                  {/* Dummy Button */}
                  <button className="bg-purple-600 text-white rounded px-4 py-2 text-sm">
                    Explore Project
                  </button>
                </div>

                <div className="mb-6">
                  <div className="text-xs text-gray-500">Description</div>
                  <div className="text-sm">{project.description}</div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end mt-4 space-x-2">
                  {/* Share Button */}
                  <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 rounded px-4 py-2 text-sm flex items-center">
                    Share
                    <svg
                      className="w-4 h-4 ml-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                  </button>
                  {/* Delete Button */}
                  <button
                    onClick={() =>
                      handleDelete(project.id as unknown as string)
                    }
                    className="bg-red-500 hover:bg-red-600 text-white rounded px-4 py-2 text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          );
        })}

      {projects.length === 0 && <div className="p-5">No projects found...</div>}
    </div>
  );
};

export default ProjectDetailsPage;
