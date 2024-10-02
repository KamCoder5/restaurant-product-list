export const SummaryCardItem = () => {
  return (
    <div className="h-full w-full bg-white ">
      <p className="text-slate-700 sm:text-m md:text-lg font-extrabold mb-2">
        Product Name
      </p>
      <div className="flex flex-row ">
        <p className="text-red-700 sm:text-m md:text-lg font-extrabold mr-2">
          1x
        </p>
        <p className="text-slate-500 sm:text-m md:text-lg mr-2">@ $0.00</p>
        <p className="text-slate-600 sm:text-m md:text-lg font-extrabold">
          $0.00
        </p>
      </div>
      <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-200" />
    </div>
  );
};
