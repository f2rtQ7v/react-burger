interface IRequestOptions {
  method?: 'GET' | 'POST' | 'PATCH' | 'DELETE';
  headers?: {
    'Content-Type'?: string;
    Authorization?: string;
  };
  body?: string | object;
}

interface IRequestState {
  request: boolean;
  error: string | null;
}

interface ITokenData {
  refreshToken: string;
  accessToken: string;
}

type TUserData = {
  name?: string;
  email?: string;
  password?: string;
}

type TWithUser = {
  user: TUserData | null;
}


interface IIngredient {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  calories: number;
  carbohydrates: number;
  price: number;
  image: string;
  image_large: string;
  id?: string;
}


type TOrderIngredients = string[];

interface IOrder {
  _id?: string;
  name: string;
  number: number;
  createdAt?: string;
  updatedAt?: string;
  status?: 'created' | 'pending' | 'done';
  ingredients?: TOrderIngredients;
}


type TFormItem = {
  type: string;
  name: string;
  placeholder: string;
};

type TFormData = {
  [key: string]: string;
};

type TInputEvent = Event<HTMLInputElement>;
type TFormEvent = Event<HTMLFormElement>;
