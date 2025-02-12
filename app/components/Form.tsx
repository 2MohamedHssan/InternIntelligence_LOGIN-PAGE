"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Image from "next/image";
import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

type FormField = z.infer<typeof schema>;

function AuthForm() {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormField>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormField> = async (data) => {
    await new Promise((res) => setTimeout(res, 1000));
    console.log("Form Data: ", data);
    router.push("/");
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="relative w-[800px] h-[500px] flex overflow-hidden rounded-lg shadow-lg bg-white">
        <motion.div
          initial={{ x: 0 }}
          animate={{ x: mode === "login" ? 0 : "100%" }}
          transition={{ duration: 0.5 }}
          className="absolute w-1/2 h-full left-0 top-0 flex justify-center items-center"
        >
          <Image
            src="/login.jpg"
            width={400}
            height={400}
            alt="Auth Image"
            loading="lazy"
            className="rounded-l-lg"
          />
        </motion.div>

        <motion.div
          initial={{ x: 0 }}
          animate={{ x: mode === "login" ? "100%" : 0 }}
          transition={{ duration: 0.5 }}
          className="relative w-1/2 h-full flex flex-col justify-center p-12"
        >
        <div className="font-bold mt-4 mb-10">TYLET</div>
          <h2 className="text-2xl font-bold my-4 ">
            {mode === "login" ? "Log In" : "Sign Up"}
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            {mode === "login"
              ? "Enter your email and password to log in."
              : "Create an account to join us."}
          </p>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700">
                Email
              </label>
              <input
                id="email"
                type="email"
                {...register("email")}
                className="block border-2 py-1 rounded-md w-full px-2 border-gray-300 focus:border-blue-500 outline-none"
                placeholder="Enter your email"
              />
              {errors.email && (
                <div className="text-red-500 text-sm">{errors.email.message}</div>
              )}
            </div>

            <div className="mb-4 relative">
              <label htmlFor="password" className="block text-gray-700">
                Password
              </label>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                {...register("password")}
                className="block border-2 py-1 rounded-md w-full px-2 border-gray-300 focus:border-blue-500 outline-none"
                placeholder="Enter a strong password"
              />
              {showPassword ? (
                <Eye
                  onClick={() => setShowPassword(false)}
                  className="absolute right-3 top-9 cursor-pointer"
                  size={18}
                />
              ) : (
                <EyeOff
                  onClick={() => setShowPassword(true)}
                  className="absolute right-3 top-9 cursor-pointer"
                  size={18}
                />
              )}
              {errors.password && (
                <div className="text-red-500 text-sm">{errors.password.message}</div>
              )}
            </div>
              <div className="flex gap-2 items-center">
                <input type="checkbox" id="chek" />
                <label htmlFor="chek" className="text-gray-500 my-2 cursor-pointer"> remember me</label>
              </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-600 shadow-md hover:bg-blue-700 text-white px-4 py-2 w-full rounded-md transition"
            >
              {isSubmitting ? "Loading..." : mode === "login" ? "Sign In" : "Sign Up"}
            </button>
          </form>

          <div className="text-center mt-4">
            {mode === "login" ? (
              <p className="text-sm text-start text-gray-500">
                Don&apos;t have an account?
                <button
                  onClick={() => setMode("register")}
                  className="text-blue-500 hover:text-blue-700 transition"
                >
                  Sign Up
                </button>
                <Link href="/forgetpassword" className="my-2 block text-blue-400 cursor-pointer font-bold hover:text-blue-500">forget password</Link>
              </p>
            ) : (
              <p className="text-sm text-start text-gray-500">
                Already have an account?{" "}
                <button
                  onClick={() => setMode("login")}
                  className="text-blue-500 hover:text-blue-700 transition"
                >
                  Sign In
                </button>
              </p>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default AuthForm;
