import Caraousel from "@/components/home/Caraousel";
import ProgramPPB from "@/components/home/ProgramPPB";
import ProgramSection from "@/components/home/Berita";


export default function Home() {
  return (
    <div className="max-w-7xl mx-auto">
      < Caraousel />
      <ProgramPPB />
      <ProgramSection />
    </div>
  );
}
