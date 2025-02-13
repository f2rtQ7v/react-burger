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

type IUserData = {
  name?: string;
  email?: string;
  password?: string;
}

interface IUserWithToken extends ITokenData {
  user: IUserData | null;
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

interface IGroupedIngredients {
  [key: string]: IIngredient[];
}


interface IOrder {
  id: number;
  name: string;
}

type TOrderIngredients = string[];


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
