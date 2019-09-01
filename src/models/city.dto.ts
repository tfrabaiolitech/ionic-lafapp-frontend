import { StateDTO } from "./state.dto";

export interface CityDTO {
    id : string;
    nome : string;
    state? : StateDTO;
}