import { Feature } from "../../../../shared/interfaces/feature";
import { User } from "../../../domain/user.model";
import { LoginDTO } from "../../../dto/user/login.dto";

export type ILoginFeature = Feature<LoginDTO, Promise<User>>;
