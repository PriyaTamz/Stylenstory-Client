const DashboardCard = ({ title, value, icon, color }) => {
  return (
    <div className={`bg-white rounded-lg shadow-md p-6 ${color}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm font-medium">{title}</p>
          <h3 className="text-2xl font-bold mt-1">{value}</h3>
        </div>
        <div className="p-3 rounded-full bg-opacity-20 bg-white">
          {icon}
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;