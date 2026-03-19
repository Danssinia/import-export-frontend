"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

// ---------------- Validation Schema ----------------
const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  phone: z.string().regex(/^\+?\d{10,15}$/, "Invalid phone number")
})

type FormData = z.infer<typeof schema>

export default function RegisterPage() {

  const router = useRouter()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(schema)
  })

  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)
  const [resp, setResp] = useState("")
  const [type, setType] = useState<"success" | "error" | "">("")

  const onSubmit = async (data: FormData) => {

    try {

      setLoading(true)

      const res = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      })

      const result = await res.json()

      if (res.ok) {

        setResp(result.message || "Account created successfully")
        setType("success")

        reset()

        setTimeout(() => router.push("/login"), 2000)

      } else {

        setResp(result.message || "Registration failed")
        setType("error")

      }

      setLoading(false)
      setTimeout(() => setResp(""), 3000)

    } catch {

      setResp("Server error")
      setType("error")
      setLoading(false)

    }

  }

  return (

    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-6">

      {/* Toast */}
      {resp && (
        <div
          className={`fixed top-5 right-5 px-6 py-3 rounded-lg shadow-lg text-white font-semibold
          ${type === "success" ? "bg-green-600" : "bg-red-600"}
          animate-slide`}
        >
          {resp}
        </div>
      )}

      {/* Card */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-[420px] bg-white p-10 rounded-2xl border border-gray-200 shadow-sm"
      >

        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-900 mb-2 text-center">
          Create Account
        </h1>

        <p className="text-center text-gray-600 mb-8">
          Join the DANALEM platform
        </p>

        <div className="space-y-5">

          {/* Name */}
          <div>
            <input
              {...register("name")}
              placeholder="Full Name"
              className={`w-full p-3 rounded-lg border outline-none transition
              ${
                errors.name
                  ? "border-red-500 focus:ring-2 focus:ring-red-400"
                  : "border-gray-300 focus:ring-2 focus:ring-indigo-500"
              }`}
            />

            {errors.name && (
              <p className="text-red-500 text-sm mt-1">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <input
              {...register("email")}
              placeholder="Email address"
              className={`w-full p-3 rounded-lg border outline-none transition
              ${
                errors.email
                  ? "border-red-500 focus:ring-2 focus:ring-red-400"
                  : "border-gray-300 focus:ring-2 focus:ring-indigo-500"
              }`}
            />

            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="relative">

            <input
              type={show ? "text" : "password"}
              {...register("password")}
              placeholder="Password"
              className={`w-full p-3 rounded-lg border outline-none transition
              ${
                errors.password
                  ? "border-red-500 focus:ring-2 focus:ring-red-400"
                  : "border-gray-300 focus:ring-2 focus:ring-indigo-500"
              }`}
            />

            <button
              type="button"
              onClick={() => setShow(!show)}
              className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
            >
              {show ? "🙈" : "👁"}
            </button>

            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Address */}
          <div>
            <input
              {...register("address")}
              placeholder="Address"
              className={`w-full p-3 rounded-lg border outline-none transition
              ${
                errors.address
                  ? "border-red-500 focus:ring-2 focus:ring-red-400"
                  : "border-gray-300 focus:ring-2 focus:ring-indigo-500"
              }`}
            />

            {errors.address && (
              <p className="text-red-500 text-sm mt-1">
                {errors.address.message}
              </p>
            )}
          </div>

          {/* Phone */}
          <div>
            <input
              {...register("phone")}
              placeholder="Phone number"
              className={`w-full p-3 rounded-lg border outline-none transition
              ${
                errors.phone
                  ? "border-red-500 focus:ring-2 focus:ring-red-400"
                  : "border-gray-300 focus:ring-2 focus:ring-indigo-500"
              }`}
            />

            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">
                {errors.phone.message}
              </p>
            )}
          </div>

          {/* Button */}
          <button
            disabled={loading}
            className="w-full p-3 rounded-lg bg-blue-900 text-white  font-semibold hover:bg-blue-800 transition disabled:opacity-50"
          >
            {loading ? "Creating..." : "Register"}
          </button>

        </div>

        {/* Login */}
        <p className="text-center text-gray-600 mt-6">

          Already have an account?{" "}

          <span
            className="cursor-pointer font-semibold text-blue-800 hover:text-indigo-700"
            onClick={() => router.push("/login")}
          >
            Login
          </span>

        </p>

      </form>

      <style jsx>{`
        @keyframes slide {
          from { transform: translateX(120%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        .animate-slide { animation: slide 0.3s ease; }
      `}</style>

    </div>
  )
}