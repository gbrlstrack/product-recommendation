import React, { useCallback, useState } from "react";
import useCategories from "./hooks/useCategories";

const Form = () => {
  const { categories, loading, save } = useCategories()
  const [formData, setFormData] = useState({ categories: categories ?? [] })

  const handleClickItem = (evt) => {
    const value = Number(evt.target.value);

    setFormData((prev) => {
      const alreadySelected = prev.categories.includes(value);

      return {
        categories: alreadySelected
          ? prev.categories.filter((id) => id !== value)
          : [...prev.categories, value],
      };
    });
  }

  const handleClickSave = () => {
    save(formData.categories)
  }

  const renderCategory = () => {
    if (loading) return null

    return categories.map((category) => {
      const isSelected = formData.categories.find((id) => category.id === id)
      return (
        <>
          <button
            value={category.id.toString()}
            onClick={handleClickItem}
            className={`${isSelected ? "bg-cyan-600" : "bg-cyan-400"} 
            px-4 rounded-2xl cursor-pointer 
            h-8 ${isSelected ? "text-white" : "text-black"} font-semibold border-2 
            ${isSelected ? "border-white" : "border-transparent"}
            hover:border-cyan-900 hover:bg-cyan-700`}
            key={category.id}>
            {category.name}
          </button>
        </>
      )
    })
  }

  return (
    <div
      className="w-full h-full backdrop-blur-[16px] backdrop-saturate-[180%] bg-[rgba(255, 255, 255,0.1)] 
        rounded-[12px] border border-[rgba(255,255,255,0.125)] p-[38px] drop-shadow-[0_40px_40px_rgba(0,0,0,0.5)] 
        flex flex-col items-start justify-center text-center gap-1"
    >
      <p className="text-[18px] font-medium">
        Selecione as categorias que você mais se interessa:
      </p>
      {renderCategory()}
      <div className="mt-2">
        <button onClick={handleClickSave} className="h-8 bg-white hover:bg-gray-100 text-black font-semibold px-4 rounded-2xl cursor-pointer ">
          Salvar
        </button>
      </div>
    </div>
  );
};

export default Form;
