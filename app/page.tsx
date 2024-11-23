import Link from "next/link";
import type { Session } from "next-auth";
import { auth } from "@/auth";

const SessionDisplay = ({ session }: { session: Session | null }) => {
  if (!session) {
    return <p>ユーザー情報の取得に失敗しました</p>;
  }

  const { id, name } = session.user;

  return (
    <div>
      <p>
        ようこそ
        <Link
          href={`/profile/${id}`}
          className="mx-2 text-sky-800 font-medium underline hover:text-sky-600 hover:no-underline"
        >
          {name}
        </Link>
        さん
      </p>
    </div>
  );
};

const Home = async () => {
  const session = await auth();

  return (
    <main className="mx-auto max-w-screen-md px-4 py-16">
      <h1 className="text-xl font-bold">カスタムフックの学習</h1>

      <div className="mt-16">
        <SessionDisplay session={session} />
      </div>
    </main>
  );
};

export default Home;
