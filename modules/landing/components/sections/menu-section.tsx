import Image from "next/image";

const menuItems = [
  { name: "Carapulcra Chinchana", image: "/carapulcra.jpg" },
  { name: "Sopa Seca", image: "/sopa-seca.jpg" },
  { name: "Chicharrón de Chancho", image: "/chicharron.jpg" },
  { name: "Frejoles con Seco", image: "/frejoles-seco.jpg" },
  { name: "Picante de Cuy", image: "/picante-cuy.jpg" },
  { name: "Champús", image: "/champus.jpg" },
];

export default function MenuSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-semibold mb-8 text-center font-serif">
          Nuestro Menú
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {menuItems.map((item, index) => (
            <div
              key={index}
              className="bg-amber-50 rounded-lg shadow-md overflow-hidden"
            >
              <div className="aspect-square relative">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold text-center">
                  {item.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
