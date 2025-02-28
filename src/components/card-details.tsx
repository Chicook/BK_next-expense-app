import type React from "react"
import { useState } from "react"
import { MoreHorizontal, PlusCircle, MinusCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { TransactionForm } from "./transaction-form"

// Define transaction type
type Transaction = {
  id: string
  type: "income" | "expense"
  amount: number
  description: string
  category: string
  date: string
}

export default function CardDetails() {
  // State for transactions list
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: "1",
      type: "expense",
      amount: 1200,
      description: "Rent payment",
      category: "Housing",
      date: "2024-06-01",
    },
    {
      id: "2",
      type: "income",
      amount: 3500,
      description: "Salary",
      category: "Work",
      date: "2024-06-01",
    },
    {
      id: "3",
      type: "expense",
      amount: 248.12,
      description: "Groceries",
      category: "Food",
      date: "2024-06-02",
    },
  ])

  // Calculate totals
  const totalIncome = transactions.filter((t) => t.type === "income").reduce((sum, t) => sum + t.amount, 0)
  const totalExpenses = transactions.filter((t) => t.type === "expense").reduce((sum, t) => sum + t.amount, 0)
  const balance = totalIncome - totalExpenses
  const spendPercentage = totalIncome > 0 ? (totalExpenses / totalIncome) * 100 : 0

  // Handle new transaction
  const handleNewTransaction = (transaction: Transaction) => {
    setTransactions([transaction, ...transactions])
  }

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_220px]">
        {/* Left side - Form and transactions */}
        <div className="p-5 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="font-medium text-lg">Registro de ingresos y gastos</h2>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Actions</span>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Transaction form */}
          <TransactionForm onSubmit={handleNewTransaction} />

          <div className="space-y-3 pt-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Balance total</span>
              <span className={`font-medium ${balance >= 0 ? "text-green-600" : "text-red-600"}`}>
                ${balance.toFixed(2)}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Resumen</span>
              <div className="text-right">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Ingresos:</span>
                  <span className="font-medium text-green-600">${totalIncome.toFixed(2)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Gastos:</span>
                  <span className="font-medium text-red-600">${totalExpenses.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <Progress value={spendPercentage} className="h-2" />
          </div>

          {/* Transactions list */}
          <div className="mt-6">
            <h3 className="font-medium mb-3">Transacciones recientes</h3>
            <div className="space-y-2">
              {transactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-3 border rounded-md hover:bg-gray-50"
                >
                  <div className="flex items-center gap-3">
                    {transaction.type === "income" ? (
                      <PlusCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <MinusCircle className="h-5 w-5 text-red-500" />
                    )}
                    <div>
                      <p className="font-medium">{transaction.description}</p>
                      <p className="text-xs text-muted-foreground">
                        {transaction.category} • {transaction.date}
                      </p>
                    </div>
                  </div>
                  <span className={`font-medium ${transaction.type === "income" ? "text-green-600" : "text-red-600"}`}>
                    {transaction.type === "income" ? "+" : "-"}${transaction.amount.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right side - Card preview */}
        <div className="bg-blue-100 p-5 flex flex-col justify-between">
          <div className="space-y-1">
            <h3 className="font-medium">Balance</h3>
            <Badge
              className={`${balance >= 0 ? "bg-green-600" : "bg-red-600"} text-white hover:${balance >= 0 ? "bg-green-700" : "bg-red-700"}`}
            >
              ${balance.toFixed(2)}
            </Badge>
          </div>

          <div className="space-y-4">
            <div className="bg-white/80 rounded-md p-3">
              <h4 className="text-sm font-medium mb-1">Ingresos totales</h4>
              <p className="text-green-600 font-bold">${totalIncome.toFixed(2)}</p>
            </div>

            <div className="bg-white/80 rounded-md p-3">
              <h4 className="text-sm font-medium mb-1">Gastos totales</h4>
              <p className="text-red-600 font-bold">${totalExpenses.toFixed(2)}</p>
            </div>

            <div className="text-xs text-center mt-4">
              {new Date().toLocaleDateString("es-ES", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

