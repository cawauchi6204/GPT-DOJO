import { SignUp } from "@clerk/nextjs";

export default async function SignUpPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md rounded-lg p-8 shadow-lg">
        <SignUp
          appearance={{
            elements: {
              formButtonPrimary: "bg-[#19c37d] hover:bg-[#1a8870]",
              card: "shadow-none",
              headerTitle: "hidden",
              headerSubtitle: "hidden",
              socialButtonsBlockButton: "border border-gray-300 hover:bg-gray-50",
              formFieldInput:
                "border-gray-300 focus:border-[#19c37d] focus:ring-[#19c37d]",
              footerActionLink: "text-[#19c37d] hover:text-[#1a8870]",
            },
          }}
          redirectUrl={"/courses"}
          routing="path"
          path="/sign-up"
          signInUrl="/sign-in"
        />
      </div>
    </div>
  );
}
