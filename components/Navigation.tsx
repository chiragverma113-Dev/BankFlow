"use client";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { LayoutDashboard, Wallet, History, Send, LogOut } from "lucide-react";

export default function Navigation() {
  const router = useRouter();
  const pathname = usePathname();
  function logout() {
    sessionStorage.removeItem("loggedIn");
    router.replace("/login");
  }
  const links = [
    { href: "/dashboard", label: "Dashboard", Icon: LayoutDashboard },
    { href: "/accounts", label: "Accounts", Icon: Wallet },
    { href: "/transactions", label: "Transactions", Icon: History },
    { href: "/transfer", label: "Transfer", Icon: Send },
  ];


  return (
    <header className="bg-white shadow-sm">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-4">
        <Link href="/dashboard" className="text-xl font-bold text-indigo-600">
          BankFlow
        </Link>


       <nav className="flex flex-wrap items-center gap-2">
      {links.map(({ href, label, Icon }) => {
        const isActive = pathname === href;

        return (
          <Link
            key={href}
            href={href}
            aria-current={isActive ? "page" : undefined}
            className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors ${
              isActive
                ? "bg-indigo-600 text-white font-semibold shadow-sm"
                : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-700"
            }`}
          >
            <Icon size={17} />
            <span>{label}</span>
          </Link>
        );
      })}

      <button
        onClick={logout}
        className="flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2 text-sm hover:bg-red-50 hover:text-red-600"
      >
        <LogOut size={17} />
        Logout
      </button>
    </nav>
  </div>
</header>

);}