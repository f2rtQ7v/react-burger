interface IOrdersTotalProps {
  title: string;
  value: number;
}

export default function OrdersTotal({ title, value }: IOrdersTotalProps) {
  return (
    <div className="mt-15">
      <div className="text text_type_main-medium">{title}</div>
      <div className="text text_type_digits-large">{value.toLocaleString('ru')}</div>
    </div>
  );
}
