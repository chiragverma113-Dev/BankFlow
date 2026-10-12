"use client";
import { useMemo, useState } from "react";
import Protected from "@/components/Protected";
import { useBank } from "@/components/BankProvider";

const money = (n: number) =>
  n.toLocaleString("en-IN", { style: "currency", currency: "INR" });

export default function TransactionsPage() {
  const { transactions, accounts } = useBank();
  const [search, setSearch] = useState("");
  const [type, setType] = useState("all");
  const [status, setStatus] = useState("all");
  const [sort, setSort] = useState("date");
  const [page, setPage] = useState(1);
  const size = 5;
  const filtered = useMemo(
    () =>
      transactions
        .filter(
          (t) =>
            t.description.toLowerCase().includes(search.toLowerCase()) &&
            (type === "all" || t.type === type) &&
            (status === "all" || t.status === status),
        )
        .sort((a, b) =>
          sort === "amount"
            ? b.amount - a.amount
            : new Date(b.date).getTime() - new Date(a.date).getTime(),
        ),
    [transactions, search, type, status, sort],
  );
  const pages = Math.max(1, Math.ceil(filtered.length / size));
  const rows = filtered.slice((page - 1) * size, page * size);
  function changeFilter(setter: (v: string) => void, v: string) {
    setter(v);
    setPage(1);
  }

  const hasActiveFilters =
    search !== "" || type !== "all" || status !== "all" || sort !== "date";

  function clearFilters() {
    setSearch("");
    setType("all");
    setStatus("all");
    setSort("date");
    setPage(1);
  }

  // console.log(rows, "ggggggggggggggggggg")

  return (
    <Protected>
      <div className="mx-auto max-w-6xl space-y-5 p-5 md:p-8">
        <h1 className="text-3xl font-bold">Transaction history</h1>

        {/*----------------------- Filters -----------------------------*/}

        <div
          className={`grid gap-3 sm:grid-cols-2 ${
            hasActiveFilters ? "lg:grid-cols-5" : "lg:grid-cols-4"
          }`}
        >
          <input
            aria-label="Search description"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Search description..."
            className="rounded-lg border bg-white p-3"
          />
          <select
            aria-label="Filter type"
            value={type}
            onChange={(e) => changeFilter(setType, e.target.value)}
            className="rounded-lg border bg-white p-3"
          >
            <option value="all">All types</option>
            <option value="credit">Credit</option>
            <option value="debit">Debit</option>
          </select>
          <select
            aria-label="Filter status"
            value={status}
            onChange={(e) => changeFilter(setStatus, e.target.value)}
            className="rounded-lg border bg-white p-3"
          >
            <option value="all">All statuses</option>
            <option value="successful">Successful</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
          </select>
          <select
            aria-label="Sort transactions"
            value={sort}
            onChange={(e) => changeFilter(setSort, e.target.value)}
            className="rounded-lg border bg-white p-3"
          >
            <option value="date">Newest date</option>
            <option value="amount">Amount: high to low</option>
          </select>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="flex items-center justify-center gap-2 rounded-lg border 
                           border-red-200 bg-white px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
            >
              ✕ Clear filters
            </button>
          )}
        </div>

        {/*------------------- Table Data -----------------------*/}

        <div className="overflow-x-auto rounded-xl bg-white shadow-sm">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                {[
                  "Description",
                  "Account",
                  "Date",
                  "Type",
                  "Status",
                  "Amount",
                  "Reference",
                ].map((h) => (
                  <th key={h} className="px-4 py-3 font-semibold">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((t) => (
                <tr key={t.id} className="border-t">
                  <td className="px-4 py-4 font-medium">{t.description}</td>
                  <td className="px-4 py-4">
                    {accounts.find((a) => a.id === t.accountId)?.name ??
                      "Unknown"}
                  </td>
                  <td className="px-4 py-4">{t.date}</td>
                  <td className="px-4 py-4 capitalize">{t.type}</td>
                  <td className="px-4 py-4 capitalize">{t.status}</td>
                  <td
                    className={`px-4 py-4 font-semibold ${t.type === "credit" ? "text-green-600" : "text-red-600"}`}
                  >
                    {t.type === "credit" ? "+" : "−"}
                    {money(t.amount)}
                  </td>
                  <td className="px-4 py-4">{t.referenceNumber}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {!rows.length && (
            <p className="p-8 text-center text-gray-500">
              No transactions match your filters.
            </p>
          )}
        </div>
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">
            {filtered.length} transaction(s) found
          </p>
          <div className="flex items-center gap-3">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="rounded border bg-white px-3 py-2 disabled:opacity-40"
            >
              Previous
            </button>
            <span className="text-sm">
              Page {page} / {pages}
            </span>
            <button
              disabled={page >= pages}
              onClick={() => setPage((p) => p + 1)}
              className="rounded border bg-white px-3 py-2 disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </Protected>
  );
}
