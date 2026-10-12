"use client";

import { useState } from "react";
import Protected from "@/components/Protected";
import { useBank } from "@/components/BankProvider";

// Format balance and transaction amounts in Indian Rupees
const money = (n: number) =>
  n.toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
  });

export default function AccountsPage() {
  const { accounts, transactions } = useBank();

  // Select the first account by default
  const [selected, setSelected] = useState(accounts[0]?.id ?? "");

  // Get the selected account details
  const account = accounts.find((a) => a.id === selected);

  // Get transactions for the selected account
  const items = transactions.filter((t) => t.accountId === selected);

  return (
    <Protected>
      <div className="mx-auto max-w-6xl space-y-6 p-5 md:p-8">
        <h1 className="text-3xl font-bold">Account management</h1>

{/* ------------------------- Display All Accounts ---------------------------------------------- */}

        <div className="grid gap-4 md:grid-cols-3">
          {accounts.map((a) => (
            <button
              key={a.id}
              onClick={() => setSelected(a.id)}
              className={`rounded-xl border bg-white p-5 text-left shadow-sm ${
                selected === a.id
                  ? "border-indigo-600 ring-2 ring-indigo-100"
                  : "border-transparent"
              }`}
            >
              <p className="text-sm text-gray-500">
                {a.accountType} account
              </p>

              <h2 className="mt-2 text-lg font-bold">{a.name}</h2>

              <p className="mt-1 text-sm text-gray-500">
                {a.accountNumber}
              </p>

              <p className="mt-4 text-2xl font-bold">
                {money(a.balance)}
              </p>
            </button>
          ))}
        </div>

{/* ---------------------------------- Account Transactions --------------------------- */}

        {account && (
          <section className="rounded-xl bg-white p-6 shadow-sm">
            <h2 className="mb-1 text-xl font-bold">
              {account.name} transactions
            </h2>

            <p className="mb-4 text-sm text-gray-500">
              Selected account: {account.accountNumber}
            </p>

            {items.length ? (
              items.map((t) => (
                <div
                  key={t.id}
                  className="flex justify-between gap-3 border-b py-3 last:border-0"
                >
                  <div>
                    <p className="font-medium">{t.description}</p>

                    <p className="text-sm text-gray-500">
                      {t.date} · {t.status}
                    </p>
                  </div>

                  <p
                    className={
                      t.type === "credit"
                        ? "text-green-600"
                        : "text-red-600"
                    }
                  >
                    {t.type === "credit" ? "+" : "−"}
                    {money(t.amount)}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">
                No transactions for this account.
              </p>
            )}
          </section>
        )}
      </div>
    </Protected>
  );
}