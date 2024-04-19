import User from "../models/User.js";
import OverallStat from "../models/OverallStat.js";
import Transaction from "../models/Transaction.js";
// import CurrentItems from "../models/CurrentItems.js";
// import ReleaseItems from "../models/ReleaseItems.js";
// import Items_out from "../models/Items_out.js";

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//CurrentItems....

// export const addCurrentItem = async (req, res) => {
//   try {
//     const { itemId, itemName, quantity, date } = req.body;

//     // Create a new current item instance
//     const newCurrentItem = new CurrentItems({
//       itemId,
//       itemName,
//       quantity,
//       date,
//     });

//     // Save the current item to the database
//     const savedCurrentItem = await newCurrentItem.save();

//     res.status(201).json(savedCurrentItem); // Respond with the saved current item
//   } catch (error) {
//     console.error("Error adding new Item:", error);
//     res.status(500).json({ error: "Failed to add new Item" });
//   }
// };

// export const getCurrentItems = async (req, res) => {
//   try {
//     const currentItems = await CurrentItems.find();
//     res.status(200).json(currentItems);
//   } catch (error) {
//     res.status(404).json({ message: error.message });
//   }
// };

// export const getCurrentItem = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const currentItems = await CurrentItems.findById(id);
//     res.status(200).json(currentItems);
//   } catch (error) {
//     res.status(404).json({ message: error.message });
//   }
// };

// export const deleteCurrentItems = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const deletedCurrentItem = await CurrentItems.findByIdAndDelete(id);
//     if (!deletedCurrentItem) {
//       return res.status(404).json({ error: "Item not found" });
//     }
//     res.json({ message: "Item deleted successfully" });
//   } catch (error) {
//     console.error("Error deleting Item:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

//....

//ReleaseItems....

// export const addReleaseItem = async (req, res) => {
//   try {
//     const { eventid, itemId, date, quantity } = req.body;

//     // Create a new release item instance
//     const newReleaseItem = new ReleaseItems({
//       eventid,
//       itemId,
//       date,
//       quantity,
//     });

//     // Save the release item to the database
//     const savedReleaseItem = await newReleaseItem.save();

//     res.status(201).json(savedReleaseItem); // Respond with the saved release item
//   } catch (error) {
//     console.error("Error releasing new Item:", error);
//     res.status(500).json({ error: "Failed to release new Item" });
//   }
// };

// export const getReleaseItems = async (req, res) => {
//   try {
//     const ReleaseItems = await Items_out.find();
//     res.status(200).json(ReleaseItems);
//   } catch (error) {
//     res.status(404).json({ message: error.message });
//   }
// };

// export const getReleaseItem = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const releaseItems = await ReleaseItems.findById(id);
//     res.status(200).json(releaseItems);
//   } catch (error) {
//     res.status(404).json({ message: error.message });
//   }
// };

// export const deleteReleaseItems = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const deletedReleaseItem = await ReleaseItems.findByIdAndDelete(id);
//     if (!deletedReleaseItem) {
//       return res.status(404).json({ error: "Item not found" });
//     }
//     res.json({ message: "Item deleted successfully" });
//   } catch (error) {
//     console.error("Error deleting Item:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

//....

export const getDashboardStats = async (req, res) => {
  try {
    // hardcoded values
    const currentMonth = "November";
    const currentYear = 2021;
    const currentDay = "2021-11-15";

    /* Recent Transactions */
    const transactions = await Transaction.find()
      .limit(50)
      .sort({ createdOn: -1 });

    /* Overall Stats */
    const overallStat = await OverallStat.find({ year: currentYear });

    const {
      totalCustomers,
      yearlyTotalSoldUnits,
      yearlySalesTotal,
      monthlyData,
      salesByCategory,
    } = overallStat[0];

    const thisMonthStats = overallStat[0].monthlyData.find(({ month }) => {
      return month === currentMonth;
    });

    const todayStats = overallStat[0].dailyData.find(({ date }) => {
      return date === currentDay;
    });

    res.status(200).json({
      totalCustomers,
      yearlyTotalSoldUnits,
      yearlySalesTotal,
      monthlyData,
      salesByCategory,
      thisMonthStats,
      todayStats,
      transactions,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
