import { ChangeEvent, FormEvent } from "react";
import FormGroup from "./FormGroup";
import Button from "./Button";
import { MdEdit, MdAddCircle } from "react-icons/md";
interface ExpenseFormProps {
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  date: string;
  handleDate: (e: ChangeEvent<HTMLInputElement>) => void;
  charge: string;
  handleCharge: (e: ChangeEvent<HTMLInputElement>) => void;
  amount: string;
  handleAmount: (e: ChangeEvent<HTMLInputElement>) => void;
  edit: boolean;
}

function ExpenseForm({
  handleSubmit,
  date,
  handleDate,
  charge,
  handleCharge,
  amount,
  handleAmount,
  edit,
}: ExpenseFormProps) {
  return (
    <form onSubmit={handleSubmit} className="card bg-primary text-light w-30">
      <div className="card-body">
        <FormGroup
          labelText={"Data"}
          inputType="date"
          values={date}
          onChange={handleDate}
        />
        <FormGroup
          labelText={"Expense"}
          inputType="text"
          values={charge}
          onChange={handleCharge}
          placeholder={"e.g. Utility Bill"}
        />{" "}
        <FormGroup
          labelText={"Amount"}
          inputType="number"
          values={amount}
          onChange={handleAmount}
          placeholder={"e.g. 1500"}
        />
        {edit ? (
          <Button
            btnClass={"btn-block"}
            icon={<MdEdit className="btn-icon" />}
            text="Edit"
          />
        ) : (
          <Button
            btnClass={"btn-block btn-warning"}
            icon={<MdAddCircle className="btn-icon" />}
            text="Add"
          />
        )}
      </div>
    </form>
  );
}

export default ExpenseForm;
