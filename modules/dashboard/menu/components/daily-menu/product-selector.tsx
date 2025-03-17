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
  const [pendingPrice, setPendingPrice] = useState<number>(0);
  const [pendingStock, setPendingStock] = useState<number>(1);

  const { data: products } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("product")
        .select()
        .eq("id_product_group", "535c1151-4286-49db-8112-632280cc11ac");
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
      setPendingPrice(product.price || 1);
      setPendingStock(1);
    }
    setOpen(false);
  };

  // Se agrega el producto configurado a la lista de productos seleccionados
  const handleAddPendingProduct = () => {
    if (pendingProduct && pendingPrice !== 0 && pendingStock !== 0) {
      const newSelectedProduct: SelectedProduct = {
        id: pendingProduct.id,
        name: pendingProduct.name,
        price: Number(pendingPrice),
        stock: Number(pendingStock),
      };
      setSelectedProducts((prev) => [...prev, newSelectedProduct]);
      // Se limpian los estados pendientes
      setPendingProduct(null);
      setPendingPrice(0);
      setPendingStock(0);
    } else {
      toast.error("Por favor ingresa precio y stock.");
    }
  };

  const handleCancelPendingProduct = () => {
    setPendingProduct(null);
    setPendingPrice(0);
    setPendingStock(0);
  };

  return (
    <div className="w-full">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-full">
            {pendingProduct ? pendingProduct.name : "Selecciona un producto"}
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
        <div className="w-full mt-2 space-y-2">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <label>Precio</label>
            <Input
              type="number"
              value={pendingPrice}
              onChange={(e) => setPendingPrice(parseFloat(e.target.value))}
              className="mt-1"
              min={0}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <label>Stock</label>
            <Input
              type="number"
              value={pendingStock}
              onChange={(e) => setPendingStock(parseInt(e.target.value))}
              className="mt-1"
              min={0}
            />
          </div>
          <div className="w-full flex justify-between items-center gap-2 mt-6">
            <Button className="flex-1" onClick={handleAddPendingProduct}>
              Agregar Producto
            </Button>
            <Button
              className="flex-1"
              variant="ghost"
              onClick={handleCancelPendingProduct}
            >
              Cancelar
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
