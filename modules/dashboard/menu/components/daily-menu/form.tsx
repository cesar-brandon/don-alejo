"use client";

import { Button } from "@/modules/core/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/modules/core/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/modules/core/components/ui/drawer";
import { Label } from "@/modules/core/components/ui/label";
import { useMediaQuery } from "@/modules/core/hooks/use-media-query";
import { Tables } from "@/modules/core/types/database.types";
import { Pen, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { X } from "lucide-react";
import { ProductSelector } from "./product-selector";
import { Separator } from "@/modules/core/components/ui/separator";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/modules/core/lib/supabase/client";
import { toast } from "sonner";
import { SelectedProduct } from "../../types/daily-menu";
import { cn } from "@/modules/core/lib/utils";

export default function DailyMenuCard({
  id,
  item,
}: {
  id?: string;
  item?: Tables<"menu_day">;
}) {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          {id ? (
            <Button variant="outline" size="icon">
              <Pen />
            </Button>
          ) : (
            <Button variant="secondary">
              Agregar Menú
              <Plus />
            </Button>
          )}
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{id ? "Editar" : "Agregar"} Menú</DialogTitle>
            <DialogDescription>
              Completa los campos y guarda los cambios.
            </DialogDescription>
          </DialogHeader>
          <MenuDayCard item={item} setOpen={setOpen} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        {id ? (
          <Button variant="outline" size="icon">
            <Pen />
          </Button>
        ) : (
          <Button variant="secondary">
            Agregar Menú
            <Plus />
          </Button>
        )}
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>{id ? "Editar" : "Agregar"} Menú</DrawerTitle>
          <DrawerDescription>
            Completa los campos y guarda los cambios.
          </DrawerDescription>
        </DrawerHeader>
        <MenuDayCard className="px-4" item={item} setOpen={setOpen} />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

type TodayProduct = {
  product_id: string;
  price: number;
  stock: number;
  product: {
    name: string;
  } | null;
};

export function MenuDayCard({
  className,
  item,
  setOpen,
}: {
  className?: string;
  item?: Tables<"menu_day">;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const supabase = createClient();
  const queryClient = useQueryClient();
  const [selectedProducts, setSelectedProducts] = useState<SelectedProduct[]>(
    []
  );

  useEffect(() => {
    if (item) {
      (async () => {
        const { data: todayProductData, error: productsError } = (await supabase
          .from("menu_day_product")
          .select("product_id, price, stock, product(name)")
          .eq("menu_day_id", item.id)) as unknown as {
          data: TodayProduct[];
          error: Error;
        };

        if (productsError) {
          toast.error("Error al obtener los productos del menú");
          throw new Error(productsError.message);
        }        
        setSelectedProducts(
          todayProductData.map((todayProduct) => ({
            id: todayProduct.product_id,
            name: todayProduct.product?.name ?? "Desconocido",
            price: todayProduct.price,
            stock: todayProduct.stock,
          }))
        );
      })();
    }
  }, [item]);

  const { mutate } = useMutation({
    mutationFn: async () => {
      // 1. Insertar en "menu_day" sin datos (usa valores por defecto)
      const { data: menuData, error: menuError } = await supabase
        .from("menu_day")
        .insert({})
        .select();
      if (menuError || !menuData || menuData.length === 0) {
        toast.error("Error al crear el menú");
        throw new Error(menuError?.message || "Error al crear el menú");
      }
      const menuDayId = menuData[0].id;

      // 2. Preparar e insertar productos en "menu_day_products"
      const productsToInsert = selectedProducts.map((product) => ({
        menu_day_id: menuDayId,
        product_id: product.id,
        price: product.price, // Se asume que 'product' tiene la propiedad 'price'
        stock: product.stock, // Se asume que 'product' tiene la propiedad 'stock'
      }));

      const { error: productsError } = await supabase
        .from("menu_day_product")
        .insert(productsToInsert);
      if (productsError) {
        toast.error("Error al agregar los productos al menú");
        throw new Error(productsError.message);
      }

      return { menuDayId, products: productsToInsert };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["menu_day"] });
      toast.success("Menú guardado correctamente");
      setOpen(false);
    },
  });

  return (
    <div className={cn("space-y-4", className)}>
      <ProductSelector
        selectedProducts={selectedProducts}
        setSelectedProducts={setSelectedProducts}
      />
      <Separator />
      <div>
        <Label>Productos Seleccionados</Label>
        {selectedProducts.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead className="w-10">Acción</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {selectedProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() =>
                        setSelectedProducts((prev) =>
                          prev.filter((p) => p.id !== product.id)
                        )
                      }
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p className="text-sm text-muted-foreground">
            No hay productos seleccionados.
          </p>
        )}
      </div>
      <Button onClick={() => mutate()} className="w-full">
        {item ? "Guardar Cambios" : "Agregar Menú"}
      </Button>
    </div>
  );
}
