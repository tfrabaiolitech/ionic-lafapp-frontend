import { RefDTO } from "./ref.dto";
import { DeliveryDTO } from "./delivery.dto";
import { ItemLostDTO } from "./item-lost.dto";

export interface LostDTO {
    cliente: RefDTO;
    enderecoAddress: RefDTO;
    delivery: DeliveryDTO;
    itens: ItemLostDTO[];
}