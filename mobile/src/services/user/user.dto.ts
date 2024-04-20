export interface GetUserResponse {
  firstname: string;
  lastname: string;
  email: string;
}

export interface GetUserCoursesResponse {
  courses: UserCourse[];
}

export interface UserCourse {
  id: string;
  title: string;
  description: string;
  picture: string;
  owner: boolean;
}

export interface AddPlantRequest {
  type: "FLOWER";
  name: string;
  coord: number[];
  image: string;
}

export interface AddPlantResponce {
  name: string;
}

export class PlantModel {
  id: string;
  type: string;
  name: string;
  coord: number[];
  image: string;
  createdAt: Date;
}

export interface GetAllPlant {
  plants: PlantModel[]
}
