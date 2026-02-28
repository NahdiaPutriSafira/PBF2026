import styles from "./Produk.module.css";

export default function HeroSection() {
  return (
     <div className="bg-blue-600 text-white text-center py-12">
      <h1 className="text-4xl font-bold mb-4">
        Produk Kami
      </h1>
      <p className="text-lg">
        Temukan produk terbaik dengan harga terbaik
      </p>
    </div>
  );
}