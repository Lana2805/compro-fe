// src/app/sambutan-kepala-ppb/page.tsx

// const LocalWelcomeMessageCard: React.FC<LocalWelcomeMessageCardProps> = ({
//   personName,
//   personTitle,
//   welcomeText,
//   personImageUrl,
// }) => {
//   return (
//     <div className="bg-white py-2">
//       <div className="container mx-auto px-4">
//         {/* Judul Halaman / Bagian */}
//         <div className="text-center mb-16 md:mb-20 px-4">
//           <h1 className="text-3xl md:text-4xl font-bold text-gray-800 leading-tight">
//             Sambutan Kepala Pusat Pengembangan Bahasa
//           </h1>

//           <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mt-2">
//             Universitas Islam Negeri Syarif Hidayatullah Jakarta
//           </h2>
//           <div className="mt-6 md:mt-8 w-2/3 md:w-1/2 max-w-lg mx-auto h-1.5 bg-yellow-400 rounded-full"></div>
//         </div>

//         {/* Konten Sambutan: Gambar & Teks */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start ">
//           {/* Bagian Gambar Profil */}
//           <div className="relative rounded-md shadow-lg overflow-hidden flex justify-center items-center p-4 bg-gray-100">
//             {/* Sudut kuning di kiri atas */}
//             <div className="absolute top-5 left-5 bg-yellow-400 w-48 h-48 -translate-x-1/2 -translate-y-1/2 rounded-sm"></div>

//             <img
//               src={personImageUrl}
//               alt={personName}
//               width={600} // Sesuaikan lebar yang sesuai dengan gambar aslinya
//               height={600} // Sesuaikan tinggi yang sesuai dengan gambar aslinya
//               className="object-cover rounded-xl z-10" // z-10 agar di atas sudut kuning
//             />

//             {/* Sudut kuning di kanan bawah */}
//             <div className="absolute bottom-0 right-0 bg-yellow-400 w-48 h-48 translate-x-1/2 translate-y-1/2 rounded-sm"></div>
//           </div>

//           {/* Bagian Teks Sambutan */}
//           <div className="flex flex-col justify-center">
//             <h2 className="text-3xl md:text-3xl font-bold text-gray-800 mb-4">
//               {personName}
//             </h2>
//             <p className="text-2xl text-gray-700 italic mb-6">{personTitle}</p>
//             <div className="whitespace-pre-line text-gray-600 text-l text-justify leading-relaxed prose max-w-none">
//               {/* PENTING: dangerouslySetInnerHTML ini digunakan karena `detail` dari API
//                   mungkin mengandung HTML. Pastikan konten ini AMAN dari XSS (sudah disanitasi)
//                   di sisi backend Laravel kamu sebelum disimpan ke database. */}
//               <div dangerouslySetInnerHTML={{ __html: welcomeText || "" }} />{" "}
//               {/* Fallback ke string kosong jika welcomeText null/undefined */}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// Halaman Sambutan Kepala PPB
export default function PenerjemahanDanProofreading() {
  return (
    <div className="bg-white py-2 md:mb-8 sm:mb-10">
      <div className="container mx-auto px-4">
        {/* Judul Halaman / Bagian */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16 px-4 pt-8">
          <h1 className="text-3xl sm:text-4xl md:text-4xl font-bold text-gray-800 leading-tight tracking-wide">
            Penerjemahan dan Proofreading
          </h1>
          <div className="mt-6 md:mt-8 w-2/3 md:w-1/2 max-w-lg mx-auto h-1.5 bg-yellow-400 rounded-full"></div>
        </div>

        <div className=" flex flex-col lg:flex-row justify-center gap-14">
          <Card
            judul="Layanan Penerjemahan"
            teks="Layanan penerjemahan tersedia untuk dokumen dalam Bahasa Indonesia, Arab, dan Inggris, baik satu arah maupun dua arah."
            harga={[
              "Ijazah: Rp 75.000 / halaman",
              "Transkrip Nilai: Rp 100.000 / halaman",
              "Abstrak: Rp 100.000 / halaman",
              "Dokumen lainnya: Rp 150.000 / halaman",
            ]}
          />
          <Card
            judul="Layanan Proofreading"
            teks="Proofreading untuk dokumen berbahasa Indonesia, Arab, atau Inggris. Fokus pada perbaikan tata bahasa, ejaan, dan struktur kalimat tanpa mengubah makna."
            harga={["Rp 75.000 / halaman"]}
          />
        </div>
      </div>
    </div>
  );
}
type CardProps = {
  judul: string;
  teks: string;
  harga: string[];
};

const Card: React.FC<CardProps> = ({ judul, teks, harga }) => {
  return (
    <div className="bg-white px-2 lg:max-w-[35%] lg:min-w-[30%] rounded-lg shadow-md drop-shadow-md  overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="p-4">
        {/* Title */}
        <h3 className="text-2xl font-semibold text-gray-800 mb-4 mt-8">
          {judul}
        </h3>

        {/* Tags */}
        <div className="flex gap-4 items-center mb-2">
          <span className="text-xs font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded">
            Cash Only
          </span>
          <span className="text-xs font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded">
            On Site
          </span>
          <span className="text-xs font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded">
            Max 7 Hari Kerja
          </span>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-3 mt-6">{teks}</p>

        {/* Price List */}
        <p className="text-md font-semibold text-gray-800 mb-2">
          Daftar Harga:
        </p>
        <ul className="list-disc pl-5 text-sm text-gray-600 mb-3">
          {harga.map((item, index) => (
            <li key={index} className="mb-1">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
