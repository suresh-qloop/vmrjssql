const Client = require("../models/Model");
const moment = require("moment/moment");
const { toUpperCase, clearImage } = require("../utils/utils");
const { check, validationResult } = require("express-validator");

exports.AllClientsRoute = async (req, res, next) => {
  try {
    const [clients] = await Client.fetchAll(
      "our_clients",
      "id,client_name,link,is_active",
      "id DESC"
    );

    res.status(200).json(clients);
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};

exports.getClient = async (req, res, next) => {
  const id = req.params.id;
  try {
    const [client] = await Client.getOne(
      "our_clients",
      "id,client_name,logo,link,is_active",
      `id=${id}`
    );
    res.status(200).json(client[0]);
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};

exports.addClient = async (req, res, next) => {
  await check("client_name").notEmpty().run(req);
  await check("link").notEmpty().run(req);

  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json({ errors: result.array() });
  }

  const client_name = toUpperCase(req.body.client_name);
  const link = req.body.link;
  const logo = req.files.logo[0].filename;

  let modified = moment(new Date()).format("YYYY-MM-D H:MM:SS");

  try {
    if (req.files.logo) {
      if (
        req.files.logo[0].mimetype === "image/jpg" ||
        req.files.logo[0].mimetype === "image/jpeg" ||
        req.files.logo[0].mimetype === "image/png"
      ) {
        const value = `("${client_name}","${logo}", "${link}","${modified}")`;
        const [client] = await Client.addData(
          "our_clients",
          "(client_name,logo,link,modified)",
          value
        );
        res.status(200).json({
          message: "success",
        });
      } else {
        return res.status(400).json({
          message: "Please Select image File",
        });
      }
    }
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};

exports.editClient = async (req, res, next) => {
  await check("client_name").notEmpty().run(req);
  await check("link").notEmpty().run(req);

  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json({ errors: result.array() });
  }
  const id = req.params.id;
  const client_name = toUpperCase(req.body.client_name);
  const link = req.body.link;

  let modified = moment(new Date()).format("YYYY-MM-D H:MM:SS");

  try {
    if (req.files.logo) {
      if (
        req.files.logo[0].mimetype === "image/jpg" ||
        req.files.logo[0].mimetype === "image/jpeg" ||
        req.files.logo[0].mimetype === "image/png"
      ) {
        const [imageDelete] = await Client.getOne(
          "our_clients",
          "logo",
          `id=${id}`
        );
        clearImage(imageDelete[0].logo);

        const [logo] = await Client.editData(
          "our_clients",
          `logo="${req.files.logo[0].filename}"`,
          id
        );
      } else {
        return res.status(500).json({
          message: "Please Select image File",
        });
      }
    }
    const obj2 = `client_name="${client_name}",link="${link}",modified="${modified}"`;

    const [client] = await Client.editData("our_clients", obj2, id);
    res.status(200).json({
      message: "success",
    });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};

exports.deleteClient = async (req, res, next) => {
  const id = req.params.id;
  try {
    const [imageDelete] = await Client.getOne(
      "our_clients",
      "logo",
      `id=${id}`
    );
    clearImage(imageDelete[0].logo);

    const [client] = await Client.hardDelete("our_clients", `id=${id}`);

    res.status(200).json({
      message: "success",
    });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};

exports.clientStatus = async (req, res, next) => {
  const id = req.params.id;

  try {
    const [client] = await Client.getOne(
      "our_clients",
      "is_active",
      `id=${id}`
    );

    if (client[0].is_active === 0) {
      obj = `is_active = 1`;
      const [sql] = await Client.editData("our_clients", obj, id);
      return res.status(201).json({
        message: "success",
      });
    }
    if (client[0].is_active === 1) {
      obj2 = `is_active = 0`;
      const [sql2] = await Client.editData("our_clients", obj2, id);
      return res.status(201).json({
        message: "success",
      });
    }
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};
