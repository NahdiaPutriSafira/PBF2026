import { useRouter } from "next/router";
import TampilanProduk from "../views/produk";
import useSWR from "swr";
import fetcher from "../utlis/swr/fetcher";

const DetailProdukPage = () => {
  const { query, isReady } = useRouter();

  const { data, isLoading } = useSWR("/api/produk", fetcher);

  if (!isReady || isLoading) {
    return <p>Loading...</p>;
  }

  const id = query.id as string;

  return (
    <div>
      <h1>Halaman Produk {id}</h1>

      <TampilanProduk
        products={data?.data || []}
      />
    </div>
  );
};

export default DetailProdukPage;