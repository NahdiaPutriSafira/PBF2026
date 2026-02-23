import {useRouter} from "next/router";


const halamanToko = () => {
    const router = useRouter();
    console.log(router);
    
    return (
        <div>
            <h1>Halaman Toko</h1>
        </div>
    );
};

export default halamanToko;