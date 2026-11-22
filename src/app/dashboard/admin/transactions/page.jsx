"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { LoadingBlock, Message, PageTitle, StatusPill } from "@/components/dashboard/dashboard-parts";
import { api } from "@/lib/api";

export default function AdminTransactionsPage() {
  const [transactions, setTransactions] = useState(null);

  useEffect(() => {
    api("/admin/transactions")
      .then(setTransactions)
      .catch((err) => {
        toast.error(err.message);
        setTransactions([]);
      });
  }, []);

  return (
    <section>
      <PageTitle title="Transactions" text="Premium subscription payments from vendors." />

      {!transactions ? (
        <LoadingBlock rows={4} />
      ) : transactions.length === 0 ? (
        <Message text="No transactions yet." />
      ) : (
        <div className="mt-8 overflow-x-auto rounded-2xl border border-border bg-card">
          <table className="w-full min-w-[760px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-border text-muted-foreground">
                <th className="px-5 py-4 font-normal">Vendor</th>
                <th className="px-5 py-4 font-normal">Plan</th>
                <th className="px-5 py-4 font-normal">Amount</th>
                <th className="px-5 py-4 font-normal">Status</th>
                <th className="px-5 py-4 font-normal">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {transactions.map((transaction) => (
                <tr key={transaction._id}>
                  <td className="px-5 py-4">
                    <p className="font-medium text-foreground">{transaction.vendorName}</p>
                    <p className="text-xs text-muted-foreground">{transaction.vendorEmail}</p>
                  </td>
                  <td className="px-5 py-4 capitalize text-muted-foreground">{transaction.plan}</td>
                  <td className="px-5 py-4 text-muted-foreground">
                    {transaction.amount} {transaction.currency?.toUpperCase()}
                  </td>
                  <td className="px-5 py-4">
                    <StatusPill status={transaction.status} />
                  </td>
                  <td className="px-5 py-4 text-muted-foreground">
                    {new Date(transaction.createdAt).toLocaleDateString("en-GB")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
