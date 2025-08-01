export interface Product {
    id: string,
    title: string,
    description: string,
    price: number,
    category: string,
    subcategory:string[],
    imageUrls: string[],
    createdAt: string,
    updatedAt:string,
    bestSeller: boolean,
    rating: number
}