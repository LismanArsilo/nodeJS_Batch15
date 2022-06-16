import dotenv from "dotenv";
import express, { query } from "express";
dotenv.config();

const Pool = require("pg").Pool;
const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "lisman1922",
  database: "quiz1_database",
  port: 5432,
});

const app = express();
app.use(express.json());

const port = process.env.PORT || 3003;
app.listen(port, () => {
  console.info(`Server listening on port ${port}`);
});

// app untuk regions
app.get("/api/region/", (req, res) => {
  pool.query("select * from regions", [], (error, result) => {
    if (error) {
      throw error;
    }
    res.status(200).json(result.rows);
  });
});

app.get("/api/region/:id", (req, res) => {
  const { id } = req.params;
  pool.query(
    "select * from regions where region_id = $1",
    [id],
    (error, result) => {
      if (error) {
        throw error;
      }
      res.status(200).json(result.rows);
    }
  );
});

app.post("/api/region/", (req, res) => {
  const { region_name } = req.body;
  pool.query(
    "insert into regions (region_name) values ($1)",
    [region_name],
    (error, result) => {
      if (error) {
        throw error;
      }
      res.status(200).json(result.rowCount);
    }
  );
});
app.put("/api/region/:id", (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  pool.query(
    "update regions set region_name=$1 where region_id=$2",
    [name, id],
    (error, result) => {
      if (error) {
        throw error;
      }
      res.status(200).json(result.rowCount);
    }
  );
});
app.delete("/api/region/:id", (req, res) => {
  const { id } = req.params;
  pool.query(
    "delete from regions where region_id=$1 ",
    [id],
    (error, result) => {
      if (error) {
        throw error;
      }
      res.status(200).json(result.rowCount);
    }
  );
});

// app countries
app.get("/api/country", (req, res) => {
  pool.query("select * from countries", [], (error, result) => {
    if (error) {
      throw error;
    }
    res.status(200).json(result.rows);
  });
});
app.get("/api/country/:id", (req, res) => {
  const { id } = req.params;
  pool.query(
    "select * from countries where country_id=$1",
    [id],
    (error, result) => {
      if (error) {
        throw error;
      }
      res.status(200).json(result.rows);
    }
  );
});
app.post("/api/country/", (req, res) => {
  const { country_id, country_name, region_id } = req.body;
  pool.query(
    "insert into countries (country_id, country_name, region_id) values ($1,$2,$3)",
    [country_id, country_name, region_id],
    (error, result) => {
      if (error) {
        throw error;
      }
      res.status(200).json(result.rowCount);
    }
  );
});
app.put("/api/country/:id", (req, res) => {
  const { id } = req.params;
  const { country_id, name, region_id } = req.body;
  pool.query(
    "update countries set country_id=$1, country_name=$2, region_id=$3 where country_id=$4",
    [country_id, name, region_id, id],
    (error, result) => {
      if (error) {
        throw error;
      }
      res.status(200).json(result.rowCount);
    }
  );
});
app.delete("/api/country/:id", (req, res) => {
  const { id } = req.params;
  pool.query(
    "delete from countries where country_id=$1",
    [id],
    (error, result) => {
      if (error) {
        throw error;
      }
      res.status(200).json(result.rowCount);
    }
  );
});

// app untuk  Locations
app.get("/api/location/", (req, res) => {
  pool.query("select * from locations", [], (error, result) => {
    if (error) {
      throw error;
    }
    res.status(200).json(result.rows);
  });
});
app.get("/api/location/:id", (req, res) => {
  const { id } = req.params;
  pool.query(
    "select * from locations where location_id=$1",
    [id],
    (error, result) => {
      if (error) {
        throw error;
      }
      res.status(200).json(result.rows);
    }
  );
});
app.post("/api/location/", (req, res) => {
  const {
    location_id,
    street_address,
    postal_code,
    city,
    state_province,
    country_id,
  } = req.body;
  pool.query(
    "insert into locations (location_id, street_address, postal_code, city, state_province, country_id) values ($1,$2,$3,$4,$5,$6)",
    [
      location_id,
      street_address,
      postal_code,
      city,
      state_province,
      country_id,
    ],
    (error, result) => {
      if (error) {
        throw error;
      }
      res.status(200).json(result.rowCount);
    }
  );
});
app.put("/api/location/:id", (req, res) => {
  const { id } = req.params;
  const {
    location_id,
    street_address,
    postal_code,
    city,
    state_province,
    country_id,
  } = req.body;
  pool.query(
    "update locations set location_id=$1, street_address=$2, postal_code=$3, city=$4, state_province=$5, country_id=$6 where location_id=$7 ",
    [
      location_id,
      street_address,
      postal_code,
      city,
      state_province,
      country_id,
      id,
    ],
    (error, result) => {
      if (error) {
        throw error;
      }
      res.status(200).json(result.rowCount);
    }
  );
});
app.delete("/api/location/:id", (req, res) => {
  const { id } = req.params;
  pool.query(
    "delete from locations where location_id=$1",
    [id],
    (error, result) => {
      if (error) {
        throw error;
      }
      res.status(200).json(result.rowCount);
    }
  );
});

// departments
app.get("/api/department/", (req, res) => {
  pool.query("select * from departments", [], (error, result) => {
    if (error) {
      throw error;
    }
    res.status(200).json(result.rows);
  });
});
app.get("/api/department/:id", (req, res) => {
  const { id } = req.params;
  pool.query(
    "select * from departments where department_id=$1",
    [id],
    (error, result) => {
      if (error) {
        throw error;
      }
      res.status(200).json(result.rows);
    }
  );
});
app.post("/api/department/", (req, res) => {
  const { department_id, department_name, location_id } = req.body;
  pool.query(
    "insert into departments (department_id, department_name, location_id) values ($1,$2,$3) ",
    [department_id, department_name, location_id],
    (error, result) => {
      if (error) {
        throw error;
      }
      res.status(200).json(result.rowCount);
    }
  );
});
app.put("/api/department/:id", (req, res) => {
  const { id } = req.params;
  const { department_id, department_name, location_id } = req.body;
  pool.query(
    "update departments set department_id=$1, department_name=$2, location_id=$3 where department_id=$4 ",
    [department_id, department_name, location_id, id],
    (error, result) => {
      if (error) {
        throw error;
      }
      res.status(200).json(result.rowCount);
    }
  );
});
app.delete("/api/department/:id", (req, res) => {
  const { id } = req.params;
  pool.query(
    "delete from departments where department_id=$1",
    [id],
    (error, result) => {
      if (error) {
        throw error;
      }
      res.status(200).json(result.rowCount);
    }
  );
});

// jobs
app.get("/api/job/", (req, res) => {
  pool.query("select * from jobs", [], (error, result) => {
    if (error) {
      throw error;
    }
    res.status(200).json(result.rows);
  });
});
app.get("/api/job/:id", (req, res) => {
  const { id } = req.params;
  pool.query("select * from jobs where job_id=$1", [id], (error, result) => {
    if (error) {
      throw error;
    }
    res.status(200).json(result.rows);
  });
});
app.post("/api/job/", (req, res) => {
  const { job_id, min_salary, max_salary, job_title } = req.body;
  pool.query(
    "insert into jobs (job_id, min_salary, max_salary, job_title) values ($1,$2,$3,$4)",
    [job_id, min_salary, max_salary, job_title],
    (error, result) => {
      if (error) {
        throw error;
      }
      res.status(200).json(result.rowCount);
    }
  );
});
app.put("/api/job/:id", (req, res) => {
  const { id } = req.params;
  const { job_id, min_salary, max_salary, job_title } = req.body;
  pool.query(
    "update jobs set job_id=$1, min_salary=$2, max_salary=$3, job_title=$4 where job_id=$5",
    [job_id, min_salary, max_salary, job_title, id],
    (error, result) => {
      if (error) {
        throw error;
      }
      res.status(200).json(result.rowCount);
    }
  );
});
app.delete("/api/job/:id", (req, res) => {
  const { id } = req.params;
  pool.query("delete from jobs where job_id=$1", [id], (error, result) => {
    if (error) {
      throw error;
    }
    res.status(200).json(result.rowCount);
  });
});

// dependents
app.get("/api/dependent/", (req, res) => {
  pool.query("select * from dependents", [], (error, result) => {
    if (error) {
      throw error;
    }
    res.status(200).json(result.rows);
  });
});
app.get("/api/dependent/:id", (req, res) => {
  const { id } = req.params;
  pool.query(
    "select * from dependents where dependent_id=$1",
    [id],
    (error, result) => {
      if (error) {
        throw error;
      }
      res.status(200).json(result.rows);
    }
  );
});
app.post("/api/dependent", (req, res) => {
  const { dependent_id, first_name, last_name, relationship, employee_id } =
    req.body;
  pool.query(
    "insert into dependents (dependent_id, first_name, last_name, relationship, employee_id) values ($1,$2,$3,$4,$5)",
    [dependent_id, first_name, last_name, relationship, employee_id],
    (error, result) => {
      if (error) {
        throw error;
      }
      res.status(200).json(result.rowCount);
    }
  );
});
app.put("/api/dependent/:id", (req, res) => {
  const { id } = req.params;
  const { dependent_id, first_name, last_name, relationship, employee_id } =
    req.body;
  pool.query(
    "update dependents set dependent_id=$1, first_name=$2, last_name=$3, relationship=$4, employee_id=$5 where dependent_id=$6",
    [dependent_id, first_name, last_name, relationship, employee_id, id],
    (error, result) => {
      if (error) {
        throw error;
      }
      res.status(200).json(result.rowCount);
    }
  );
});
app.delete("/api/dependent/:id", (req, res) => {
  const { id } = req.params;
  pool.query(
    "delete from dependents where dependent_id=$1",
    [id],
    (error, result) => {
      if (error) {
        throw error;
      }
      res.status(200).json(result.rowCount);
    }
  );
});

// employees
app.get("/api/employee/", (req, res) => {
  pool.query("select * from employees", [], (error, result) => {
    if (error) {
      throw error;
    }
    res.status(200).json(result.rows);
  });
});
app.get("/api/employee/:id", (req, res) => {
  const { id } = req.params;
  pool.query(
    "select * from employees where employee_id=$1",
    [id],
    (error, result) => {
      if (error) {
        throw error;
      }
      res.status(200).json(result.rows);
    }
  );
});
app.post("/api/employee/", (req, res) => {
  const {
    employee_id,
    first_name,
    last_name,
    email,
    phone_number,
    hire_date,
    job_id,
    salary,
    manager_id,
    department_id,
  } = req.body;
  pool.query(
    "insert into employees (employee_id, first_name, last_name, email, phone_number, hire_date, job_id, salary, manager_id, department_id) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)",
    [
      employee_id,
      first_name,
      last_name,
      email,
      phone_number,
      hire_date,
      job_id,
      salary,
      manager_id,
      department_id,
    ],
    (error, result) => {
      if (error) {
        throw error;
      }
      res.status(200).json(result.rowCount);
    }
  );
});
app.put("/api/employee/:id", (req, res) => {
  const { id } = req.params;
  const {
    employee_id,
    first_name,
    last_name,
    email,
    phone_number,
    hire_date,
    job_id,
    salary,
    manager_id,
    department_id,
  } = req.body;
  pool.query(
    "update employees set employee_id=$1, first_name=$2, last_name=$3, email=$4, phone_number=$5, hire_date=$6, job_id=$7, salary=$8, manager_id=$9, department_id=$10 where employee_id=$11",
    [
      employee_id,
      first_name,
      last_name,
      email,
      phone_number,
      hire_date,
      job_id,
      salary,
      manager_id,
      department_id,
      id,
    ],
    (error, result) => {
      if (error) {
        throw error;
      }
      res.status(200).json(result.rowCount);
    }
  );
});
app.delete("/api/employee/:id", (req, res) => {
  const { id } = req.params;
  pool.query(
    "delete from employees where employee_id=$1",
    [id],
    (error, result) => {
      if (error) {
        throw error;
      }
      res.status(200).json(result.rowCount);
    }
  );
});
// projects
app.get("/api/project", (req, res) => {
  pool.query("select * from projects", [], (error, result) => {
    if (error) {
      throw error;
    }
    res.status(200).json(result.rows);
  });
});
app.get("/api/project/:id", (req, res) => {
  const { id } = req.params;
  pool.query(
    "select * from projects where proj_id=$1",
    [id],
    (error, result) => {
      if (error) {
        throw error;
      }
      res.status(200).json(result.rows);
    }
  );
});
app.post("/api/project/", (req, res) => {
  const {
    proj_id,
    proj_name,
    proj_createdon,
    proj_duedate,
    proj_cust_name,
    proj_description,
    proj_status,
    proj_amount,
    proj_account_mgr,
    proj_customer,
  } = req.body;
  pool.query(
    "insert into projects ( proj_id, proj_name, proj_createdon, proj_duedate, proj_cust_name,proj_description, proj_status, proj_amount, proj_account_mgr, proj_customer ) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)",
    [
      proj_id,
      proj_name,
      proj_createdon,
      proj_duedate,
      proj_cust_name,
      proj_description,
      proj_status,
      proj_amount,
      proj_account_mgr,
      proj_customer,
    ],
    (error, result) => {
      if (error) {
        throw error;
      }
      res.status(200).json(result.rowCount);
    }
  );
});
app.put("/api/project/:id", (req, res) => {
  const { id } = req.params;
  const {
    proj_id,
    proj_name,
    proj_createdon,
    proj_duedate,
    proj_cust_name,
    proj_description,
    proj_status,
    proj_amount,
    proj_account_mgr,
    proj_customer,
  } = req.body;
  pool.query(
    "update projects set proj_id=$1, proj_name=$2, proj_createdon=$3, proj_duedate=$4, proj_cust_name=$5, proj_description=$6, proj_status=$7, proj_amount=$8, proj_account_mgr=$9, proj_customer=$10 where proj_id=$11",
    [
      proj_id,
      proj_name,
      proj_createdon,
      proj_duedate,
      proj_cust_name,
      proj_description,
      proj_status,
      proj_amount,
      proj_account_mgr,
      proj_customer,
      id,
    ],
    (error, result) => {
      if (error) {
        throw error;
      }
      res.status(200).json(result.rowCount);
    }
  );
});
app.delete("/api/project/:id", (req, res) => {
  const { id } = req.params;
  pool.query("delete from projects where proj_id=$1", [id], (error, result) => {
    if (error) {
      throw error;
    }
    res.status(200).json(result.rowCount);
  });
});

// Project Assigments
app.get("/api/project_assignment/", (req, res) => {
  pool.query("select * from project_assignment", [], (error, result) => {
    if (error) {
      throw error;
    }
    res.status(200).json(result.rows);
  });
});
app.get("/api/project_assignment/:id", (req, res) => {
  const { id } = req.params;
  pool.query(
    "select * from project_assignment where pras_proj_id=$1",
    [id],
    (error, result) => {
      if (error) {
        throw error;
      }
      res.status(200).json(result.rows);
    }
  );
});
app.post("/api/project_assignment/", (req, res) => {
  const {
    pras_proj_id,
    pras_employee_id,
    pras_startdate,
    pras_enddate,
    pras_status,
  } = req.body;
  pool.query(
    "insert into project_assignment (pras_proj_id, pras_employee_id, pras_startdate,pras_enddate, pras_status) values ($1,$2,$3,$4,$5)",
    [pras_proj_id, pras_employee_id, pras_startdate, pras_enddate, pras_status],
    (error, result) => {
      if (error) {
        throw error;
      }
      res.status(200).json(result.rowCount);
    }
  );
});
app.put("/api/project_assignment/:id", (req, res) => {
  const { id } = req.params;
  const { pras_employee_id, pras_startdate, pras_enddate, pras_status } =
    req.body;
  pool.query(
    "update project_assignment set pras_employee_id=$1,pras_startdate=$2,pras_enddate=$3,pras_status=$4 where pras_proj_id=$5",
    [pras_employee_id, pras_startdate, pras_enddate, pras_status, id],
    (error, result) => {
      if (error) {
        throw error;
      }
      res.status(200).json(result.rowCount);
    }
  );
});

app.delete("/api/project_assignment/:id", (req, res) => {
  const { id } = req.params;
  pool.query(
    "delete from project_assignment where pras_proj_id = $1",
    [id],
    (error, result) => {
      if (error) {
        throw error;
      }
      res.status(200).json(result.rowCount);
    }
  );
});
