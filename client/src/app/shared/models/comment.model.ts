import { Product } from "./product.model";

export interface Comment {
    rating: number,
    comment: string,
    productId: string,
    username: string,
}