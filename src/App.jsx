import React, { useCallback, useState } from "react";
import "./App.css";
import useProducts from "./hooks/useProducts";
import Form from "./Form";
import ProductCard from "./ProductCard";
import useUsers from "./hooks/useUsers";

function App() {
  const { recommendedProducts, getUserRecommendations } = useProducts()
  const { list } = useUsers();
  const [isFormOpen, setIsFormOpen] = useState(false)

  const handleClick = () => {
    setIsFormOpen(!isFormOpen)
  }
  const handleSelectUser = (evt) => {
    const userId = evt.target.value
    getUserRecommendations(userId)
  }
  const renderCards = () => {
    return recommendedProducts?.map((product) => <ProductCard key={product.id} name={product.name} image={product.image} />)
  }
  return (
    <main className="m-0 w-screen h-screen flex items-center justify-center bg-linear-45 from-[#00d4ff] to-[#0b032d]">

      {isFormOpen || !recommendedProducts ? (
        <Form />
      ) :
        <div className="flex flex-col gap-2">
          <div className="flex gap-2 ">
            <select onChange={handleSelectUser}>
              {list?.map((user) => <option className="text-black" key={user.id} value={user.id}>{user.name}</option>)}
            </select>
            <button onClick={handleClick} className="cursor-pointer rounded-[4px] p-2">ADD</button>
          </div>
          <div className="flex gap-2">
            {renderCards()}
          </div>
        </div>
      }
    </main>
  );
}

export default App;
