import React from "react";
import "./App.css";
import useProducts from "./hooks/useProducts";
import Form from "./Form";
import ProductCard from "./ProductCard";

function App() {
  const { recommendedProducts } = useProducts();

  const renderCards = () => {
    return recommendedProducts.map((product) => <ProductCard key={product.id} name={product.name} image={product.image} />)
  }
  return (
    <body className="w-screen h-screen flex items-center justify-center bg-linear-45 from-[#00d4ff] to-[#0b032d]">

      {!recommendedProducts ? (
        <Form />
      ) : <div className="flex gap-2">
        {renderCards()}
      </div>
      }
    </body>
  );
}

export default App;
