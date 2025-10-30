"use client"
import React, { useEffect, useState } from "react";

interface Product {
  _id: string;
  productName: string;
  description: string;
  price: number;
  photo: {
    secure_url: string;
  };
}

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/product");
        const data = await res.json();
        if (data.success) setProducts(data.products);
        else throw new Error(data.message);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading)
    return <p className="text-center mt-10 text-gray-500">Loading products...</p>;
  if (error)
    return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Our Products</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-200 hover:scale-[1.02] transition-transform duration-200"
          >
            <img
              src={product.photo.secure_url}
              alt={product.productName}
              className="w-full h-56 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-2">{product.productName}</h2>
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                {product.description}
              </p>
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold text-gray-900">
                  ₹{product.price}
                </span>
                <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-4 py-2">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;