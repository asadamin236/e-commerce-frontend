import React from "react";

const products = [
  {
    id: 1,
    title: "Smartphone",
    description: "Latest smartphone with AI camera",
    price: "$699",
    image: "https://img.freepik.com/premium-photo/smartphone-balancing-with-pink-background_23-2150271746.jpg?semt=ais_hybrid&w=740",
  },
  {
    id: 2,
    title: "Wireless Headphones",
    description: "Noise-cancelling over-ear headphones",
    price: "$199",
    image: "https://plus.unsplash.com/premium_photo-1678099940967-73fe30680949?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8aGVhZHBob25lc3xlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    id: 3,
    title: "Smart Watch",
    description: "Fitness tracking and notifications",
    price: "$249",
    image: "https://media.istockphoto.com/id/486993228/photo/smart-watch.jpg?s=612x612&w=0&k=20&c=dVKA7YSTjnhzYAoYcxDwGEuV18QV-K-YuZCABnjt8pE=",
  },
];

const ProductList = ({ filter = "" }) => {
  const filtered = products.filter((p) =>
    p.title.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10">
      {filtered.length > 0 ? (
        filtered.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg p-4 shadow-md hover:shadow-lg transition"
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-48 object-cover mb-4"
            />
            <h3 className="text-xl font-semibold">{product.title}</h3>
            <p className="text-gray-600">{product.description}</p>
            <p className="text-blue-600 font-bold mt-2">{product.price}</p>
            <button className="mt-3 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              Add to Cart
            </button>
          </div>
        ))
      ) : (
        <p className="col-span-full text-center text-gray-500">
          No matching products found.
        </p>
      )}
    </div>
  );
};

export default ProductList;
