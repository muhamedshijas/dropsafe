import RedirectIfAuth from "../../../redirectRoutes";

export default function RegisterPage() {
  return (
    <RedirectIfAuth>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
          <h2 className="text-2xl font-semibold mb-4">Register</h2>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Name"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              type="submit"
              className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition"
            >
              Register
            </button>
            <div className="flex flex-row items-center gap-2">
              <p>already have an account?</p>
              <a
                href="/login"
                className="text-blue-700 font-bold hover:underline"
              >
                login
              </a>
            </div>
          </form>
        </div>
      </div>
    </RedirectIfAuth>
  );
}
