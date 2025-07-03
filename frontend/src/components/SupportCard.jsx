const SupportCard = ({ Icon, count, label }) => {
  return (
    <div className="flex flex-col items-center bg-[#55D6C2] p-4 text-black w-full">
      <Icon className="h-[145px] w-[105px] mb-2" aria-label={label} />
      <p className="text-4xl font-medium text-[#05386B] font-sanchez">
        {count}
      </p>
      <p className="text-2xl">{label}</p>
    </div>
  );
};

export default SupportCard;
