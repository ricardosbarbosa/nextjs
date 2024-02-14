import { signOut } from "@/auth";
import { ColorSchemeToggle } from "@/components/ColorSchemeToggle/ColorSchemeToggle";
import { Welcome } from "@/components/Welcome/welcome";
import { Button } from "@mantine/core";


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Button type='submit'>whatsapp</Button>
    </main>
  );
}
