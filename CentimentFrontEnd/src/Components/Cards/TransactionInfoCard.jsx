import React from "react";
import { LuTrash2, LuTrendingDown, LuTrendingUp, LuUtensils } from "react-icons/lu";

const TransactionInfoCard = ({ title, icon, date, amount, type, hideDeleteBtn, onDelete }) => {
    // Determine styles for income vs expense
    const getAmountStyles = () => 
        type === "income" ? "bg-green-50 text-green-500" : "bg-red-50 text-red-500";

    return (
        <div className="group relative flex items-center gap-4 mt-2 p-4 rounded-lg hover:bg-gray-100/60">
            {/* Icon Section */}
            <div className="w-14 h-14 flex items-center justify-center text-2xl text-gray-800 bg-gray-100 rounded-full">
                {icon ? <span>{icon}</span> : <LuUtensils />}
            </div>

            {/* Transaction Details */}
            <div className="flex-1 flex items-center justify-between">
                <div>
                    <p className="text-lg text-blue-700 font-bold">{title}</p>
                    <p className="text-sm text-gray-500 mt-1 font-medium">{date}</p>
                </div>

                {/* Amount and Delete Button */}
                <div className="flex items-center gap-3">
                    {/* Delete Button (Hidden by Default, Shows on Hover) */}
                    {!hideDeleteBtn && (
                        <button 
                            className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                            onClick={onDelete}
                        > 
                            <LuTrash2 size={20}/> 
                        </button>
                    )}

                    {/* Amount Badge */}
                    <div className={`flex items-center gap-3 px-4 py-2 rounded-md text-lg font-bold ${getAmountStyles()}`}>
                        <h6>
                            {type === "income" ? "+" : "-"} ₹{amount}
                        </h6>
                        {type === "income" ? <LuTrendingUp size={20} /> : <LuTrendingDown size={20} />}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TransactionInfoCard;
