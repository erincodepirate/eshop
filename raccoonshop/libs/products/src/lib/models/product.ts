import { Category } from "./category";

export class Product {
    id: string = '';
    name: string = '';
    description: string = '';
    richDescription: string = '';
    image: string = '';
    images?: string[] = [];
    brand: string = '';
    price: number = 0;
    category?: Category = {name: '', id: '', icon: ''};
    countInStock: number = 0;
    rating?: number = 0;
    numReviews?: number = 0;
    isFeatured: boolean = false;
}