import Photographer from "../models/photographer.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { Portfolio } from "../models/portfolio.models.js";

const createPhotographer = async (req, res) => {
  const { fname, lname, category, address, phone, email } = req.body;

  if (!fname || !lname || !category || !address || !phone || !email) {
    return res.status(404).json({ message: "Fields are required" });
  }

  let avatarLocalPath;

  if (
    req.files &&
    Array.isArray(req.files.avatar) &&
    req.files.avatar.length > 0
  ) {
    avatarLocalPath = req.files.avatar[0].path;
  }

  if (!avatarLocalPath) {
    return res.status(400).json({ message: "User Avatar is required" });
  }

  try {
    const avatar = await uploadOnCloudinary(avatarLocalPath);

    // console.log(avatar)

    if (!avatar) {
      return res.status(422).json({ message: "Avatar is required" });
    }

    const photographer = new Photographer({
      ...req.body,
      avatar: avatar?.url || "",
    });

    const portfolio = new Portfolio({
      photographerId: photographer._id,
      portfolio: [],
    });

    photographer.portfolio = portfolio._id;

    const newPhotographer = await photographer.save();
    const photographerPortfolio = await portfolio.save();

    if (!newPhotographer || !photographerPortfolio) {
      return res.status(422).json({ message: "Unable to add photographer" });
    }
    res.status(200).json({
      data: newPhotographer,
      portfolio: photographerPortfolio,
    });
  } catch (error) {
    console.log(error);
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
    const photographer = await Photographer.findById(id).populate({
      path: "portfolio",
      select: "portfolio -_id",
    });

    if (!photographer) {
      return res
        .status(404)
        .json({ message: `Unable to find a photogrpher with id ${id}` });
    }
    return res.status(200).json({
      data: { photographer },
    });
  } catch (error) {
    console.log(error);
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
const uploadPhotographerPortfolio = async (req, res) => {
  const { id } = req.params;

  let newPortfolio;
  if (
    req.files &&
    Array.isArray(req.files.portfolio) &&
    req.files.portfolio.length
  ) {
    newPortfolio = req.files;
  } else {
    return res
      .status(400)
      .json({ message: "Portfolio must contain at least 1 image" });
  }

  try {
    const photographer = await Photographer.findById(id);

    if (!photographer) {
      return res
        .status(404)
        .json({ message: `Unable to find photographer with id ${id}` });
    }

    const uploadPromises = newPortfolio.portfolio.map((localFilePath) =>
      uploadOnCloudinary(localFilePath.path)
    );

    const uploadResults = await Promise.all(uploadPromises);

    const successfulUploads = uploadResults.filter((result) => result !== null);

    const urls = successfulUploads.map((upload) => upload.url);

    const updatedPortfolio = await Portfolio.findOneAndUpdate(
      { photographerId: id },
      { $pushs: { portfolio: urls } },
      { new: true, runValidators: true }
    );

    if (!updatedPortfolio) {
      return res.status(404).json({ message: "Unable to find potfolio" });
    }

    res.status(200).json({ data: updatedPortfolio });
    // const userPortfolio = new Portfolio({
    //   photographerId: id,
    //   portfolio: urls,
    // });

    // const createdPortfolio = await userPortfolio.save();

    // if (!createdPortfolio) {
    //   return res
    //     .status(422)
    //     .json({ message: "Unable to create user portfolio" });
    // }
    // res.status(200).json({
    //   message: "User portfolio created successfully",
    //   createdPortfolio,
    // });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Error in portfolio controller : ", error });
  }
};

export {
  createPhotographer,
  getAllPhotographers,
  getSinglePhotographer,
  deleteSinglePhotographer,
  updateSinglePhotographer,
  uploadPhotographerPortfolio,
};
