import { Feature } from "../../../../shared/interfaces/feature";
import { User } from "../../../domain/user.model";
import { UpdatePasswordDTO } from "../../../dto/user/update.dto";

export type IUpdatePasswordFeature = Feature<UpdatePasswordDTO, Promise<User>>;
