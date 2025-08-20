'use client'
import Pagination from '@/components/tables/PaginationMUI';

type Product = {
  id: number;
  name: string;
  price: string;
  imageSrc: string;
  imageAlt: string;
  href: string;
};

type ProductGridProps = {
  products: Product[];
  cols?: {
    sm?: number; // tablet
    md?: number; // laptop
    lg?: number; // PC
    xl?: number; // PC lớn
  };
};

const getGridColsClass = (cols?: ProductGridProps["cols"]) => {
  return [
    "grid-cols-1", // default mobile 1 column
    cols?.sm ? `sm:grid-cols-${cols.sm}` : "sm:grid-cols-2",
    cols?.md ? `md:grid-cols-${cols.md}` : "md:grid-cols-3",
    cols?.lg ? `lg:grid-cols-${cols.lg}` : "lg:grid-cols-4",
    cols?.xl ? `xl:grid-cols-${cols.xl}` : "", // optional
  ].join(" ");
};

export default function ProductGrid({
  products,
  cols,
}: ProductGridProps) {
    const changePage = (newPage: number) => {
    
    };
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>

        <div
          className={`grid gap-x-6 gap-y-10 ${getGridColsClass(cols)} xl:gap-x-8`}
        >
          {products.map((product, index) => (
            <a key={index} href={product.href} className="group">
              <img
                alt={product.imageAlt}
                src={product.imageSrc}
                className="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-7/8"
              />
              <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
              <p className="mt-1 text-lg font-medium text-gray-900">{product.price}</p>
            </a>
          ))}
        </div>

           <div className='flex justify-center mt-[100px]'>
                    <Pagination limit={10} page={1} total={100} onPageChange={changePage} />
                  </div>
      </div>
    </div>
  );
}
