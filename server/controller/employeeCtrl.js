import { sequelize } from "../models/init-models";

const findAll = async (req, res) => {
  try {
    const employee = await req.context.models.employees.findAll({
      include: [
        {
          // OUTHER JOIN menampilkan semua yang memiliki relasi dengan employees
          all: true,
        },
      ],
    });
    return res.send(employee);
  } catch (error) {
    return res.status(404).send(error);
  }
};
const findOne = async (req, res) => {
  try {
    const employee = await req.context.models.employees.findOne({
      where: { employee_id: req.params.id },
    });
    return res.send(employee);
  } catch (error) {
    return res.status(404).send(error);
  }
};
const create = async (req, res) => {
  const { files, fields } = req.fileAttrb;
  // agar tidak bentrok mengambil data langsung dari req body
  // yang sama tidak perlu di input kembali
  const cekDepartment = req.departments;
  const cekJob = req.jobs;
  try {
    const employee = await req.context.models.employees.create({
      employee_id: parseInt(fields[0].value),
      first_name: fields[1].value,
      last_name: fields[2].value,
      email: fields[3].value,
      phone_number: fields[4].value,
      hire_date: new Date(),
      salary: parseInt(fields[5].value),
      department_id: parseInt(fields[6].value),
      job_id: parseInt(fields[7].value),
      manager_id: parseInt(fields[8].value),
      emp_profile: files[0].file.newFilename,
    });
    return res.send(employee);
  } catch (error) {
    return res.status(404).send(error);
  }
};

// mengirim ke dependent
const createNext = async (req, res, next) => {
  try {
    const employee = await req.context.models.employees.create({
      employee_id: req.body.employee_id,
      first_name: req.body.first_,
      last_name: req.body.last_,
      email: req.body.email,
      phone_number: req.body.phone_number,
      hire_date: req.body.hire_date,
      salary: req.body.salary,
      manager_id: req.body.manager_id,
      department_id: req.body.department_id,
      job_id: req.body.job_id,
    });
    req.employees = employee;
    next();
  } catch (error) {
    return res.status(404).send(error);
  }
};

const update = async (req, res) => {
  try {
    const employee = await req.context.models.employees.update(
      {
        employee_id: req.body.employee_id,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        phone_number: req.body.phone_number,
        hire_date: req.body.hire_date,
        salary: req.body.salary,
        manager_id: req.body.manager_id,
        department_id: req.body.department_id,
        job_id: req.body.job_id,
      },
      { returning: true, where: { employee_id: req.params.id } }
    );
    return res.send(employee);
  } catch (error) {
    return res.status(404).send(error);
  }
};
const deleted = async (req, res) => {
  try {
    const employee = await req.context.models.employees.destroy({
      where: { employee_id: req.params.id },
    });
    return res.send(`Delete ${employee} rows`);
  } catch (error) {
    return res.status(404).send(error);
  }
};
// select Query
const querySQL = async (req, res) => {
  try {
    await sequelize
      .query("SELECT * from dependents where employee_id = :employee_id", {
        replacements: { employee_id: req.params.id },
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
