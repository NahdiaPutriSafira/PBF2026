import Image from "next/image";
import Link from "next/link";
import styles from "@/styles/404.module.scss";

const Custom404 = () => {
  return (
    <div className={styles.error}>
      <Image
        src="/page-not-found.png"
        alt="404 Not Found"
        width={400}
        height={200}
        className={styles.error_image}
      />

      <h1 className={styles.error_title}>
        404 - Halaman Tidak Ditemukan
      </h1>

      <p className={styles.error_desc}>
        Maaf, halaman yang Anda cari tidak tersedia atau telah dipindahkan.
      </p>

      <Link href="/" className={styles.error_button}>
        Kembali ke Home
      </Link>
    </div>
  );
};

export default Custom404;