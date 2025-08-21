import { Feature } from "../../../../shared/interfaces/feature";
import { User } from "../../../domain/user.model";
import { UpdateRoleDTO } from "../../../dto/user/update.dto";

export type IUpdateRoleFeature = Feature<UpdateRoleDTO, Promise<User>>;
