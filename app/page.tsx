import { NameGenerator } from "@/components/name-generator"

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 py-6 px-4">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-slate-800">International Name Generator</h1>
          <p className="mt-2 text-sm text-slate-600">Discover beautiful Chinese names from around the world</p>
        </div>

        <NameGenerator />
      </div>
    </main>
  )
}
