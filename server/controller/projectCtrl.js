import { sequelize } from "../models/init-models";

const findAll = async (req, res) => {
  try {
    const project = await req.context.models.projects.findAll({
      // OUTHER JOIN menampilkan table kanan dan kiri yang memiliki relasi dengan table projects
      include: [
        {
          all: true,
        },
      ],
    });
    return res.send(project);
  } catch (error) {
    return res.status(404).send(error);
  }
};
const findOne = async (req, res) => {
  try {
    const project = await req.context.models.projects.findOne({
      where: { proj_id: req.params.id },
    });
    return res.send(project);
  } catch (error) {
    return res.status(404).send(error);
  }
};
const create = async (req, res) => {
  try {
    const project = await req.context.models.projects.create({
      proj_id: req.body.proj_id,
      proj_name: req.body.proj_name,
      proj_createdon: req.body.proj_createdon,
      proj_duedate: req.body.proj_duedate,
      proj_cust_name: req.body.proj_cust_name,
      proj_description: req.body.proj_description,
      proj_status: req.body.proj_status,
      proj_amount: req.body.proj_amount,
      proj_account_mgr: req.body.proj_account_mgr,
      proj_customer: req.body.proj_customer,
    });
    return res.send(project);
  } catch (error) {
    return res.status(404).send(error);
  }
};

const createNext = async (req, res, next) => {
  try {
    const project = await req.context.models.projects.create({
      proj_id: req.body.proj_id,
      proj_name: req.body.proj_name,
      proj_createdon: req.body.proj_createdon,
      proj_duedate: req.body.proj_duedate,
      proj_cust_name: req.body.proj_cust_name,
      proj_description: req.body.proj_description,
      proj_status: req.body.proj_status,
      proj_amount: req.body.proj_amount,
      proj_account_mgr: req.body.proj_account_mgr,
      proj_customer: req.body.proj_customer,
    });
    req.projects = project;
    next();
  } catch (error) {
    return res.status(404).send(error);
  }
};

const update = async (req, res) => {
  try {
    const project = await req.context.models.projects.update(
      {
        proj_id: req.body.proj_id,
        proj_name: req.body.proj_name,
        proj_createdon: req.body.proj_createdon,
        proj_duedate: req.body.proj_duedate,
        proj_cust_name: req.body.proj_cust_name,
        proj_description: req.body.proj_description,
        proj_status: req.body.proj_status,
        proj_amount: req.body.proj_amount,
        proj_account_mgr: req.body.proj_account_mgr,
        proj_customer: req.body.proj_customer,
      },
      { returning: true, where: { proj_id: req.params.id } }
    );
    return res.send(project);
  } catch (error) {
    return res.status(404).send(error);
  }
};
const deleted = async (req, res) => {
  try {
    const project = await req.context.models.projects.destroy({
      where: { proj_id: req.params.id },
    });
    return res.send(`Deleted ${project} rows`);
  } catch (error) {
    return res.status(404).send(error);
  }
};
// select berdasarkan proj_id
const querySQL = async (req, res) => {
  try {
    await sequelize
      .query("SELECT * from projects where proj_id = :proj_id", {
        replacements: { proj_id: req.params.id },
        type: sequelize.QueryTypes.SELECT,
      })
      .then((result) => {
        return res.send(result);
      });
  } catch (error) {
    return res.status(404).send(error);
  }
};

export default {
  findAll,
  findOne,
  create,
  createNext,
  update,
  deleted,
  querySQL,
};
