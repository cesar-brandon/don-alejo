import * as React from "react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { createClient } from "@/modules/core/lib/supabase/client";
import { toast } from "sonner";
import { Product, SelectedProduct } from "../../types/daily-menu";

export function ProductSelector({
  selectedProducts,
  setSelectedProducts,
}: {
  selectedProducts: SelectedProduct[];
  setSelectedProducts: React.Dispatch<React.SetStateAction<SelectedProduct[]>>;
}) {
  const supabase = createClient();
  const [open, setOpen] = useState(false);
  // Estado para el producto pendiente de configurar (ingresar precio y stock)
  const [pendingProduct, setPendingProduct] = useState<Product | null>(null);
  const [pendingPrice, setPendingPrice] = useState<string>("");
  const [pendingStock, setPendingStock] = useState<string>("");

  const { data: products } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("product")
        .select()
        .eq("id_product_group", "535c1151-4286-49db-8112-632280cc11ac");
      console.log(data);
      if (error) {
        toast.error("Error al cargar los productos");
        throw new Error(error.message);
      }
      return data;
    },
  });

  // Al seleccionar un producto, se setea como pendiente para que el usuario ingrese stock y precio
  const handleSelectProduct = (productId: string) => {
    const product = products?.find((p) => p.id === productId);
    if (product && !selectedProducts.some((p) => p.id === product.id)) {
      setPendingProduct(product);
      setPendingPrice(String(product.price));
      setPendingStock("");
    }
    setOpen(false);
  };

  // Se agrega el producto configurado a la lista de productos seleccionados
  const handleAddPendingProduct = () => {
    if (pendingProduct && pendingPrice !== "" && pendingStock !== "") {
      const newSelectedProduct: SelectedProduct = {
        id: pendingProduct.id,
        name: pendingProduct.name,
        price: Number(pendingPrice),
        stock: Number(pendingStock),
      };
      setSelectedProducts((prev) => [...prev, newSelectedProduct]);
      // Se limpian los estados pendientes
      setPendingProduct(null);
      setPendingPrice("");
      setPendingStock("");
    } else {
      toast.error("Por favor ingresa precio y stock.");
    }
  };

  const handleCancelPendingProduct = () => {
    setPendingProduct(null);
    setPendingPrice("");
    setPendingStock("");
  };

  return (
    <div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-full">
            Selecciona un producto
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0" align="start">
          <Command>
            <CommandInput placeholder="Buscar producto..." />
            <CommandList>
              <CommandEmpty>No hay resultados.</CommandEmpty>
              <CommandGroup>
                {products?.map((product) => (
                  <CommandItem
                    key={product.id}
                    value={product.name}
                    onSelect={() => handleSelectProduct(product.id)}
                  >
                    {product.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      {pendingProduct && (
        <div className="mt-2 space-y-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Precio
            </label>
            <Input
              type="number"
              value={pendingPrice}
              onChange={(e) => setPendingPrice(e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Stock
            </label>
            <Input
              type="number"
              value={pendingStock}
              onChange={(e) => setPendingStock(e.target.value)}
              className="mt-1"
            />
          </div>
          <div className="flex space-x-2">
            <Button onClick={handleAddPendingProduct}>Agregar Producto</Button>
            <Button variant="ghost" onClick={handleCancelPendingProduct}>
              Cancelar
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
