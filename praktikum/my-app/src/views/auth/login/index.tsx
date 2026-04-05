import Link from "next/link";
import styles from "./login.module.scss";
import { useState, FormEvent } from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";

const TampilanLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { push, query } = useRouter();

  const callbackUrl = (query.callbackUrl as string) || "/";
  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    // 1. UNCOMMENT BAGIAN INI: Beri tahu TypeScript bentuk struktur dari target form-nya
    const target = event.target as typeof event.target & {
      email: { value: string };
      password: { value: string };
    };

    try {
      const res = await signIn("credentials", {
        redirect: false,
        // 2. GUNAKAN VARIABEL 'target' YANG SUDAH DIDEKLARASIKAN DI ATAS
        email: target.email.value, 
        password: target.password.value,
        callbackUrl,
      });

      if (!res?.error) {
        setIsLoading(false);
        push(callbackUrl);
      } else {
        setIsLoading(false);
        setError(res?.error || "Login failed");
      }
    } catch (error) {
      setIsLoading(false);
      setError("Email atau password salah");
    }
  };

  return (
    <div className={styles.login}>
      {/* Tampilkan pesan error di UI. */}
      {error && <p className={styles.login__error}>{error}</p>}
      <h1 className={styles.login__title}>Halaman login</h1>

      <div className={styles.login__form}>
        <form onSubmit={handleSubmit}>
          <div className={styles.login__form__item}>
            <label
              htmlFor="email"
              className={styles.login__form__item__label}
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              className={styles.login__form__item__input}
            />
          </div>

          <div className={styles.login__form__item}>
            <label
              htmlFor="password"
              className={styles.login__form__item__label}
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              className={styles.login__form__item__input}
            />
          </div>

          <button
            type="submit"
            className={styles.login__form__item__button}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Login"}
          </button>
        </form>
        <br />
        <p className={styles.login__form__item_text}>
          Tidak punya akun? <Link href="/auth/register">Ke Halaman Register</Link>
        </p>
      </div>
    </div>
  );
};

export default TampilanLogin;