# JOBSHEET PRAKTIKUM
Routing, Nested Routing, Dynamic Routing, dan Layouting pada Next.js (Pages Router)

## Identitas
Nama: Nahdia Putri Safira

Kelas: TI3D

NIM: 2341720015

Program Studi: D4 Teknik Informatika

---

## Langkah 1 - Routing Dasar
Pada langkah pertama, dilakukan implementasi routing dasar menggunakan konsep file-based routing pada Next.js (Pages Router). Dalam Next.js, setiap file yang berada di dalam folder pages akan secara otomatis menjadi sebuah route tanpa memerlukan konfigurasi tambahan.

Awalnya, proyek hanya memiliki file index.tsx di dalam folder pages, yang secara otomatis menjadi halaman utama dengan URL /.

Selanjutnya, dibuat halaman baru bernama about. Dengan menambahkan file about.tsx di dalam folder pages, Next.js secara otomatis menghasilkan route baru dengan alamat /about.

Pengujian dilakukan dengan menjalankan aplikasi menggunakan perintah npm run dev, kemudian mengakses URL /about melalui browser. Halaman berhasil ditampilkan tanpa perlu menambahkan konfigurasi routing manual.

Hal ini membuktikan bahwa Next.js menerapkan sistem routing berbasis file yang sederhana dan efisien.

---

## Langkah 2 - Routing Menggunakan Folder
Pada langkah kedua, dilakukan perapihan struktur routing dengan memanfaatkan folder sebagai representasi route.

File about.tsx yang sebelumnya berada langsung di dalam folder pages dipindahkan ke dalam folder about dan diubah namanya menjadi index.tsx. Dengan demikian, struktur menjadi lebih terorganisir.

Konsep ini menunjukkan bahwa file index.tsx di dalam sebuah folder akan merepresentasikan root route dari folder tersebut. Meskipun struktur folder diubah, URL yang diakses tetap sama, yaitu /about.

Pendekatan ini memberikan keuntungan dalam pengelolaan project berskala besar, karena struktur folder menjadi lebih rapi dan memudahkan penambahan nested routing di dalamnya.

---

## Langkah 3 - Nested Routing
a. Buat Folder Setting

![Tampilan Hasil](imagelaporan/image1js3.png)

Modifikasi Kodenya
- user.tsx
    ![Tampilan Hasil](imagelaporan/image1-2js3.png)
    Akses : 
    ![Tampilan Hasil](imagelaporan/image1-4js3.png)
- app.tsx
    ![Tampilan Hasil](imagelaporan/image1-3js3.png)
    Akses : 
    ![Tampilan Hasil](imagelaporan/image1-5js3.png)
Modifikasi struktur folder pages dengan menambahkan folder user dan user.tsx pada setting dipindah ke folder user dan rubah file user.tsx menjadi index.tsx
    ![Tampilan Hasil](imagelaporan/image1-6js3.png)
    Jalankan pada browser
    ![Tampilan Hasil](imagelaporan/image1-7js3.png)

b. Nested Lebih Dalam

![Tampilan Hasil](imagelaporan/image1-8js3.png)

Akses :
    ![Tampilan Hasil](imagelaporan/image1-9js3.png)

---
## Langkah 4 - Dynamic Routing

Pada langkah keempat, dilakukan implementasi dynamic routing pada Next.js menggunakan fitur Pages Router. Dynamic routing digunakan untuk menangani URL yang memiliki parameter dinamis, sehingga satu file dapat digunakan untuk mengakses berbagai data berdasarkan nilai parameter pada URL.

a. Buat halaman produk
![Tampilan Hasil](imagelaporan/image2js3.png)
- Modifikasi index.tsx
![Tampilan Hasil](imagelaporan/image2-2js3.png)
Hasil Modifikasi
![Tampilan Hasil](imagelaporan/image2-3js3.png)
- Modifikasi [id].tsx
![Tampilan Hasil](imagelaporan/image2-4js3.png)
Hasil Modifikasi
![Tampilan Hasil](imagelaporan/image2-5js3.png)
- Cek menggunakan console.log
![Tampilan Hasil](imagelaporan/image2-6js3.png)
jika berhasil maka pada console.log dapat terlihat pada id terdapat nilai sepatu.
- Modifikasi [id].tsx agar dapat mengambil nilai dari id
![Tampilan Hasil](imagelaporan/image2-7js3.png)
- Buka Browser
![Tampilan Hasil](imagelaporan/image2-8js3.png)
b. Uji di Browser
![Tampilan Hasil](imagelaporan/image2-9js3.png)
![Tampilan Hasil](imagelaporan/image2-10js3.png)

---
## Langkah 5 - Membuat Komponen Navbar
a. Struktur Komponen
![Tampilan Hasil](imagelaporan/image3js3.png)
- Modifikasi index.tsx
![Tampilan Hasil](imagelaporan/image3-2js3.png)
- Buka global.css untuk nantinya digunakan pada style navbar
![Tampilan Hasil](imagelaporan/image3-3js3.png)
Modifikasi : 
![Tampilan Hasil](imagelaporan/image3-4js3.png)
- Modifikasi index.tsx dengan menambahkan classname untuk style navbar
![Tampilan Hasil](imagelaporan/image3-5js3.png)
- Modifikasi globals.css
![Tampilan Hasil](imagelaporan/image3-6js3.png)
- Modifikasi index.tsx pada folder pages
![Tampilan Hasil](imagelaporan/image3-7js3.png)
- Modifikasi _app.tsx ( pastikan import styles dalam keadaan aktif)
![Tampilan Hasil](imagelaporan/image3-8js3.png)
- Jalankan di browser
![Tampilan Hasil](imagelaporan/image3-9js3.png)
- Modifikasi navbar agar tampil di semua page
    - Modifikasi index.tsx pada folder page ( hapus navbar )
    ![Tampilan Hasil](imagelaporan/image3-10js3.png)
    - Modifikasi _app.tsx ( Menambahkan navbar )
    ![Tampilan Hasil](imagelaporan/image3-11js3.png)
- Jalankan di browser
![Tampilan Hasil](imagelaporan/image3-12js3.png)
![Tampilan Hasil](imagelaporan/image3-13js3.png)
![Tampilan Hasil](imagelaporan/image3-14js3.png)
![Tampilan Hasil](imagelaporan/image3-15js3.png)

---
## Langkah 6 - Membuat Layout Global (App Shell)
a. Buat AppShell
![Tampilan Hasil](imagelaporan/image4js3.png)
- Modifikasi index.tsx pada AppShell
![Tampilan Hasil](imagelaporan/image4-2js3.png)

---
## Langkah 7 -  Implementasi Layout di _app.tsx
![Tampilan Hasil](imagelaporan/image5js3.png)
- Modifikasi pada _app.tsx tambahkan footer seperti pada gambar dan amati hasilnya
![Tampilan Hasil](imagelaporan/image5-2js3.png)
    - Hasilnya
    ![Tampilan Hasil](imagelaporan/image5-3js3.png)
    ![Tampilan Hasil](imagelaporan/image5-4js3.png)

---
## Tugas Praktikum

1. Routing
- Buat halaman :
    - /profile

        ![Tampilan Hasil](imagelaporan/imageTugas1js3.png)
        ![Tampilan Hasil](imagelaporan/imageTugas1-2js3.png)
        ![Tampilan Hasil](imagelaporan/imageTugas1-5js3.png)
    - /profile/edit

        ![Tampilan Hasil](imagelaporan/imageTugas1js3.png)
        ![Tampilan Hasil](imagelaporan/imageTugas1-3js3.png)
        ![Tampilan Hasil](imagelaporan/imageTugas1-4js3.png)
2. Dynamic Routing
    - Buat routing: /blog/[slug]
        ![Tampilan Hasil](imagelaporan/imageTugas2js3.png)
        ![Tampilan Hasil](imagelaporan/imageTugas2-2js3.png)
        ![Tampilan Hasil](imagelaporan/imageTugas2-3js3.png)
3. Layout
    - Tambahkan Footer pada AppShel
        ![Tampilan Hasil](imagelaporan/imageTugas3js3.png)
        ![Tampilan Hasil](imagelaporan/imageTugas3-2js3.png)
        ![Tampilan Hasil](imagelaporan/imageTugas3-3js3.png)
    - Footer tampil di semua halaman 
        Berikut 3 contohnya
        ![Tampilan Hasil](imagelaporan/imageTugas3-4js3.png)
        ![Tampilan Hasil](imagelaporan/imageTugas3-5js3.png)
        ![Tampilan Hasil](imagelaporan/imageTugas3-6js3.png)

---
## Pertanyaan Refleksi
1. Apa perbedaan routing berbasis file dan routing manual?
Routing berbasis file otomatis dibuat berdasarkan struktur folder dan file di dalam pages/, sehingga tidak perlu konfigurasi tambahan. Sedangkan routing manual harus ditentukan satu per satu melalui konfigurasi seperti pada React Router.
2. Mengapa dynamic routing penting dalam aplikasi web?
Dynamic routing memungkinkan satu halaman menangani banyak URL berbeda menggunakan parameter. Hal ini membuat aplikasi lebih fleksibel dan efisien, terutama untuk halaman seperti blog atau produk.
3. Apa keuntungan menggunakan layout global dibanding memanggil komponen satu per satu?
Layout global membuat komponen seperti Navbar dan Footer tampil di semua halaman tanpa dipanggil berulang. Ini membuat kode lebih rapi, efisien, dan mudah dikelola.