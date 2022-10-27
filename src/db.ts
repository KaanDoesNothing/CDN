import { Upload } from "./entities/upload";
import { User } from "./entities/user";
import { getConfig } from "./utils";
import {DataSource} from "typeorm";
import { Collection } from "./entities/collection";

const config = getConfig();

export const db = new DataSource({
    type: "mysql",
    url: `mysql://${config.database.username}:${config.database.password}@${config.database.host}:${config.database.port}/${config.database.database}`,
    synchronize: true,
    logging: false,
    entities: [User, Upload, Collection]
});