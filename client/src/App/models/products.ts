export interface Products {
    id:              number;
    name:            string;
    description:     string;
    price:           number;
    pictureUrl:      string;
    type?:            string;
    brand:           string;
    quantityInStock?: number;
}

export enum Type {
    Boards = "Boards",
    Boots = "Boots",
    Gloves = "Gloves",
    Hats = "Hats",
}
