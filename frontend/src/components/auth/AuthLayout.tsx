import { AuthBanner } from "./AuthBanner";

export function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
      <div className="h-screen flex">
        <AuthBanner />
        <div className="flex w-full md:w-1/2 items-center justify-center bg-white px-6">
          {children}
        </div>
      </div>
    );
  }