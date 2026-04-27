export enum Roles {
  ADMIN = "admin",
  ANALYST = "analyst",
}

export enum Status {
  ACTIVE = "active",
  INACTIVE = "inactive",
}

interface User {
  id: string;
  github_id: string;
  username: string;
  email: string;
  avatar_url: string;
  last_login_at: Date;
  created_at: Date;
  updated_at: Date;
  role: Roles;
  status: Status;
}

export type { User };
