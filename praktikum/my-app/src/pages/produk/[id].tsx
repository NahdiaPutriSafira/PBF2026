import { useRouter } from "next/router";

const DetailProdukPage = () => {
    const router = useRouter();
    console.log(router);

    const { id } = router.query;

    return (
        <div>
            <h1>Detail Produk</h1>
            <p>Produk yang dipilih: {id}</p>
        </div>
    );
};

export default DetailProdukPage;