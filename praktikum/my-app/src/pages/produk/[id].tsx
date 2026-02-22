import { useRouter } from "next/router";

const DetailProdukPage = () => {
    // const router = useRouter();
    // console.log(router);

    const { query } = useRouter();

    return (
        <div>
            <h1>Detail Produk</h1>
            <p>Produk yang dipilih: {query.id}</p>
        </div>
    );
};

export default DetailProdukPage;