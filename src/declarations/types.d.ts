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
