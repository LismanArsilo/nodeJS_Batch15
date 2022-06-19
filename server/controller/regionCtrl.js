// regions
import { sequelize } from "../models/init-models";

const findAll = async (req, res) => {
  try {
    const region = await req.context.models.regions.findAll();
    return res.send(region);
  } catch (error) {
    return res.status(404).send(error);
  }
};

const findOne = async (req, res) => {
  try {
    const region = await req.context.models.regions.findOne({
      where: { region_id: req.params.id },
    });
    return res.send(region);
  } catch (error) {
    return res.status(404).send(error);
  }
};
const create = async (req, res) => {
  try {
    const region = await req.context.models.regions.create({
      region_name: req.body.region_name,
    });
    return res.send(region);
  } catch (error) {
    return res.status(404).send(error);
  }
};
const update = async (req, res) => {
  try {
    const region = await req.context.models.regions.update(
      {
        region_id: req.body.region_id,
        region_name: req.body.region_name,
      },
      { returning: true, where: { region_id: req.params.id } }
    );
    return res.send(region);
  } catch (error) {
    return res.status(404).send(error);
  }
};
const deleted = async (req, res) => {
  try {
    const region = await req.context.models.regions.destroy({
      where: { region_id: req.params.id },
    });
    return res.send(`delete ${region} rows`);
  } catch (error) {
    return res.status(404).send(error);
  }
};
// insert SQL
const querySQL = async (req, res) => {
  const { region_id, region_name } = req.body;
  try {
    await sequelize
      .query(
        "INSERT into regions (region_id, region_name) values (:region_id, :region_name)",
        {
          replacements: { region_id, region_name },
          type: sequelize.QueryTypes.INSERT,
        }
      )
      .then((result) => {
        return res.send(result.rowCount);
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
