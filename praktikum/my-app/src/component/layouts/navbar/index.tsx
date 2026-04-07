import Script from 'next/dist/client/script'; // Import dari jobsheet
import styles from './navbar.module.css';
import { signIn, signOut, useSession } from "next-auth/react"
import Image from "next/image"; // Pastikan komponen Image di-import

const Navbar = () => {
  const {data}:any = useSession()

  return (
    <div className={styles.navbar}>
      
      {/* --- MODIFIKASI PRAKTIKUM 3 DIMULAI DARI SINI --- */}
      <div className={styles.navbar__brand} id="title"></div>
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
                
                /* --- MODIFIKASI PRAKTIKUM 4 (KOTAK MERAH) DIMULAI DARI SINI --- */
                <>
                  {/* Komentar tag img lama sesuai jobsheet */}
                  {/* <img src={data.user.image} alt={data.user.fullname} className={styles.navbar__user__image} /> */}
                  
                  <Image
                    src={data.user.image}
                    alt={data.user.fullname}
                    width={50}   // Ubah menjadi 50 sesuai jobsheet
                    height={50}  // Ubah menjadi 50 sesuai jobsheet
                    className={styles.navbar__user__image}
                  />
                </>
                /* --- MODIFIKASI PRAKTIKUM 4 SELESAI --- */
                
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