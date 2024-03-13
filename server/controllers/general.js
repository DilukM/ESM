import User from "../models/User.js";
import OverallStat from "../models/OverallStat.js";
import Transaction from "../models/Transaction.js";
import Donors from "../models/Donor.js";
import CurrentItems from "../models/CurrentItems.js";

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//Doners....

export const addDonor = async (req, res) => {
  try {
    const { name, phone, email, password } = req.body;

    // Create a new donor instance
    const newDonor = new Donors({
      name,
      phone,
      email,
      password,
    });

    // Save the donor to the database
    const savedDonor = await newDonor.save();

    res.status(201).json(savedDonor); // Respond with the saved donor
  } catch (error) {
    console.error("Error adding new donor:", error);
    res.status(500).json({ error: "Failed to add new donor" });
  }
};

export const getDonors = async (req, res) => {
  try {
    const donors = await Donors.find();
    res.status(200).json(donors);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getDonor = async (req, res) => {
  try {
    const { id } = req.params;
    const donors = await Donors.findById(id);
    res.status(200).json(donors);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteDonors = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedDonor = await Donors.findByIdAndDelete(id);
    if (!deletedDonor) {
      return res.status(404).json({ error: "Donor not found" });
    }
    res.json({ message: "Donor deleted successfully" });
  } catch (error) {
    console.error("Error deleting donor:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//...

//CurrentItems....

export const addCurrentItem = async (req, res) => {
  try {
    const { itemId, itemName, quantity, date } = req.body;

    // Create a new donor instance
    const newCurrentItem = new CurrentItems({
      itemId,
      itemName,
      quantity,
      date,
    });

    // Save the donor to the database
    const savedCurrentItem = await newCurrentItem.save();

    res.status(201).json(savedCurrentItem); // Respond with the saved donor
  } catch (error) {
    console.error("Error adding new Item:", error);
    res.status(500).json({ error: "Failed to add new Item" });
  }
};

export const getCurrentItems = async (req, res) => {
  try {
    const currentItems = await CurrentItems.find();
    res.status(200).json(currentItems);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getCurrentItem = async (req, res) => {
  try {
    const { id } = req.params;
    const currentItems = await CurrentItems.findById(id);
    res.status(200).json(currentItems);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteCurrentItems = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedCurrentItem = await CurrentItems.findByIdAndDelete(id);
    if (!deletedCurrentItem) {
      return res.status(404).json({ error: "Item not found" });
    }
    res.json({ message: "Item deleted successfully" });
  } catch (error) {
    console.error("Error deleting Item:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

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
