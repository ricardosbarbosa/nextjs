import { ColorSchemeToggle } from "@/components/ColorSchemeToggle/ColorSchemeToggle";
import { Welcome } from "@/components/Welcome/welcome";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      ok
      <Welcome />
      <ColorSchemeToggle />
    </main>
  );
}
