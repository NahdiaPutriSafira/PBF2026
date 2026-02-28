import Link from "next/link";
import styles from "./register.module.css";

const HalamanRegister = () => {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Halaman Register</h1>

        <input
          type="text"
          placeholder="Nama Lengkap"
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
        />

        <input
          type="email"
          placeholder="Email"
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
        />

        <input
          type="password"
          placeholder="Password"
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
        />

        <button
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#0070f3",
            color: "white",
            border: "none",
            borderRadius: "8px",
          }}
        >
          Daftar
        </button>

        <br />

        <Link href="/auth/login" className={styles.link}>
          Ke Halaman Login
        </Link>
      </div>
    </div>
  );
};

export default HalamanRegister;