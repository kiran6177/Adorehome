const Banner = require("../models/bannerSchema");
const path = require("path");
const Jimp = require("jimp");
const fs = require("fs").promises;
const { ObjectId } = require("mongodb");
const loadBanner = async (req, res) => {
  try {
    const findBanner = await Banner.find();
    console.log(findBanner);
    res.render("admin/banner", { banner: findBanner });
  } catch (error) {
    console.log(error.message);
  }
};

const addBanner = async (req, res) => {
  try {
    const { bannertitle, description, status, croppeddata } = req.body;
    console.log(
      bannertitle,
      description,
      status,
      req.file.filename,
      croppeddata
    );
    let croppedbanner = croppeddata ? JSON.parse(croppeddata) : null;

    async function cropAndSave(inputPath, outputFilePath, x, y, width, height) {
      try {
        const image = await Jimp.read(inputPath);
        image.crop(x, y, width, height);
        await image.writeAsync(outputFilePath);
        console.log("Image saved successfully!");
      } catch (error) {
        console.error("Error:", error);
      }
    }

    if (croppedbanner != null) {
      const inputImagePath = path.join(
        __dirname,
        "../assets",
        req.file.filename
      );
      const outputImagePath = path.join(
        __dirname,
        "../assets",
        req.file.filename
      );
      cropAndSave(
        inputImagePath,
        outputImagePath,
        croppedbanner.x,
        croppedbanner.y,
        croppedbanner.width,
        croppedbanner.height
      );
    }

    const bannertoSave = {
      bannertitle,
      description,
      status,
      bannerimage: req.file.filename,
    };
    const savedBanner = await Banner.create(bannertoSave);
    console.log(savedBanner);
    if (savedBanner) {
      res.redirect("/admin/banner");
    } else {
      res.render("admin/banner", { message: "Cannot add Banner!!" });
    }
  } catch (error) {
    console.log(error.message);
  }
};

const loadEditBanner = async (req, res) => {
  try {
    const { id } = req.query;
    console.log(id);
    const bannerdata = await Banner.aggregate([
      { $match: { _id: new ObjectId(id) } },
    ]);
    console.log(bannerdata);
    if (bannerdata) {
      res.render("admin/editbanner", { banner: bannerdata[0] });
    } else {
      res.render("admin/editbanner");
    }
  } catch (error) {
    console.log(error.message);
  }
};

const editBanner = async (req, res) => {
  try {
    const { bannerid, bannertitle, description, status, croppeddata } =
      req.body;
    console.log(bannerid, bannertitle, description, status, croppeddata);
    let bannerToedit;

    if (req.file) {
      const bannerdata = await Banner.findById({ _id: bannerid });
      await fs.unlink(
        path.join(__dirname, "../assets", bannerdata.bannerimage)
      );
      let croppedbanner = croppeddata ? JSON.parse(croppeddata) : null;

      async function cropAndSave(
        inputPath,
        outputFilePath,
        x,
        y,
        width,
        height
      ) {
        try {
          const image = await Jimp.read(inputPath);
          image.crop(x, y, width, height);
          await image.writeAsync(outputFilePath);
          console.log("Image saved successfully!");
        } catch (error) {
          console.error("Error:", error);
        }
      }

      if (croppedbanner != null) {
        const inputImagePath = path.join(
          __dirname,
          "../assets",
          req.file.filename
        );
        const outputImagePath = path.join(
          __dirname,
          "../assets",
          req.file.filename
        );
        cropAndSave(
          inputImagePath,
          outputImagePath,
          croppedbanner.x,
          croppedbanner.y,
          croppedbanner.width,
          croppedbanner.height
        );
      }
      bannerToedit = {
        bannertitle,
        description,
        status,
        bannerimage: req.file.filename,
      };
    } else {
      bannerToedit = {
        bannertitle,
        description,
        status,
      };
    }
    const bannerEdit = await Banner.findByIdAndUpdate(
      { _id: bannerid },
      { $set: bannerToedit },
      { new: true }
    );
    console.log(bannerEdit);
    if (bannerEdit) {
      res.redirect("/admin/banner");
    } else {
      console.log("banner error");
    }
  } catch (error) {
    console.log(error.message);
  }
};

const deleteBanner = async (req, res) => {
  try {
    const { id } = req.query;
    const deleteData = await Banner.findByIdAndDelete({ _id: id });
    if (deleteData) {
      res.redirect("/admin/banner");
    } else {
      console.log("Banner delete");
    }
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  loadBanner,
  addBanner,
  loadEditBanner,
  editBanner,
  deleteBanner,
};
