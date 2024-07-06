import Photographer from "../models/photographer.models.js";

const createPhotographer = async (req, res) => {
  const { fname, lname, category, address, phone, email } = req.body;

  if (!fname || !lname || !category || !address || !phone || !email) {
    return res.status(404).json({ message: "Fields are required" });
  }

  try {
    const photographer = new Photographer(req.body);
    const newPhotographer = await photographer.save();

    if (!newPhotographer) {
      return res.status(422).json({ message: "Unable to add photographer" });
    }
    res.status(200).json({
      data: newPhotographer,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error in create photographer controller", error });
  }
};
const getAllPhotographers = async (req, res) => {
  try {
    const photographers = await Photographer.find();

    if (photographers.length) {
      return res
        .status(200)
        .json({ total: photographers.length, data: photographers });
    }
    res
      .status(422)
      .json({ total: photographers.length, message: "No photographers found" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error in get all photographers controller", error });
  }
};
const getSinglePhotographer = async (req, res) => {
  const { id } = req.params;
  try {
    const photographer = await Photographer.findById(id);

    if (!photographer) {
      return res
        .status(404)
        .json({ message: `Unable to find a photogrpher with id ${id}` });
    }
    return res.status(200).json({
      data: { photographer },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error get single photographer controller", error });
  }
};
const deleteSinglePhotographer = async (req, res) => {
  const { id } = req.params;
  try {
    const photographer = await Photographer.findByIdAndDelete(id);

    if (!photographer) {
      return res
        .status(404)
        .json({ message: `Unable to find photographer with id ${id}` });
    }
    res.status(200).json({ message: "Photographer deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error in photographer delete controller", error });
  }
};
const updateSinglePhotographer = async (req, res) => {
  const { id } = req.params;
  const { fname, lname, category, address, phone, email } = req.body;

  if (!fname || !lname || !category || !address || !phone || !email) {
    return res.status(404).json({ message: "Fields are required" });
  }

  try {
    const updatedPhotographer = await Photographer.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedPhotographer) {
      return res.status(404).json({
        message: `Unable to find photographer with id ${id}`,
        data: updatedPhotographer,
      });
    }
    res.status(200).json({
      message: "Photographer updated successfully",
      data: updatedPhotographer,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error in update photographer controller", error });
  }
};
export {
  createPhotographer,
  getAllPhotographers,
  getSinglePhotographer,
  deleteSinglePhotographer,
  updateSinglePhotographer,
};
