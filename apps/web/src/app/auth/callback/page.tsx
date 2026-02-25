"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { API_ROUTES } from "@nemesis/shared";

export default function CallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState("Processing...");

  useEffect(() => {
    const code = searchParams.get("code");
    const errorParam = searchParams.get("error");
    const errorDescription = searchParams.get("error_description");

    if (errorParam) {
      setError(errorDescription || errorParam);
      return;
    }

    if (!code) {
      setError("No authorization code received");
      return;
    }

    // Exchange code for tokens
    exchangeCode(code);
  }, [searchParams]);

  async function exchangeCode(code: string) {
    try {
      setStatus("Authenticating with Microsoft...");
      
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
      const response = await fetch(`${apiUrl}${API_ROUTES.AUTH_CALLBACK}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });

      const data = await response.json();

      if (!data.success) {
        setError(data.error?.message || "Authentication failed");
        return;
      }

      setStatus("Authentication successful!");
      
      // Store tokens (in a real app, use httpOnly cookies)
      localStorage.setItem("accessToken", data.data.accessToken);
      localStorage.setItem("refreshToken", data.data.refreshToken);
      localStorage.setItem("user", JSON.stringify(data.data.user));

      // Redirect to dashboard
      setTimeout(() => {
        router.push("/dashboard");
      }, 1500);

    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center max-w-md">
        {error ? (
          <>
            <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold mb-2">Authentication Failed</h1>
            <p className="text-red-400 mb-6">{error}</p>
            <a
              href="/auth/login"
              className="inline-block px-6 py-3 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors"
            >
              Try Again
            </a>
          </>
        ) : (
          <>
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500 mx-auto mb-6"></div>
            <h1 className="text-2xl font-bold mb-2">{status}</h1>
            <p className="text-slate-400">Please wait...</p>
          </>
        )}
      </div>
    </div>
  );
}
