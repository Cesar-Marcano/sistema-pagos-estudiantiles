import { DataSource } from "typeorm";
import { UserEntity } from "../infrastructure/entities/user.entity";
import { RoleEntity } from "../infrastructure/entities/role.entity";
import { getEnv } from "../shared/utils/getEnv";
import { isDevelopment } from "../config/envVariables";

export const AppDataSource = new DataSource({
  type: "postgres",
  url: getEnv("DATABASE_URL"),
  synchronize: isDevelopment(),
  logging: false,
  entities: [UserEntity, RoleEntity],
  migrations: [],
  subscribers: [],
});
