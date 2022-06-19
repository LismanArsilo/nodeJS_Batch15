import { sequelize } from "../models/init-models";

const findAll = async (req, res) => {
  try {
    const country = await req.context.models.countries.findAll();
    return res.send(country);
  } catch (error) {
    return res.status(404).send(error);
  }
};

const findOne = async (req, res) => {
  try {
    const country = await req.context.models.countries.findOne({
      where: { country_id: req.params.id },
    });
    return res.send(country);
  } catch (error) {
    return res.status(404).send(error);
  }
};
const create = async (req, res) => {
  try {
    const country = await req.context.models.countries.create({
      country_id: req.body.country_id,
      country_name: req.body.country_name,
      region_id: req.body.region_id,
    });
    return res.send(country);
  } catch (error) {
    return res.status(404).send(error);
  }
};
const update = async (req, res) => {
  try {
    const country = await req.context.models.countries.update(
      {
        country_id: req.body.country_id,
        country_name: req.body.country_name,
        region_id: req.body.region_id,
      },
      { returning: true, where: { country_id: req.params.id } }
    );
    return res.send(country);
  } catch (error) {
    return res.status(404).send(error);
  }
};
const deleted = async (req, res) => {
  try {
    const country = await req.context.models.countries.destroy({
      where: { country_id: req.params.id },
    });
    return res.send(`delete ${country} rows`);
  } catch (error) {
    return res.status(404).send(error);
  }
};
// Update SQL
const querySQL = async (req, res) => {
  const { id } = req.params;
  const { country_id, country_name, region_id } = req.body;
  try {
    await sequelize
      .query(
        "UPDATE countries set country_id= :country_id, country_name= :country_name, region_id= :region_id where country_id=:id ",
        {
          replacements: { country_id, country_name, region_id, id },
          type: sequelize.QueryTypes.UPDATE,
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
