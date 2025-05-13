import { DefaultLayout } from "@/components/layouts/default-layout";
import { ProfileForm } from "@/components/profile/profile-form";
import { getProfile } from "./actions";
import { ProfileFooter } from "@/components/profile/profile-footer";

export default async function ProfilePage() {
  const profile = await getProfile();

  if (!profile.data || profile.error) {
    return <div>Unable to load profile</div>;
  }

  return (
    <DefaultLayout
      header={
        <div>
          <h1 className="text-2xl font-bold">Profile</h1>
          <p className="text-sm text-muted-foreground">
            View and edit your profile information.
          </p>
        </div>
      }
      footer={<ProfileFooter />}
    >
      <ProfileForm profile={profile.data} />
    </DefaultLayout>
  );
}
