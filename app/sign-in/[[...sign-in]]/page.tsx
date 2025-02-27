import { SignIn } from "@clerk/nextjs";
 
export default function Page() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-600">
            <div className="text-2xl font-bold text-white">ES</div>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Sign in to Easy Study</h1>
          <p className="mt-2 text-gray-600">Welcome back! Please sign in to continue.</p>
        </div>
        <SignIn />
      </div>
    </div>
  );
}