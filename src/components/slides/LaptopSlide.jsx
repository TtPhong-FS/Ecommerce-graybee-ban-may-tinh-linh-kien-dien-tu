import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const products = [
  {
    id: 1,
    name: "Laptop Lenovo",
    price: "18.490.000đ",
    image:
      "https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 2,
    name: "Laptop Asus",
    price: "20.990.000đ",
    image:
      "https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 3,
    name: "Laptop Dell",
    price: "24.490.000đ",
    image:
      "https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 4,
    name: "Laptop HP",
    price: "21.490.000đ",
    image:
      "https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 5,
    name: "Laptop Acer",
    price: "18.990.000đ",
    image:
      "https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=600",
  },
];

const LaptopSlide = () => {
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      slidesPerView={4}
      spaceBetween={20}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 3000 }}
      loop={true}
    >
      {products.map((product) => (
        <SwiperSlide key={product.id}>
          <div
            style={{
              padding: "10px",
              textAlign: "center",
              background: "#fff",
              borderRadius: "10px",
            }}
          >
            <img
              src={product.image}
              alt={product.name}
              style={{ width: "100%", borderRadius: "10px" }}
            />
            <h3 style={{ fontSize: "14px", margin: "10px 0" }}>{product.name}</h3>
            <p style={{ fontSize: "18px", color: "red", fontWeight: "bold" }}>{product.price}</p>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default LaptopSlide;
