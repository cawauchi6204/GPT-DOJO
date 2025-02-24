import { SignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

export default async function SignInPage() {
  const session = await auth();

  // すでにログインしている場合は/coursesにリダイレクト
  if (session?.userId) {
    redirect("/courses");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <h1 className="mb-6 text-center text-2xl font-bold text-gray-900">
          ログイン
        </h1>
        <SignIn
          appearance={{
            elements: {
              formButtonPrimary: "bg-[#19c37d] hover:bg-[#1a8870]",
              card: "shadow-none",
              headerTitle: "hidden",
              headerSubtitle: "hidden",
              socialButtonsBlockButton:
                "border border-gray-300 hover:bg-gray-50",
              formFieldInput:
                "border-gray-300 focus:border-[#19c37d] focus:ring-[#19c37d]",
              footerActionLink: "text-[#19c37d] hover:text-[#1a8870]",
            },
          }}
          afterSignInUrl={"/courses"}
          redirectUrl={"/courses"}
          routing="path"
          path="/sign-in"
          signUpUrl="/sign-up"
        />
      </div>
    </div>
  );
}
