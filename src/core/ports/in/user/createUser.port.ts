import { Feature } from "../../../../shared/interfaces/feature";
import { User } from "../../../domain/user.model";
import { CreateUserDTO } from "../../../dto/user/create.dto";

export type ICreateUserFeature = Feature<CreateUserDTO, Promise<User>>;
