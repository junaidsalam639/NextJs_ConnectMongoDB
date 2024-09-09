import EditUserForm from "../../components/EditUserForm";

export async function generateStaticParams() {
  const posts = await fetch("http://localhost:3000/api/users").then((res) =>
    res.json()
  );
  return posts?.users?.map((post) => ({
    id: post._id,
  }));
}

export default async function EditUserPage({ params }) {
  const fetchData = async () => {
    const getUser = await fetch(
      `http://localhost:3000/api/users/${params?.id}`, {
        cache: "no-store",
      }
    );
    const data = await getUser.json();
    return data;
  };
  const data = await fetchData();

  return (
    <EditUserForm data={data} />
  );
}
