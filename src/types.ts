import { User } from "./entities/user"

declare module "express-session" {
    interface SessionData {
      user: User["token"];
    }
  }