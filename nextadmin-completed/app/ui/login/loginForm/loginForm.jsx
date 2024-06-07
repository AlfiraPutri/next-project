"use client";

import { authenticate } from "@/app/lib/actions";
import styles from "./loginForm.module.css";
import { useFormState } from "react-dom";
import { redirect } from "next/dist/server/api-utils";

const LoginForm = () => {
  // const [state, formAction] = useFormState(authenticate, undefined);
const handleSubmit= async(e)=>{
e.preventDefault();
const res = await signIn('credentials',{
  redirect: false,email, password
})
}
  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h1>Login</h1>
      <input type="text" placeholder="username" name="username" />
      <input type="password" placeholder="password" name="password" />
      <button>Login</button>
      {state && state}
    </form>
  );
};

export default LoginForm;
