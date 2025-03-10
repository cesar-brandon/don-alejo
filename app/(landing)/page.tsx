import HeroSection from "@/modules/landing/components/sections/hero-section";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-secondary">
      <HeroSection />

      {/* <section className="py-16"> */}
      {/*   <div className="container mx-auto px-4"> */}
      {/*     <div className="flex flex-col md:flex-row items-center gap-8"> */}
      {/*       <div className="md:w-1/2"> */}
      {/*         <Image */}
      {/*           src="/images/presentation/2.jpg" */}
      {/*           alt="Fundadores del restaurante" */}
      {/*           width={500} */}
      {/*           height={400} */}
      {/*           className="rounded-lg shadow-md" */}
      {/*         /> */}
      {/*       </div> */}
      {/*       <div className="md:w-1/2"> */}
      {/*         <h2 className="text-3xl font-semibold mb-4">Nuestra Historia</h2> */}
      {/*         <p className="text-lg mb-4"> */}
      {/*           Fundado por los abuelos María y José en 1975, Sabores de Abuela */}
      {/*           ha sido el corazón de la cocina Chinchana en nuestra comunidad */}
      {/*           por décadas. Cada plato cuenta una historia de tradición, amor y */}
      {/*           los sabores únicos de nuestra tierra. */}
      {/*         </p> */}
      {/*         <p className="text-lg"> */}
      {/*           Hoy, continuamos su legado, sirviendo los mismos platos caseros */}
      {/*           que han deleitado a generaciones, en un ambiente que te hace */}
      {/*           sentir como en casa de la abuela. */}
      {/*         </p> */}
      {/*       </div> */}
      {/*     </div> */}
      {/*   </div> */}
      {/* </section> */}

      {/* <MenuSection /> */}

      {/* <section className="py-16 bg-background"> */}
      {/*   <div className="container mx-auto px-4"> */}
      {/*     <div className="grid md:grid-cols-2 gap-8"> */}
      {/*       <div> */}
      {/*         <h3 className="text-2xl font-semibold mb-4">Encuéntranos</h3> */}
      {/*         <div className="aspect-video relative rounded-lg overflow-hidden shadow-md"></div> */}
      {/*         <div className="mt-4 flex items-start"> */}
      {/*           <MapPin className="h-5 w-5   mt-1 mr-2 flex-shrink-0" /> */}
      {/*           <p>Av. Benavides 123, Chincha Alta, Ica, Perú</p> */}
      {/*         </div> */}
      {/*       </div> */}
      {/*       <div> */}
      {/*         <h3 className="text-2xl font-semibold mb-4">Contáctanos</h3> */}
      {/*         <div className="space-y-4"> */}
      {/*           <div className="flex items-center"> */}
      {/*             <Phone className="h-5 w-5 text-secondary mr-2" /> */}
      {/*             <p>(056) 123-4567</p> */}
      {/*           </div> */}
      {/*           <div className="flex items-center"> */}
      {/*             <Mail className="h-5 w-5 text-secondary mr-2" /> */}
      {/*             <p>info@saboresdeabuela.com</p> */}
      {/*           </div> */}
      {/*           <div className="flex items-start"> */}
      {/*             <Clock className="h-5 w-5 text-secondary mt-1 mr-2 flex-shrink-0" /> */}
      {/*             <div> */}
      {/*               <p className="font-semibold">Horario de Atención:</p> */}
      {/*               <p>Martes a Domingo: 11:00 AM - 10:00 PM</p> */}
      {/*               <p>Lunes: Cerrado</p> */}
      {/*             </div> */}
      {/*           </div> */}
      {/*         </div> */}
      {/*         <div className="mt-6"> */}
      {/*           <h4 className="text-xl font-semibold mb-2">Síguenos</h4> */}
      {/*           <div className="flex space-x-4"> */}
      {/*             <a */}
      {/*               href="#" */}
      {/*               className="text-secondary hover:text-secondary-700" */}
      {/*             > */}
      {/*               <Facebook className="h-6 w-6" /> */}
      {/*             </a> */}
      {/*             <a */}
      {/*               href="#" */}
      {/*               className="text-secondary hover:text-secondary-700" */}
      {/*             > */}
      {/*               <Instagram className="h-6 w-6" /> */}
      {/*             </a> */}
      {/*           </div> */}
      {/*         </div> */}
      {/*       </div> */}
      {/*     </div> */}
      {/*   </div> */}
      {/* </section> */}

      {/* Footer */}
      <footer className="absolute bottom-0 text-foreground py-6">
        <div className="container mx-auto px-4 text-center">
          <p>
            &copy; {new Date().getFullYear()} Don Alejo. Todos los derechos
            reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
