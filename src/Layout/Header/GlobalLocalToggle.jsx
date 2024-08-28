const GlobalLocalToggle = ({ selectedOption, toggleOption }) => {
    return (
      <label className="relative inline-block w-14 h-7">
        <input
          type="checkbox"
          className="opacity-0 w-0 h-0"
          onClick={toggleOption}
        />
        <span
          className="absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-cover bg-center rounded-full transition-transform duration-300"
          style={{
            backgroundImage: `url('${
              selectedOption === "Global"
                ? "https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/world-map-in-blue-michael-tompsett.jpg"
                : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmB-yQ2zFUyD9BgDpBCSWKFDEDe4pYk2pOSoPQ8PEG&s"
            }')`,
          }}
        ></span>
        <span
          className="absolute left-1 top-1 w-5 h-5 bg-gray-400 rounded-full transition-transform duration-300 transform"
          style={{
            transform:
              selectedOption === "Global"
                ? "translateX(0)"
                : "translateX(26px)",
          }}
        ></span>
      </label>
    );
  };


export default GlobalLocalToggle