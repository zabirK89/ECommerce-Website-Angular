export interface signUpType {
  name: string;
  email: string;
  password: string;
}

export interface AddProductType {
  productName: string;
  productPrice: string;
  productColor: string;
  productImg: string;
  productDesc: string;
  productCategory: string;
  id: number;
  productQty?: number | undefined;
}

export interface SignUpUserType {
  name: string;
  email: string;
  password: string;
}

export interface cartType {
  productName: string;
  productPrice: string;
  productColor: string;
  productImg: string;
  productDesc: string;
  productCategory: string;
  userId: number;
  productId: number;
  id: number | undefined;
  productQty?: number | undefined;
}

export interface priceSummary{
  price:number,
  discount:number,
  tax:number,
  delivery:number,
  total:number
}

export interface order {
  email:string,
  address:string,
  contact:string,
  totalPrice:number,
  userId:string,
  id:number|undefined
}