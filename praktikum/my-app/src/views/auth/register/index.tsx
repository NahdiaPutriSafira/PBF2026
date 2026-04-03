import Link from "next/link";
import style from "../../auth/register/register.module.scss"
import { LoadBundleTask } from "firebase/firestore";

const TampilanRegister = () => {
  return (
    <div className={style.register}>
      <h1 className={style.register__title}>Halaman Register</h1>

      <div className={style.register__form}>
        <form>
          <div className={style.register__form__item}>
            <label
              htmlFor="email"
              className={style.register__form__item__label}
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              className={style.register__form__item__input}
            />
          </div>

          <div className={style.register__form__item}>
            <label
              htmlFor="fullname"
              className={style.register__form__item__label}
            >
              Fullname
            </label>
            <input
              type="text"
              id="fullname"
              name="fullname"
              placeholder="Fullname"
              className={style.register__form__item__input}
            />
          </div>

          <div className={style.register__form__item}>
            <label
              htmlFor="password"
              className={style.register__form__item__label}
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              className={style.register__form__item__input}
            />
          </div>

          <button type="submit">Register</button>
        </form>

        <br />

        <p>
          Sudah punya akun?{" "}
          <Link href="/auth/login">Ke halaman Login</Link>
        </p>
      </div>
    </div>
  );
};

export default TampilanRegister;