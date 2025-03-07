import { AnimatedGroup } from "@/modules/core/components/ui/animated-group";
import Image from "next/image";

const entryRoutes = "/images/food";
const menuItems = [
  { name: "Carapulcra Chinchana", image: "/carapulcra.jpg" },
  { name: "Tallarines Verdes", image: "/tallarines-verdes.jpg" },
  { name: "Arroz con Pollo", image: "/arroz-pollo.jpg" },
  { name: "Lomo Saltado", image: "/lomo-saltado.jpg" },
];

export default function MenuSection() {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-semibold mb-8 text-center">
          Nuestro Menú
        </h2>
        <AnimatedGroup
          className="grid grid-cols-2 gap-4 p-8 md:grid-cols-3 lg:grid-cols-4"
          preset="scale"
        >
          {menuItems.map((item, index) => (
            <div
              key={index}
              className="bg-background/70 rounded-lg shadow-md overflow-hidden"
            >
              <div className="aspect-square relative">
                <Image
                  src={entryRoutes + item.image || "/placeholder.svg"}
                  alt={item.name}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className="p-4 bg-secondary">
                <h3 className="text-secondary-foreground text-xl font-semibold text-center">
                  {item.name}
                </h3>
              </div>
            </div>
          ))}
        </AnimatedGroup>
      </div>
    </section>
  );
}
