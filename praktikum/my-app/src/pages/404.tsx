import styles from "@/styles/404.module.scss";

const Custom404 = () => {
    return (
        <div className={styles.error}>
            <img src="/page-not-found.svg" alt="404" className={styles.error_image}/>
            <h1> 404 - Halaman Tidak Ditemukan</h1>
            <p>Maaf, halaman yang anda cari tidak ada</p>
        </div>
    );
};
export default Custom404;