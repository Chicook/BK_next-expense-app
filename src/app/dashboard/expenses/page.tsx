"use client"
import CardDetails from "@/components/card-details"
import FinancialChart from "@/components/expense-request"

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold mb-6">Gestión de Gastos</h1>
        <CardDetails />
        <FinancialChart />
      </div>
    </main>
  )
}

