"use client"

import { useState, useEffect } from "react"
import { Bar } from "react-chartjs-2"
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Ingresos y Gastos por Categoría",
    },
  },
  scales: {
    y: {
      beginAtZero: true,
    },
  },
}

type Transaction = {
  type: "income" | "expense"
  amount: number
  category: string
}

export default function ExpenseRequest() {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  })

  useEffect(() => {
    // Simular datos de transacciones
    const transactions: Transaction[] = [
      { type: "income", amount: 3000, category: "Salario" },
      { type: "expense", amount: 1000, category: "Vivienda" },
      { type: "expense", amount: 500, category: "Alimentación" },
      { type: "expense", amount: 300, category: "Transporte" },
      { type: "income", amount: 500, category: "Freelance" },
      { type: "expense", amount: 200, category: "Entretenimiento" },
    ]

    const categories = [...new Set(transactions.map((t) => t.category))]
    const incomeData = categories.map((cat) =>
      transactions.filter((t) => t.type === "income" && t.category === cat).reduce((sum, t) => sum + t.amount, 0),
    )
    const expenseData = categories.map((cat) =>
      transactions.filter((t) => t.type === "expense" && t.category === cat).reduce((sum, t) => sum + t.amount, 0),
    )

    setChartData({
      labels: categories,
      datasets: [
        {
          label: "Ingresos",
          data: incomeData,
          backgroundColor: "rgba(75, 192, 192, 0.6)",
        },
        {
          label: "Gastos",
          data: expenseData,
          backgroundColor: "rgba(255, 99, 132, 0.6)",
        },
      ],
    })
  }, [])

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="p-5">{/* El contenido del gráfico se mantendrá aquí */}</div>
      <Card>
        <CardHeader>
          <CardTitle>Resumen Financiero</CardTitle>
        </CardHeader>
        <CardContent>
          <Bar options={options} data={chartData} />
        </CardContent>
      </Card>
    </div>
  )
}

