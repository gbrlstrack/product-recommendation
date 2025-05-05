const ProductCard = ({ name, image }) => {

    return (
        <div
            className="w-full h-auto backdrop-blur-[32px] backdrop-saturate-[180%] bg-[rgba(255, 255, 255,0.25)] 
        rounded-[12px] border border-[rgba(255,255,255,0.125)] p-[38px] drop-shadow-[0_30px_10px_rgba(0,0,0,0.5)] 
        flex flex-col items-center justify-center text-center"
        >
            <div className="flex flex-col justify-between items-center">
                <img
                    src={image}
                    alt="Produto"
                    className="max-h-80 justify-center items-center object-contain rounded-[12px] max-w-80"
                />
                <p className="text-[16px] font-semibold mt-2 font-righteous text-[rgba(255,255,255,0.98)] uppercase">
                    {name}
                </p>
            </div>
        </div>
    )
}

export default ProductCard