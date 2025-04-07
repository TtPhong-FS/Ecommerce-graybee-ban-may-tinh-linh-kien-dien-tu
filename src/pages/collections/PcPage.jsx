import PcCard from "../../components/cards/PcCard";

const data = [1, 1, 1, 1];

const PcPage = () => {
  return (
    <div>
      <div className='flex flex-col gap-3'>
        {data.map((item, index) => (
          <div key={index}>
            <PcCard />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PcPage;
