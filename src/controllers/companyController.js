const { fetchData } = require("../utils/postgres");



const getAllCompanies = async (req, res) => {
  try {
    let companies = await fetchData("Select * from companies")
    if (companies.length === 0) {
      return res.status(404).send({
        success: false,
        message: "Kompaniya topilmadi"
      });
    }
    res.send({
        success: true,
        data: companies
    })
  } catch (error) {
    res.status(error.status || 403).send({
        success: false,
        message: error.message
    })
  }
}

const createCompany = async (req, res) => {
  try {
    let { name } = req.body
    fetchData("Insert into companies(name) values($1)", name)
    res.send({
        success: true,
        message: "kompaniya yaratildi"
    })
  } catch (error) {
    res.status(error.status || 403).send({
        success: false,
        message: error.message
    })
  }
};



const updateCompany = async (req, res) => {
  try {
    let { name } = req.body;
    let { id } = req.params;

    // Check if company exists
    let company = await fetchData("SELECT * FROM companies WHERE id = $1", id);
    if (company.length === 0) {
      return res.status(404).send({
        success: false,
        message: "Kompaniya topilmadi"
      });
    }

    // Update company
    await fetchData("UPDATE companies SET name = $1 WHERE id = $2", name, id);
    res.send({
      success: true,
      message: "Kompaniya yangilandi"
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message
    });
  }
};

const deleteCompany = async (req, res) => {
  try {
    let { id } = req.params;

    // Check if company exists
    let company = await fetchData("SELECT * FROM companies WHERE id = $1", id);
    if (company.length === 0) {
      return res.status(404).send({
        success: false,
        message: "Kompaniya topilmadi"
      });
    }

    // Delete company
    await fetchData("DELETE FROM companies WHERE id = $1", id);
    res.send({
      success: true,
      message: "Kompaniya o'chirildi"
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message
    });
  }
};

const oneGetCompany = async(req, res) => {
  try {
    let { id } = req.params
    let company = await fetchData("SELECT * FROM companies WHERE id = $1", id)

    if (company.length === 0) {
      return res.status(404).send({
        success: false,
        message: "Kompaniya topilmadi"
      });
    }
    res.send({
        success: true,
        data: company
    })
  } catch (error) {
    res.status(error.status || 403).send({
        success: false,
        message: error.message
    })
  }
}


module.exports = {
    createCompany,
    updateCompany,
    deleteCompany,
    getAllCompanies,
    oneGetCompany
}