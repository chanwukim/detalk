import Link from "next/link";

import paths from "@/config/paths";

import Logo from "@/components/common/logo";

export default function AuthLayout({ children }: React.PropsWithChildren) {
  return (
    <div className="to-w from-primary/40 flex min-h-svh flex-1 flex-col items-center bg-gradient-to-t">
      <header className="mx-auto w-full max-w-screen-lg">
        <div className="px-4 py-6">
          <Link
            href={paths.home.getHref()}
            className="inline-flex items-center gap-2"
          >
            <Logo size={32} />
            <span className="text-2xl font-bold">Detalk</span>
          </Link>
        </div>
      </header>

      <main className="mx-auto w-full max-w-screen-lg flex-1">
        <div className="px-4 py-6">{children}</div>
      </main>

      <footer className="mx-auto w-full max-w-screen-lg">
        <div className="px-4 py-6">
          <Link
            href={paths.home.getHref()}
            className="text-foreground-on-muted text-center text-sm"
          >
            © Detalk
          </Link>
        </div>
      </footer>
    </div>
  );
}
