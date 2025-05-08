import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="max-w-4xl mx-auto min-h-screen flex flex-col">
      <nav className="py-1 border-b border-gray-300 sticky top-0 bg-background">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <Link href="/app/workouts">Workouts</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <Link href="/app/creator">Builder</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <Link href="/app/profile">Profile</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem className="ml-auto">
              <form action="/auth/signout" method="post">
                <button className={navigationMenuTriggerStyle()} type="submit">
                  Sign out
                </button>
              </form>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </nav>
      <main className="px-4 flex flex-1">{children}</main>
    </div>
  );
}
