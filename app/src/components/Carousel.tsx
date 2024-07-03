export default function Carousel() {
    return (
<div className="carousel carousel-center bg-white rounded-box space-x-4 p-4" style={{ scrollbarWidth: "auto" }}>
  <div className="carousel-item flex flex-col items-center">
    <img
      src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
      alt="Shoes"
      className="object-cover w-96 h-64 rounded-lg shadow-md"
    />
    <div className="mt-2 text-center">
      <h2 className="text-lg font-semibold">Shoes</h2>
    </div>
  </div>
  <div className="carousel-item flex flex-col items-center">
    <img
      src="https://img.daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.jpg"
      alt="Nature"
      className="object-cover w-96 h-64 rounded-lg shadow-md"
    />
    <div className="mt-2 text-center">
      <h2 className="text-lg font-semibold">Nature</h2>
    </div>
  </div>
  <div className="carousel-item flex flex-col items-center">
    <img
      src="https://img.daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.jpg"
      alt="City"
      className="object-cover w-96 h-64 rounded-lg shadow-md"
    />
    <div className="mt-2 text-center">
      <h2 className="text-lg font-semibold">City</h2>
    </div>
  </div>
  <div className="carousel-item flex flex-col items-center">
    <img
      src="https://img.daisyui.com/images/stock/photo-1494253109108-2e30c049369b.jpg"
      alt="Mountains"
      className="object-cover w-96 h-64 rounded-lg shadow-md"
    />
    <div className="mt-2 text-center">
      <h2 className="text-lg font-semibold">Mountains</h2>
    </div>
  </div>
  <div className="carousel-item flex flex-col items-center">
    <img
      src="https://img.daisyui.com/images/stock/photo-1550258987-190a2d41a8ba.jpg"
      alt="Beach"
      className="object-cover w-96 h-64 rounded-lg shadow-md"
    />
    <div className="mt-2 text-center">
      <h2 className="text-lg font-semibold">Beach</h2>
    </div>
  </div>
  <div className="carousel-item flex flex-col items-center">
    <img
      src="https://img.daisyui.com/images/stock/photo-1559181567-c3190ca9959b.jpg"
      alt="Forest"
      className="object-cover w-96 h-64 rounded-lg shadow-md"
    />
    <div className="mt-2 text-center">
      <h2 className="text-lg font-semibold">Forest</h2>
    </div>
  </div>
  <div className="carousel-item flex flex-col items-center">
    <img
      src="https://img.daisyui.com/images/stock/photo-1601004890684-d8cbf643f5f2.jpg"
      alt="Desert"
      className="object-cover w-96 h-64 rounded-lg shadow-md"
    />
    <div className="mt-2 text-center">
      <h2 className="text-lg font-semibold">Desert</h2>
    </div>
  </div>
</div>

  


    )
}