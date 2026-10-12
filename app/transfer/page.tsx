"use client";
import { useState } from "react";
import Protected from "@/components/Protected";
import { useBank } from "@/components/BankProvider";

const money = (n: number) =>
  n.toLocaleString("en-IN", { style: "currency", currency: "INR" });

export default function TransferPage() {
  const { accounts, transfer } = useBank();
  const [from, setFrom] = useState(accounts[0]?.id ?? "");
  const [to, setTo] = useState(accounts[1]?.id ?? "");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [review, setReview] = useState(false);
  const source = accounts.find((a) => a.id === from);
  const destination = accounts.find((a) => a.id === to);

  function reviewTransfer(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage("");
    if (from === to) return setMessage("Choose two different accounts.");
    const n = Number(amount);
    if (!Number.isFinite(n) || n <= 0)
      return setMessage("Amount must be greater than zero.");
    if (!source || n > source.balance)
      return setMessage("Insufficient available balance.");
    setReview(true);
  }

  function confirm() {
    const error = transfer(from, to, Number(amount));
    if (error) {
      setMessage(error);
      setReview(false);
      return;
    }
    setMessage(
      "Transfer successful. Both account balances and transactions were updated.",
    );
    setAmount("");
    setReview(false);
  }




  
  return (
    <Protected>
      <div className="mx-auto max-w-2xl space-y-5 p-5 md:p-8">
        <h1 className="text-3xl font-bold">Money transfer</h1>
        <p className="text-gray-500">Demo only: no real money moves.</p>
        <form
          onSubmit={reviewTransfer}
          className="space-y-5 rounded-xl bg-white p-6 shadow-sm"
        >
          <div>
            <label htmlFor="from" className="mb-2 block text-sm font-medium">
              From account
            </label>
            <select
              id="from"
              value={from}
              onChange={(e) => {
                setFrom(e.target.value);
                setReview(false);
              }}
              className="w-full rounded-lg border p-3"
            >
              {accounts.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.name} — {money(a.balance)}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="to" className="mb-2 block text-sm font-medium">
              To account
            </label>
            <select
              id="to"
              value={to}
              onChange={(e) => {
                setTo(e.target.value);
                setReview(false);
              }}
              className="w-full rounded-lg border p-3"
            >
              {accounts.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="amount" className="mb-2 block text-sm font-medium">
              Amount (INR)
            </label>
            <input
              id="amount"
              type="number"
              min="0.01"
              step="0.01"
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value);
                setReview(false);
              }}
              placeholder="Enter amount"
              required
              className="w-full rounded-lg border p-3"
            />
          </div>



          {message && (
            <p
              role="status"
              className={`rounded-lg p-3 text-sm ${message.startsWith("Transfer successful") ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}
            >
              {message}
            </p>
          )}


{/*----------------------------- Review Section ------------------------------------*/}

          {!review ? (
            <button className="w-full rounded-lg bg-indigo-600 p-3 font-semibold text-white hover:bg-indigo-700">
              Review transfer
            </button>
          ) : (
            <div className="space-y-3 rounded-lg bg-indigo-50 p-4">
              <h2 className="font-bold">Confirm transfer</h2>
              <p>From: {source?.name}</p>
              <p>To: {destination?.name}</p>
              <p>Amount: {money(Number(amount))}</p>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={confirm}
                  className="flex-1 rounded-lg bg-indigo-600 p-3 text-white"
                >
                  Confirm
                </button>
                <button
                  type="button"
                  onClick={() => setReview(false)}
                  className="flex-1 rounded-lg border bg-white p-3"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </form>

{/*------------------------- Remaining Amount ---------------------------*/}

        {source && (
          <p className="text-sm text-gray-500">
            Available source balance: {money(source.balance)}
          </p>
        )}
      </div>
    </Protected>
  );
}
