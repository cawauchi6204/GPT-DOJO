import { SignUp } from "@clerk/nextjs";

export default async function SignUpPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md rounded-lg p-8 shadow-lg">
        <SignUp
          appearance={{
            elements: {
              formButtonPrimary: "bg-purple-600 hover:bg-purple-700 rounded-xl transform transition-all duration-200 hover:scale-105",
              card: "shadow-none",
              headerTitle: "hidden",
              headerSubtitle: "hidden",
              socialButtonsBlockButton: "border border-gray-300 hover:bg-gray-50 rounded-xl transition-all duration-200 hover:shadow-md",
              formFieldInput:
                "border-gray-300 focus:border-purple-600 focus:ring-purple-600 rounded-lg transition-all duration-200",
              footerActionLink: "text-purple-600 hover:text-purple-700 transition-colors duration-200",
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
