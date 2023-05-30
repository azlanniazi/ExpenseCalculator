import { MdEdit, MdDelete } from "react-icons/md";
import { ExpenseType } from "../Types";

interface ExpenseItemProps {
  expense: ExpenseType;
  handleEdit: (id: string) => void;
  handleDelete: (id: string) => void;
}
export default function ExpenseItem({
  expense,
  handleEdit,
  handleDelete,
}: ExpenseItemProps) {
  const { id, charge, date, amount } = expense;
  return (
    <li className="expenseItem">
      <div className="expense-details">
        <div
          className="flex-column c-flex-align-flexStart"
          // style={{ alignItems: "flex-start" }}
        >
          <h4 className="text-primary"> {charge}</h4>
          <small className="text-danger">{date}</small>
        </div>
      </div>
      <div className="text-success">Rs. {amount}</div>
      <div className="flex-row gap-1">
        <button className="btn btn-sm btn-black" onClick={() => handleEdit(id)}>
          <MdEdit />
        </button>
        <button
          className="btn btn-sm btn-danger"
          onClick={() => handleDelete(id)}
        >
          <MdDelete />
        </button>
      </div>
    </li>
  );
}
