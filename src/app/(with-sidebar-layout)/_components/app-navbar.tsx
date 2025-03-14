import Link from "next/link";

import paths from "@/config/paths";

import Logo from "@/components/common/logo";
import { Button } from "@/components/ui/button";
import { Navbar, NavbarSection, NavbarSpacer } from "@/components/ui/navbar";

export default function AppNavbar() {
  return (
    <Navbar>
      <Link href="/" aria-label="Home"></Link>

      <NavbarSpacer />

      <NavbarSection>
        <Link
          href={paths.home.getHref()}
          className="ml-6 transition-opacity hover:opacity-70"
        >
          <span className="sr-only">Detalk</span>
          <Logo className="text-foreground" />
        </Link>
      </NavbarSection>

      <NavbarSpacer />

      <NavbarSection>
        <Button asChild className="w-full rounded-full">
          <Link href={paths.auth.signIn.getHref()}>Sign in</Link>
        </Button>
      </NavbarSection>
    </Navbar>
  );
}
