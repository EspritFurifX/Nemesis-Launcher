import { redirect } from "next/navigation";
import { API_ROUTES } from "@nemesis/shared";

export default async function LoginPage() {
  // Redirect to Microsoft OAuth via API
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
  
  try {
    const response = await fetch(`${apiUrl}${API_ROUTES.AUTH_LOGIN}?redirect=web`, {
      cache: "no-store",
    });
    const data = await response.json();
    
    if (data.success && data.data?.authUrl) {
      redirect(data.data.authUrl);
    }
  } catch (error) {
    console.error("Failed to get auth URL:", error);
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500 mx-auto mb-4"></div>
        <p className="text-slate-400">Redirecting to Microsoft login...</p>
      </div>
    </div>
  );
}
