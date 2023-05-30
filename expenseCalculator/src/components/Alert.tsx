interface AlertProps {
  type: string;
  text: string;
}

export default function Alert({ type, text = "Alert" }: AlertProps) {
  return <div className={`alert alert-${type}`}>{text}</div>;
}
