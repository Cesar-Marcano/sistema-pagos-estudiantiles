import { Feature } from "../../../../shared/interfaces/feature";
import { User } from "../../../domain/user.model";
import { UpdateEmailDTO } from "../../../dto/user/update.dto";

export type IUpdateEmailFeature = Feature<UpdateEmailDTO, Promise<User>>;
