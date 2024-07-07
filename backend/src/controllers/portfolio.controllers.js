import { Portfolio } from "../models/portfolio.models.js";

const getAllPortfolios = async (req, res) => {
  try {
    const portfolios = await Portfolio.find();

    if (!portfolios.length) {
      return res.status(404).json({ messange: "No portfolio found" });
    }
    return res.status(200).json({ data: portfolios });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error in get all portfolio controller" });
  }

  res.status(200).json({ messange: "All portfolios" });
};

const getSinglePortfolio = async (req, res) => {
  const { id } = req.params;

  try {
    const portfolio = await Portfolio.findById(id);

    if (!portfolio) {
      return res
        .status(404)
        .json({ message: `Unalbe to find portfolio with id ${id}` });
    }
    res.status(200).json({ data: portfolio });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error in get single portfolio controller" });
  }
};

export { getAllPortfolios, getSinglePortfolio };
