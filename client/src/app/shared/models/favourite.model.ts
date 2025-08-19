import { Product } from "./product.model";

export interface Favourite {
    _ownerId: string,
    product: Product,
    userId: string,
    _createdOn: number,
    _id: string
}