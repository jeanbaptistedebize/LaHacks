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
  coord: number[];
  image: string;
}

export class PlantModel {
  id: string;

  coord: number[];
  createdAt: Date;

  commonname: string;
  scientificname: string;
  rarity: string;
}

export interface GetAllPlant {
  plants: PlantModel[];
}

export interface PlantAll {
  id: string;
  commonname: string;
  scientificname: string;
  isleaf: boolean;
  family: string;
  genus: string;
  species: string;
  description: string;
  disease: string;
  rarity: string;
  coord: number[];
  createdAt: Date;
  userId: string;
  image: string;
}

export interface GetOwnedPlant {
  plants: PlantAll[];
}

export interface AddPlantResponce extends Omit<PlantAll, "image"> {}
