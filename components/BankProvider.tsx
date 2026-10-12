"use client";
import { createContext, useContext, useState } from "react";
import type { Account, Transaction } from "@/types/bank";
import { initialAccounts, initialTransactions } from "@/lib/seed";

type BankContextType = {
  accounts: Account[];
  transactions: Transaction[];
  transfer: (from: string, to: string, amount: number) => string | null;
};

const BankContext = createContext<BankContextType | null>(null);

export function BankProvider({ children }: { children: React.ReactNode }) {

  const [accounts, setAccounts] = useState(initialAccounts);
  
  const [transactions, setTransactions] = useState(initialTransactions);

  function transfer(from: string, to: string, amount: number): string | null {

    const source = accounts.find((a) => a.id === from);

    const destination = accounts.find((a) => a.id === to);

    if (!source || !destination) return "Please select both accounts.";

    if (from === to) return "Source and destination must be different.";

    if (!Number.isFinite(amount) || amount <= 0)
      return "Amount must be greater than zero.";
    if (amount > source.balance) return "Insufficient available balance.";


    // Validate everything before changing any state.
    setAccounts((old) =>
      old.map((a) =>
        a.id === from
          ? { ...a, balance: a.balance - amount }
          : a.id === to
            ? { ...a, balance: a.balance + amount }
            : a,
      ),
    );

    const date = new Date().toISOString().slice(0, 10);
    const ref = `BF${Date.now()}`;
    setTransactions((old) => [
      {
        id: `${ref}-D`,
        accountId: from,
        description: `Transfer to ${destination.name}`,
        amount,
        type: "debit",
        status: "successful",
        date,
        referenceNumber: `${ref}-D`,
      },
      {
        id: `${ref}-C`,
        accountId: to,
        description: `Transfer from ${source.name}`,
        amount,
        type: "credit",
        status: "successful",
        date,
        referenceNumber: `${ref}-C`,
      },
      ...old,
    ]);
    return null;
  }

  return (
    <BankContext.Provider value={{ accounts, transactions, transfer }}>
      {children}
    </BankContext.Provider>
  );
}
export function useBank() {
  const value = useContext(BankContext);
  if (!value) throw new Error("useBank must be used inside BankProvider");
  return value;
}
