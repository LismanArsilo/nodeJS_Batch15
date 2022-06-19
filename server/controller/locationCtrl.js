import { sequelize } from "../models/init-models";

const findAll = async (req, res) => {
  try {
    const location = await req.context.models.locations.findAll();
    return res.send(location);
  } catch (error) {
    return res.status(404).send(error);
  }
};
const findOne = async (req, res) => {
  try {
    const location = await req.context.models.locations.findOne({
      where: { location_id: req.params.id },
    });
    return res.send(location);
  } catch (error) {
    return res.status(404).send(error);
  }
};
const create = async (req, res) => {
  try {
    const location = await req.context.models.locations.create({
      location_id: req.body.location_id,
      street_address: req.body.street_address,
      postal_code: req.body.postal_code,
      city: req.body.city,
      state_province: req.body.state_province,
      country_id: req.body.country_id,
    });
    return res.send(location);
  } catch (error) {
    return res.status(404).send(error);
  }
};
const update = async (req, res) => {
  try {
    const location = await req.context.models.locations.update(
      {
        location_id: req.body.location_id,
        street_address: req.body.street_address,
        postal_code: req.body.postal_code,
        city: req.body.city,
        state_province: req.body.state_province,
        country_id: req.body.country_id,
      },
      { returning: true, where: { location_id: req.params.id } }
    );
    return res.send(location);
  } catch (error) {
    return res.status(404).send(error);
  }
};
const deleted = async (req, res) => {
  try {
    const location = await req.context.models.locations.destroy({
      where: { location_id: req.params.id },
    });
    return res.send(`delete ${location} rows`);
  } catch (error) {
    return res.status(404).send(error);
  }
};

// delete SQL
const querySQL = async (req, res) => {
  const { id } = req.params;
  try {
    await sequelize
      .query("DELETE from locations where location_id = :id", {
        replacements: { id },
        type: sequelize.QueryTypes.DELETE,
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
