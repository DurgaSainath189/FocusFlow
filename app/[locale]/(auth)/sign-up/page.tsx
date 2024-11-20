import { AuthCard } from "@/components/auth/AuthCard";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Sign Up Page",
};

const SignUp = () => {
  return <AuthCard />;
};

export default SignUp;
