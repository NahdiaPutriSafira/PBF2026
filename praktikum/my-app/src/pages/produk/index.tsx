import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import TampilanProduk from "../../views/produk";
import useSWR from "swr";
import fetcher from "../../utlis/swr/fetcher";

//const fetcher = (url: string) => fetch(url).then((res)=> res.json());

const Kategori = () => {
  // const [isLogin, setIsLogin] = useState(false);

  const [products, setProducts] = useState([]);
  // console.log("products:", products);

  const { data, error, isLoading } = useSWR("/api/produk", fetcher);
  // cek apakah data, error, dan isLoading sudah benar
  // console.log("data:", data);
  // console.log("error:", error);
  // console.log("isLoading:", isLoading);

  return (
    <div>
      <TampilanProduk products={isLoading ? [] : data?.data} />
    </div>
  );
};

export default Kategori;