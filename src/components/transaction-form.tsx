"use client"

import type React from "react"
import { useState } from "react"
import { PlusCircle, MinusCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Define transaction type
type Transaction = {
  id: string
  type: "income" | "expense"
  amount: number
  description: string
  category: string
  date: string
}

interface TransactionFormProps {
  onSubmit: (transaction: Transaction) => void
}

export function TransactionForm({ onSubmit }: TransactionFormProps) {
  const [amount, setAmount] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  const [category, setCategory] = useState<string>("")
  const [transactionType, setTransactionType] = useState<"income" | "expense">("expense")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!amount || !description || !category) return

    const newTransaction: Transaction = {
      id: Date.now().toString(),
      type: transactionType,
      amount: Number.parseFloat(amount),
      description,
      category,
      date: new Date().toISOString().split("T")[0],
    }

    onSubmit(newTransaction)

    // Reset form
    setAmount("")
    setDescription("")
    setCategory("")
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 border rounded-md p-4">
      <div className="space-y-2">
        <Label>Tipo de transacción</Label>
        <RadioGroup
          defaultValue="expense"
          className="flex gap-4"
          value={transactionType}
          onValueChange={(value) => setTransactionType(value as "income" | "expense")}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="income" id="income" />
            <Label htmlFor="income" className="flex items-center gap-1 cursor-pointer">
              <PlusCircle className="h-4 w-4 text-green-500" />
              Ingreso
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="expense" id="expense" />
            <Label htmlFor="expense" className="flex items-center gap-1 cursor-pointer">
              <MinusCircle className="h-4 w-4 text-red-500" />
              Gasto
            </Label>
          </div>
        </RadioGroup>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="amount">Monto</Label>
          <Input
            id="amount"
            type="number"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">Categoría</Label>
          <Select value={category} onValueChange={setCategory} required>
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar categoría" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Housing">Vivienda</SelectItem>
              <SelectItem value="Food">Alimentación</SelectItem>
              <SelectItem value="Transport">Transporte</SelectItem>
              <SelectItem value="Entertainment">Entretenimiento</SelectItem>
              <SelectItem value="Work">Trabajo</SelectItem>
              <SelectItem value="Other">Otro</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Descripción</Label>
        <Input
          id="description"
          placeholder="Descripción de la transacción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>

      <Button type="submit" className="w-full">
        {transactionType === "income" ? "Agregar Ingreso" : "Agregar Gasto"}
      </Button>
    </form>
  )
} 