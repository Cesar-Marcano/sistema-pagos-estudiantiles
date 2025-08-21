import { Feature } from "../../../../shared/interfaces/feature";
import { User } from "../../../domain/user.model";
import { UpdateNameDTO} from "../../../dto/user/update.dto";

export type IUpdateNameFeature = Feature<UpdateNameDTO, Promise<User>>;
