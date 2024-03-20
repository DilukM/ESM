import Donors from "../models/Donor.js";

export const addDonor = async (req, res) => {
  let newDonor = new Donors(req.body);
  newDonor.save((err) => {
    if (err) {
      console.log(newDonor);
      return res.status(400).json({ error: err });
    }
    return res.status(200).json({ success: "Donor saved successfully" });
  });
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

export const updateDonors = async (req, res) => {
  Donors.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (err, donor) => {
      if (err) {
        return res.status(400).json({ error: err });
      }
      return res.status(200).json({
        success: "Updateed Successfully",
      });
    }
  );
};
