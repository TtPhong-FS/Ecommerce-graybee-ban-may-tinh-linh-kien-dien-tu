import { faHardDrive } from "@fortawesome/free-regular-svg-icons/faHardDrive";
import { faMicrochip } from "@fortawesome/free-solid-svg-icons";
import { faMemory } from "@fortawesome/free-solid-svg-icons/faMemory";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { products } from "../../js/data/pcData";

const PcCard = () => {
  return (
    <div className=''>
      <div className='flex gap-3'>
        {products.map((item, key) => (
          <div className='rounded-sm bg-white flex-1 py-4 px-4 border-white border-1' key={key}>
            <img src={item.thumbnail} alt='Anh bia Pc' className='p-4' />
            <p className='text-black text-[0.875rem] font-medium'>{item.productName}</p>
            <div className='mt-2.5 rounded-sm text-sm flex flex-col justify-center text-gray-600 bg-gray-300 px-2 py-1'>
              <div className='flex'>
                <span className='flex-1'>
                  <span>
                    <FontAwesomeIcon icon={faMicrochip} size='xs' style={{ color: "#565758" }} />
                  </span>
                  <span className='ml-1'>{item.cpu}</span>
                </span>
                <span className='flex-1'>
                  <span>
                    <FontAwesomeIcon icon={faMicrochip} size='xs' style={{ color: "#565758" }} />
                  </span>
                  <span className='ml-1'>{item.vga}</span>
                </span>
              </div>
              <div className='flex'>
                <span className='flex-1'>
                  <span>
                    <FontAwesomeIcon icon={faMicrochip} size='xs' style={{ color: "#565758" }} />
                  </span>
                  <span className='ml-1'>{item.motherboard}</span>
                </span>
                <span className='flex-1'>
                  <span>
                    <FontAwesomeIcon icon={faMemory} size='xs' style={{ color: "#565758" }} />
                  </span>
                  <span className='ml-1'>{item.ram}</span>
                </span>
                <span className='flex-1'>
                  <span>
                    <FontAwesomeIcon icon={faHardDrive} size='xs' style={{ color: "#565758" }} />
                  </span>
                  <span className='ml-1'>{item.storage}</span>
                </span>
              </div>
            </div>
            <div className='font-medium text-red-600 mt-2'>
              <span className='text-lg'>
                {item.price} <sup>đ&#817;</sup>
              </span>
            </div>
            <button onClick={(values) => console.log(values.id)}>Đặt hàng {item.id}</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PcCard;
