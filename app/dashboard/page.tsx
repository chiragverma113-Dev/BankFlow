"use client";
import Link from "next/link";
import {
  ArrowDownLeft,
  ArrowUpRight,
  CreditCard,
  Wallet,
  TrendingUp,
  TrendingDown,
  Send,
  History,
} from "lucide-react";
import Protected from "@/components/Protected";
import { useBank } from "@/components/BankProvider";

const money = (n: number) =>
  n.toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  });

export default function DashboardPage() {

  const { accounts, transactions } = useBank();

  const total = accounts.reduce((sum, a) => sum + a.balance, 0);

  const income = transactions
    .filter((t) => t.type === "credit" && t.status === "successful")
    .reduce((s, t) => s + t.amount, 0);

  const expenses = transactions
    .filter((t) => t.type === "debit" && t.status === "successful")
    .reduce((s, t) => s + t.amount, 0);

  const categories = [
    { name: "Shopping", amount: 6500 },
    { name: "Food", amount: 4500 },
    { name: "Bills", amount: 3000 },
    { name: "Transport", amount: 2000 },

  ];

  return (

    <Protected>
      <div className="mx-auto max-w-6xl space-y-7 p-5 md:p-8">
        
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="mt-1 text-gray-500">
            Your fictional BankFlow account overview.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-xl bg-indigo-600 p-6 text-white">
            <Wallet />
            <p className="mt-4 text-sm text-indigo-100">Total balance</p>
            <h2 className="mt-1 text-3xl font-bold">{money(total)}</h2>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-sm">
            <CreditCard className="text-indigo-600" />
            <p className="mt-4 text-sm text-gray-500">Linked accounts</p>
            <h2 className="mt-1 text-3xl font-bold">{accounts.length}</h2>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-sm">
            <TrendingUp className="text-green-600" />
            <p className="mt-4 text-sm text-gray-500">
              Successful credits (sample)
            </p>
            <h2 className="mt-1 text-3xl font-bold">{money(income)}</h2>
            <p className="mt-1 text-xs text-gray-400">All dates in mock data</p>
          </div>
        </div>


{/*------------------ Hero Section --------------------------*/}


        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-xl bg-white p-5 shadow-sm">
            <TrendingUp className="text-green-600" />
            <p className="mt-2 text-sm text-gray-500">
              Income in sample transactions
            </p>
            <h3 className="text-2xl font-bold text-green-700">
              {money(income)}
            </h3>
          </div>

          <div className="rounded-xl bg-white p-5 shadow-sm">
            <TrendingDown className="text-red-500" />
            <p className="mt-2 text-sm text-gray-500">
              Expenses in sample transactions
            </p>
            <h3 className="text-2xl font-bold text-red-600">
              {money(expenses)}
            </h3>
          </div>
        </div>

        <section className="rounded-xl bg-white p-6 shadow-sm">
          <h2 className="mb-5 text-xl font-bold">
            Spending breakdown (fictional)
          </h2>
          <div className="space-y-4">
            {categories.map((c) => (
              <div key={c.name}>
                <div className="mb-1 flex justify-between text-sm">
                  <span>{c.name}</span>
                  <span>{money(c.amount)}</span>
                </div>
                <div className="h-3 rounded-full bg-gray-100">
                  <div
                    className="h-3 rounded-full bg-indigo-500"
                    style={{ width: `${c.amount / 70}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>



{/*---------------------- Quick Links --------------------------*/}



        <section className="rounded-xl bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-bold">Quick actions</h2>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/transfer"
              className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-3 text-white"
            >
              <Send size={18} />
              Transfer money
            </Link>
            <Link
              href="/transactions"
              className="flex items-center gap-2 rounded-lg border px-4 py-3"
            >
              <History size={18} />
              Transaction history
            </Link>
            <Link
              href="/accounts"
              className="flex items-center gap-2 rounded-lg border px-4 py-3"
            >
              <CreditCard size={18} />
              My accounts
            </Link>
          </div>
        </section>



{ /*--------------------- Recent History ------------------*/}




        <section className="rounded-xl bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-bold">Recent transactions</h2>
          {transactions.slice(0, 5).map((t) => (
            <div
              key={t.id}
              className="flex items-center justify-between gap-3 border-b py-3 last:border-0"
            >
              <div className="flex items-center gap-3">
                {t.type === "credit" ? (
                  <ArrowDownLeft className="text-green-600" />
                ) : (
                  <ArrowUpRight className="text-red-500" />
                )}
                <div>
                  <p className="font-medium">{t.description}</p>
                  <p className="text-xs text-gray-500">
                    {t.date} · {t.status}
                  </p>
                </div>
              </div>
              <span
                className={
                  t.type === "credit"
                    ? "font-semibold text-green-600"
                    : "font-semibold text-red-600"
                }
              >
                {t.type === "credit" ? "+" : "−"}
                {money(t.amount)}
              </span>
            </div>
          ))}
          {transactions.length === 0 && (
            <p className="text-gray-500">No transactions yet.</p>
          )}
        </section>
      </div>
    </Protected>
  );
}
