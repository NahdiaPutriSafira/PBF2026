import {useRouter} from "next/router";


const halamanToko = () => {
    // const router = useRouter();
    // console.log(router);
    const {query} = useRouter();
    return (
        <div>
            <h1>Halaman Toko</h1>
            {/*<p>
        Toko: {`${query.slug && query.slug[0]} - ${query.slug && query.slug[1]}`}
      </p> {/* menggunakan backtick bukan petik satu */}
      <p>
        Toko: {Array.isArray (query.slug)? query.slug.join("-"): query.slug}
      </p>
      
        </div>
    );
};

export default halamanToko;