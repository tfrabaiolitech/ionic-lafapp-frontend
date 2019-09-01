import {CityDTO} from "./city.dto" 

export interface AddressDTO {
    id : string;
    complemento : string;
    cep : string;
    city : CityDTO;
}