/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useState, useRef, useEffect, ChangeEvent, FormEvent } from "react";
import ExpensesForm from "./components/ExpenseForm";
import ExpensesList from "./components/ExpensesList";
import Alert from "./components/Alert";
import { v4 as uuidV4 } from "uuid";
import { ExpenseType } from "./Types";

const storedExpenses = localStorage.getItem("expenses");
const initialExpense: ExpenseType[] = storedExpenses
  ? JSON.parse(storedExpenses)
  : [];

export default function ExpensesCalcApp() {
  // state values
  // All expenses
  const [expenses, setExpense] = useState(initialExpense);
  // Single Expense
  const [date, setDate] = useState("");
  // Single Amount
  const [amount, setAmount] = useState("");
  // Single Charge
  const [charge, setCharge] = useState("");
  // Budget
  const [budget, setBudget] = useState("");
  // Id's
  const [id, setId] = useState("");
  // Edit?
  const [edit, setEdit] = useState(false);
  // Alert
  const [alert, setAlert] = useState<
    { type: string; show: boolean; text: string } | { show: false }
  >({ show: false });
  // Handlers

  // handle Budget
  const changeBudget = (e: ChangeEvent<HTMLInputElement>) => {
    setBudget(e.target.value);
  };
  // handle Charge
  const handleCharge = (e: ChangeEvent<HTMLInputElement>) => {
    setCharge(e.target.value);
  };
  // handle Date
  const handleDate = (e: ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  };
  // handle Amount
  const handleAmount = (e: ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };
  // handle Alert

  const handleAlert = ({ type, text }: { type: string; text: string }) => {
    setAlert({ show: true, type, text });
    setTimeout(() => {
      setAlert({ show: false });
    }, 3000);
  };
  //   Handle Submit

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (date !== "" && charge !== "" && +amount > 0) {
      if (edit) {
        const tempExpense = expenses.map((item) => {
          return item.id === id ? { ...item, date, charge, amount } : item;
        });
        setExpense(tempExpense);
        setEdit(false);
        // todo: Alert
        handleAlert({ type: "success", text: "Expense Edited" });
      } else {
        const singleExpense = { id: uuidV4(), date, charge, amount };
        setExpense([...expenses, singleExpense]);
        // todo: Alert
        handleAlert({ type: "success", text: "Expense added" });
      }
      setCharge("");
      setAmount("");
    } else {
      // todo: Alert
      handleAlert({
        type: "danger",
        text: "Please complete all fields ",
      });
    }
    // Set Expense
  };
  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  // Handle Clear all Expense
  const clearAllExpenses = () => {
    setExpense([]);
    // todo: Alert

    handleAlert({ type: "danger", text: "All expense deleted" });
  };
  // Handler Delete one expense

  const handleDelete = (id: string) => {
    if (window.confirm("Delete expense?")) {
      const filteredExpense = expenses.filter((expense) => expense.id !== id);
      setExpense(filteredExpense);
      // todo: Alert
      handleAlert({ type: "danger", text: "Expense deleted" });
    }
  };

  const handleEdit = (id: string) => {
    const editedExpense = expenses.find((expense) => expense.id === id)!;
    const { charge, amount } = editedExpense;
    setCharge(charge);
    setAmount(amount);
    setId(id);
    setEdit(true);
  };
  return (
    <main className="container">
      <h1 className="title text-center"> Expenses Calculator </h1>
      {alert.show && <Alert type={alert.type} text={alert.text} />}

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2,1fr)",
          gap: "25px ",
          margin: "1rem",
        }}
      >
        <aside>
          <ExpensesForm
            date={date}
            handleDate={handleDate}
            charge={charge}
            handleCharge={handleCharge}
            amount={amount}
            handleAmount={handleAmount}
            handleSubmit={handleSubmit}
            edit={edit}
          />

          <section className="card mt-2 bg-primary text-light text-right">
            <div className="card-body">
              <h3>Budget : Rs</h3>
              <input type="number" value={budget} onChange={changeBudget} />
              <h3 className="mb-1">
                Total expenses: Rs{" "}
                {expenses.reduce((total, expense) => {
                  return (total += parseInt(expense.amount, 10));
                }, 0)}
              </h3>
              {/* Calc economies */}
              <h3>Economies: Rs {calcEconomies(+budget, expenses)}</h3>
            </div>
          </section>
        </aside>
        <section>
          <ExpensesList
            expenses={expenses}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            handleClearAllExpenses={clearAllExpenses}
          />
        </section>
      </section>
    </main>
  );
}

function calcEconomies(budget: number, expenses: ExpenseType[]) {
  return (
    budget -
    expenses.reduce((total, expense) => {
      return (total += parseInt(expense.amount, 10));
    }, 0)
  );
}
