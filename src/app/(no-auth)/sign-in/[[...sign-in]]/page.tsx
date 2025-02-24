import { SignIn } from '@clerk/nextjs'

export default function SignInPage() {
  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-80px)]">
      <SignIn
        appearance={{
          elements: {
            formButtonPrimary: 'bg-indigo-600 hover:bg-indigo-700',
            footerActionLink: 'text-indigo-600 hover:text-indigo-700',
          },
        }}
        routing="path"
        path="/sign-in"
        signUpUrl="/sign-up"
        afterSignInUrl="/dashboard"
      />
    </div>
  )
}
