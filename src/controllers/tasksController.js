const { fetchData } = require("../utils/postgres");



const getAllTasks = async (req, res) => {
  try {
    let tasks = await fetchData("Select * from tasks")
    if (tasks.length === 0) {
      return res.status(404).send({
        success: false,
        message: "vazifa topilmadi"
      });
    }
    res.send({
        success: true,
        data: tasks
    })
  } catch (error) {
    res.status(error.status || 403).send({
        success: false,
        message: error.message
    })
  }
}

const createTask = async (req, res) => {
  try {
    let { title,description,company_id} = req.body
    fetchData("Insert into tasks(title,description,company_id) values($1, $2, $3)", title, description,company_id)
    res.send({
        success: true,
        message: "vazifa yaratildi"
    })
  } catch (error) {
    res.status(error.status || 403).send({
        success: false,
        message: error.message
    })
  }
};





const updateTask = async(req, res) => {
    try {
        let { title, description, company_id } = req.body
        let {id} = req.params
        let [task] = await fetchData("Select * from tasks where id = $1", id)
        fetchData("Update tasks set title = $1, description = $2,   company_id = $3 where id = $4 ", title || task.title, description || task.description, company_id || task.company_id ,id)

        res.send({
            success: true,
            message: "Yangilandi"
        })
    } catch (error) {
        res.status(error.status || 403).send({
            success: false,
            message: error.message
        })
    }
}


const deleteTask = async (req, res) => {
  try {
    let { id } = req.params;

    let task = await fetchData("SELECT * FROM tasks WHERE id = $1", id);
    if (task.length === 0) {
      return res.status(404).send({
        success: false,
        message: "vazifa topilmadi"
      });
    }
    await fetchData("DELETE FROM tasks WHERE id = $1", id);
    res.send({
      success: true,
      message: "vazifa o'chirildi"
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message
    });
  }
};


const getOneTask = async(req, res) => {
  try {
      let { id } = req.params
      let [task] = await fetchData("SELECT * FROM tasks WHERE id = $1", id)
      if (!task) {
           res.status(404).send({
              success: false,
              message: " vazifa topilmadi"
          });
          return
      }
      res.send({
          success: true,
          data: task
      })
  } catch (error) {
      res.status(error.status || 403).send({
          success: false,
          message: error.message
      })
  }
}



let getByCompanyId = async (req, res) => {
  try {
    let { company_id } = req.params
    if (!company_id) {
      return res.status(400).send({
        success: false,
        message: "company_id mavjud emas"
      });
    }
    let tasks = await fetchData("SELECT * FROM tasks WHERE company_id = $1", company_id);

    if (tasks.length === 0) {
      return res.status(404).send({
        success: false,
        message: "Bu company da vazifa yo'q"
      });
    }
    res.send({
      success: true,
      data: tasks
    });
  } catch (error) {
    res.status(error.status || 500).send({
      success: false,
      message: error.message || "Ichki xato"
    });
  }
};



module.exports = {
    createTask,
    updateTask,
    deleteTask,
    getAllTasks,
    getOneTask,
    getByCompanyId
    
}