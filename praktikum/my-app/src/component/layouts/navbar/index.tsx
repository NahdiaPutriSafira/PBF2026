import Script from 'next/dist/client/script'; // Import dari jobsheet
import styles from './navbar.module.css';
import { signIn, signOut, useSession } from "next-auth/react"
import Image from "next/image";

const Navbar = () => {
  const {data}:any = useSession()

  return (
    <div className={styles.navbar}>
      
      {/* --- MODIFIKASI PRAKTIKUM 3 DIMULAI DARI SINI --- */}
      {/* Komentar kode lama agar tidak dieksekusi: 
      <div className={styles.navbar__brand}>
        MyApp
      </div> 
      */}

      {/* Tambahkan elemen kosong dengan id="title" */}
      <div className={styles.navbar__brand} id="title"></div>
      
      {/* Tambahkan Script untuk mengisi innerHTML dari id="title" */}
      <Script id="title-script" strategy="lazyOnload">
        {`document.getElementById('title').innerHTML = 'MyApp';`}
      </Script>
      {/* --- MODIFIKASI PRAKTIKUM 3 SELESAI --- */}

      <div className={styles.navbar__right}>
        {data ? (
          <>
            <div className={styles.navbar__user}>
              Welcome, {data.user?.fullname}
              {data.user.image && (
                <Image
                  src={data.user.image}
                  alt={data.user.fullname}
                  width={40}
                  height={40}
                  className={styles.navbar__user__image}
                  />
              )}
            </div>
            <button
              className={`${styles.navbar__button} ${styles["navbar__button--danger"]}`}
              onClick={() => signOut()}
            >
              Sign Out
            </button>
          </>
        ) : (
          <button
            className={`${styles.navbar__button} ${styles["navbar__button--primary"]}`}
            onClick={() => signIn()}
          >
            Sign In
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;