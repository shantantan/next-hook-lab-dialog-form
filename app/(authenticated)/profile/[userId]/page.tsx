interface Props {
  params: Promise<{ userId: string }>;
}

const Profile = async ({ params }: Props) => {
  const { userId } = await params;

  return (
    <main className="mx-auto max-w-screen-md px-4 py-16">
      <h1 className="text-xl font-bold">プロフィール</h1>
    </main>
  );
};

export default Profile;
