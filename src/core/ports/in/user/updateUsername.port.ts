import { Feature } from "../../../../shared/interfaces/feature";
import { User } from "../../../domain/user.model";
import { UpdateUsernameDTO } from "../../../dto/user/update.dto";

export type IUpdateUsernameFeature = Feature<UpdateUsernameDTO, Promise<User>>;
