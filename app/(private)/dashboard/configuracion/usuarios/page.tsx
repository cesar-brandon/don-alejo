export default async function MenuPage() {
  // const supabase = await createClient();
  // const { data: users, error } = await supabase
  //   .from("auth.users")
  //   .select("id, email, created_at");
  //
  // if (error) {
  //   console.log(error);
  //   return <div>error al cargar los productos</div>;
  // } else {
  //   console.log(users);
  // }
  //
  return (
    <div className="h-full flex flex-1 flex-col space-y-8 p-8">
      <div className="sm:flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Productos</h2>
          <p className="text-muted-foreground">
            Configuración de los productos
          </p>
        </div>
        <div>{/* <ProductForm /> */}</div>
      </div>
      {/* <ProductList initialData={products} /> */}
    </div>
  );
}
