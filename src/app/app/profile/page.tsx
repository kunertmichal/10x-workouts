import { PageWithStickyFooter } from "@/components/layouts/PageWithStickyFooter";
import { ProfileForm } from "@/components/profile/profile-form";
import { getProfile } from "./actions";
import { Button } from "@/components/ui/button";

export default async function ProfilePage() {
  const profile = await getProfile();

  if (!profile.data || profile.error) {
    return <div>Unable to load profile</div>;
  }

  return (
    <PageWithStickyFooter
      renderHeader={() => (
        <div>
          <h1 className="text-2xl font-bold">Profile</h1>
          <p className="text-sm text-muted-foreground">
            View and edit your profile information.
          </p>
        </div>
      )}
      footer={
        <div className="flex justify-end gap-4">
          <Button variant="outline" type="reset" form="profile-form">
            Reset
          </Button>
          <Button type="submit" form="profile-form">
            Save
          </Button>
        </div>
      }
    >
      <ProfileForm profile={profile.data} />
    </PageWithStickyFooter>
  );
}
