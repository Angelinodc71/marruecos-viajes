import Image from "next/image";
import LogoZahraa from "../../../public/assets/logoZahraa.png";

export function Logo() {
  return (
    <div className="flex items-center leading-none" style={{height: '64px', width: '170px'}}>
      <Image
        src={LogoZahraa}
        alt="Zahraa — Moroccan Heritage Experiences"
        height={120}
        style={{ marginLeft: '-35px'}}
        unoptimized
      />
    </div>
  );
}