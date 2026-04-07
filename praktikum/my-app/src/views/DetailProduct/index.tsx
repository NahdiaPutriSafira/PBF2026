// import {ProductType} from "@/types/Product.type";
import { ProductType } from "../../types/Product.type";
import styles from "@/views/DetailProduct/detailProduct.module.scss";
import Image from "next/image"; // ✅ 1. Import komponen Image

const DetailProduk = ({ products }: { products: ProductType }) => {
  return (
    <>
      <h1 className={styles.title}>Detail Produk</h1>
      <div className={styles.produkdetail}>
        <div className={styles.produkdetail__image}>
          
          {/* Tag img lama kita matikan/komentar */}
          {/* <img src={products.image && products.image} alt={products.name} /> */}

          {/* ✅ 2. Gunakan komponen Image dengan width & height */}
          {products.image && (
            <Image 
              src={products.image} 
              alt={products.name} 
              width={400}  // Ukuran width bisa kamu sesuaikan
              height={400} // Ukuran height bisa kamu sesuaikan
            />
          )}

        </div>

        <div className={styles.produkdetail__info}>
          <h1 className={styles.produkdetail__name}>{products.name}</h1>
          <p className={styles.produkdetail__category}>{products.category}</p>
          <p className={styles.produkdetail__price}>
            Rp {products.price && products.price.toLocaleString("id-ID")}
          </p>
        </div>
      </div>
    </>
  );
};

export default DetailProduk;