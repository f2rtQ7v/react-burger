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

interface IFormItem {
  type: string;
  name: string;
  placeholder: string;
}

interface IFormData {
  [key: string]: string;
}

type TInputEvent = Event<HTMLInputElement>;
type TFormEvent = Event<HTMLFormElement>;
