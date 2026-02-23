import { useRouter } from "next/router";

const CategoryPage = () => {
  const { query } = useRouter();
  const slugArray = Array.isArray(query.slug) ? query.slug : [];

  return (
    <div>
      <h1>Halaman Category</h1>

      <ul>
        {slugArray.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryPage;