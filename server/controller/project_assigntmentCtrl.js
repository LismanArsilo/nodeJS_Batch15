import { sequelize } from "../models/init-models";

const findAll = async (req, res) => {
  try {
    const project_assignment =
      await req.context.models.project_assignment.findAll({
        include: [
          {
            // OUTHER JOIN menampilkan table kanan dan kiri yang memiliki relasi dengan table project_assignment
            all: true,
          },
        ],
      });
    return res.send(project_assignment);
  } catch (error) {
    return res.status(404).send(error);
  }
};

const findOne = async (req, res) => {
  try {
    const project_assignment =
      await req.context.models.project_assignment.findOne({
        where: { pras_proj_id: req.params.id },
      });
    return res.send(project_assignment);
  } catch (error) {
    return res.status(404).send(error);
  }
};
const create = async (req, res) => {
  const cekProj = req.projects;
  try {
    const project_assignment =
      await req.context.models.project_assignment.create({
        pras_proj_id: req.body.proj_id,
        pras_employee_id: req.body.pras_employee_id,
        pras_startdate: req.body.pras_startdate,
        pras_enddate: req.body.pras_enddate,
        pras_status: req.body.pras_status,
      });
    return res.send(project_assignment);
  } catch (error) {
    return res.status(404).send(error);
  }
};
const update = async (req, res) => {
  try {
    const location = await req.context.models.project_assignment.update(
      {
        pras_proj_id: req.body.pras_proj_id,
        pras_employee_id: req.body.pras_employee_id,
        pras_startdate: req.body.pras_startdate,
        pras_enddate: req.body.pras_enddate,
        pras_status: req.body.pras_status,
      },
      { returning: true, where: { pras_proj_id: req.params.id } }
    );
    return res.send(location);
  } catch (error) {
    return res.status(404).send(error);
  }
};
const deleted = async (req, res) => {
  try {
    const location = await req.context.models.project_assignment.destroy({
      where: { pras_proj_id: req.params.id },
    });
    return res.send(`delete ${location} rows`);
  } catch (error) {
    return res.status(404).send(error);
  }
};
// select berdasarkan proj_id
const querySQL = async (req, res) => {
  const { id } = req.params;
  try {
    await sequelize
      .query("SELECT * from project_assignment where pras_proj_id = :id", {
        replacements: { id },
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
  update,
  deleted,
  querySQL,
};
