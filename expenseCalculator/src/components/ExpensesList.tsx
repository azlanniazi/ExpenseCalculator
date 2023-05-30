import { MdDelete } from "react-icons/md";
import ExpenseItem from "./ExpenseItem";
import { ExpenseType } from "../Types";

interface ExpensesListProps {
  expenses: ExpenseType[];
  handleClearAllExpenses: () => void;
  handleDelete: (id: string) => void;
  handleEdit: (id: string) => void;
}

export default function ExpensesList({
  expenses,
  handleClearAllExpenses,
  handleDelete,
  handleEdit,
}: ExpensesListProps) {
  return (
    <>
      <ul className="list">
        {expenses.map((expense) => {
          return (
            <ExpenseItem
              key={expense.id}
              expense={expense}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
            />
          );
        })}
      </ul>
      {expenses.length > 0 && (
        <button className="btn btn-danger" onClick={handleClearAllExpenses}>
          <MdDelete /> Clear all expenses
        </button>
      )}
    </>
  );
}
