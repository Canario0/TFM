export enum UserRole {
  ADMIN = "ADMIN",
  USER = "USER",
}

export type User = {
  id: string;
  username: string;
  roles: UserRole[];
};
