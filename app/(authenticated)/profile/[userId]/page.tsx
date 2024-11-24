import { fetchMyBio } from "@/lib/queries";
import { UpdateBioContainer } from "@/components/UpdateBioContainer";

interface Props {
  params: Promise<{ userId: string }>;
}

const Profile = async ({ params }: Props) => {
  const { userId } = await params;

  const initialBio = await fetchMyBio();

  return (
    <main className="mx-auto max-w-screen-md px-4 py-16">
      <h1 className="text-xl font-bold">プロフィール</h1>

      <div className="mt-16">
        <UpdateBioContainer initialBio={initialBio} />
      </div>
    </main>
  );
};

export default Profile;
