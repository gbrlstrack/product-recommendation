import React, { useEffect, useState } from "react";
import useCategories from "./hooks/useCategories";
import useForm from "./hooks/useForm";

const Form = ({ closeForm }) => {
  const { save } = useForm()
  const { categories, loading } = useCategories()
  const [formData, setFormData] = useState({ categories: [], name: "" })
  const [hasName, setHasName] = useState(Boolean(formData.name))

  const handleClickItem = (evt) => {
    const value = evt.target.value;

    setFormData((prev) => {
      const alreadySelected = prev.categories.includes(value);

      return {
        ...prev,
        categories: alreadySelected
          ? prev.categories.filter((id) => id !== value)
          : [...prev.categories, value],
      };
    });
  }

  const handleClickSave = () => {
    save(formData)
    setHasName(false)
    closeForm()
  }

  const handleClickContinue = () => {
    setHasName(true)
  }

  const renderCategory = () => {
    if (loading || !categories) return null

    return categories?.map((category) => {
      const isSelected = formData.categories.find((id) => category.id === id)
      return (
        <button
          key={category.id}
          value={category.id.toString()}
          onClick={handleClickItem}
          className={`${isSelected ? "bg-cyan-600" : "bg-cyan-400"} 
            px-4 rounded-2xl cursor-pointer 
            h-8 text-black" font-semibold border-2 
            ${isSelected ? "border-cyan-900" : "border-transparent"}
            hover:border-cyan-900 hover:bg-cyan-700`}
        >
          {category.name}
        </button>
      )
    })
  }

  const handleChange = (evt) => {
    const value = evt.target.value
    setFormData((prev) => ({ ...prev, name: value }))
  }

  return (
    <div
      className="w-full h-full backdrop-blur-[16px] backdrop-saturate-[180%] bg-[rgba(255, 255, 255,0.1)] 
        rounded-[12px] border border-[rgba(255,255,255,0.125)] p-[38px] drop-shadow-[0_40px_40px_rgba(0,0,0,0.5)] 
        flex flex-col items-start justify-center text-center gap-1"
    >
      {!hasName
        ? <div className="flex flex-col gap-2">
          <p className="text-[18px] font-medium">
            Insira o nome que deseja ser chamado:
          </p>
          <input className="input bg-white text-black shadow-lg focus:border-2 border-gray-300 
      px-5 py-3 rounded-xl w-56 transition-all focus:w-64 outline-none"
            type="text"
            placeholder="Insira seu nome"
            value={formData.name}
            onChange={handleChange}
          />
          <button onClick={handleClickContinue} className="h-8 w-25 bg-white hover:bg-gray-100 text-black font-semibold px-4 rounded-2xl cursor-pointer ">
            Continuar
          </button>
        </div>
        : <>
          <p className="text-[18px] font-medium">
            Selecione as categorias que você mais se interessa:
          </p>
          <>
            {renderCategory()}
          </>
          <div className="mt-2">
            <button onClick={handleClickSave} className="h-8 bg-white hover:bg-gray-100 text-black font-semibold px-4 rounded-2xl cursor-pointer ">
              Salvar
            </button>
          </div>
        </>
      }
    </div >
  );
};

export default Form;
