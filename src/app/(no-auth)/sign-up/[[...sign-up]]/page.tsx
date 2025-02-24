import { SignUp } from '@clerk/nextjs'

export default function SignUpPage() {
  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-80px)]">
      <SignUp
        appearance={{
          elements: {
            formButtonPrimary: 'bg-indigo-600 hover:bg-indigo-700',
            footerActionLink: 'text-indigo-600 hover:text-indigo-700',
          },
        }}
        routing="path"
        path="/sign-up"
        signInUrl="/sign-in"
        afterSignUpUrl="/dashboard"
      />
    </div>
  )
}
