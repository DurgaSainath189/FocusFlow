import { AuthCard } from "@/components/auth/AuthCard";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign In Page",
};

const SignIn = () => {
  return <AuthCard signInCard />;
};

export default SignIn;
