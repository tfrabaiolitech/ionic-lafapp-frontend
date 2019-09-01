import { ProductDTO } from "./product.dto";

export interface CartItem {
    quantidade: number,
    produto: ProductDTO
}
