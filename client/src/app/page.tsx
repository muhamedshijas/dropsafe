import ProtectedRoute from "../../protectedRoute";

export default function HomePage() {
  return (
    <ProtectedRoute>
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-400 to-blue-500 text-white">
        <h1 className="text-4xl font-bold">✅ Tailwind is Working!</h1>
      </main>
    </ProtectedRoute>
  );
}
