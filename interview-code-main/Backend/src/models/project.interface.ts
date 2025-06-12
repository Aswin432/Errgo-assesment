/**
 * BONUS: Implement zod schema for model validation
 */
export interface IProject {
  id: string;
  name: string;
  description: string;
}

export interface ICreateProjectRequest {
  name: string;
  description: string;
}
