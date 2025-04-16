import {
    LuLayoutDashboard,
    LuHandCoins,
    LuWallet,
    LuLogOut,
    
    LuCalculator
} from "react-icons/lu";
import { FaChartLine } from "react-icons/fa";


export const SIDE_MENU_DATA = [
    {
        id: "01",
        label: "Dashboard",
        icon: LuLayoutDashboard,
        path: "/"
    },
    {
        id: "02",
        label: "Income",
        icon: LuWallet,
        path: "/income"
    },
    {
        id: "03",
        label: "Expense",
        icon: LuHandCoins,
        path: "/expense"
    },
    {
        id: "04",
        label: "Accounts",
        icon: LuCalculator,
        path: "/accounts"
    },
    {
        id: "05",
        label: "Predictions",
        icon: FaChartLine,
        path: "/predictions"
    },
    {
        id: "06",
        label: "Logout",
        icon: LuLogOut,
        path: "logout"
    }
];