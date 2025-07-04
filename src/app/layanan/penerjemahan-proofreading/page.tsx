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
