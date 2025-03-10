import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative h-dvh flex items-center justify-center overflow-hidden">
      <Image
        src="/hero-background.jpg"
        alt="Fondo de cocina chinchana"
        layout="fill"
        objectFit="cover"
        quality={100}
        priority
      />
      <div className="absolute inset-0 bg-background bg-opacity-50" />

      <div className="relative z-10 text-center text-white px-4">
        <Image
          src="/images/logo.jpg"
          alt="Sabores de Abuela Logo"
          width={200}
          height={200}
          className="mx-auto mb-8 rounded-full border-4 border-amber-200"
        />
        {/* <h1 className="text-5xl md:text-6xl font-bold mb-4  "> */}
        {/*   Sabores de Abuela */}
        {/* </h1> */}
        {/* <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto"> */}
        {/*   Donde los sabores de Chincha se mezclan con el amor de la abuela */}
        {/* </p> */}
        <Link href="/login">
          <button className="bg-secondary text-secondary-foreground font-semibold py-3 px-8 rounded-full text-lg hover:bg-secondary/80 transition-colors duration-300 shadow-lg">
            Iniciar Sesión
          </button>
        </Link>
      </div>
    </section>
  );
}
