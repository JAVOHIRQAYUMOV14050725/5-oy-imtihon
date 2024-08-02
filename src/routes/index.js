const { Router } = require("express")
const { login } = require("../controllers/loginController")
const verifyRole = require("../middlewares/verifyRole")
const verifyToken = require("../middlewares/verifyToken")
const loginSchema = require("../middlewares/validation/login/login")
const validation = require("../middlewares/validation/validation")
const managerCreateSchema = require("../middlewares/validation/managers/create")
const companyCreateSchema = require("../middlewares/validation/companies/create")
const allId = require("../middlewares/validation/allid")
const companyUpdateSchema = require("../middlewares/validation/companies/update")
const { createCompany, updateCompany, deleteCompany, getAllCompanies, oneGetCompany } = require("../controllers/companyController")
const {  getAllWorkers, getOneWorker, createWorker, updateWorker, deleteWorker } = require("../controllers/managersController")
const { getAllTasks, createTask, updateTask, deleteTask, getOneTask, getByCompanyId } = require("../controllers/tasksController")
const createTaskSchema = require("../middlewares/validation/tasks/create")
const updateTaskSchema = require("../middlewares/validation/tasks/update")
const { getAllManager, getOneManager, createManager, updateManager, deleteManager } = require("../controllers/adminController")
const { createUser_task, getAllUser_task, getOneUser_task, updateUser_task, deleteUser_task, getByTaskId, getByUserId } = require("../controllers/user_taskController")
const createUser_TaskSchema = require("../middlewares/validation/user_task/create")
const updateUser_TaskSchema = require("../middlewares/validation/user_task/update")

const router = Router()


// ---------------------login route------------------------------------------------  
router.post("/login", validation(loginSchema), login)




// ------------------------------------company of admin-----------------------------------
router.get("/company/all",  verifyRole("admin"), getAllCompanies )
router.get("/company/get/:id",  verifyRole("admin"), oneGetCompany )
router.post("/company/create", verifyRole("admin"), validation(companyCreateSchema), createCompany)
router.patch("/company/update/:id", verifyToken(), verifyRole("admin"), validation(allId, "params"), validation(companyUpdateSchema),  updateCompany )
router.delete("/company/delete/:id", verifyToken(), verifyRole("admin"),   deleteCompany )




// -------------------------------------------manager of admin---------------------------------
router.get("/manager/all",  verifyRole("admin"), getAllManager )
router.get("/manager/one/:id",  verifyRole("admin"), getOneManager )
router.post("/manager/create", verifyRole("admin"), validation(managerCreateSchema), createManager)
router.patch("/manager/update/:id", verifyToken(), verifyRole("admin"), validation(managerCreateSchema),  updateManager )
router.delete("/manager/delete/:id", verifyToken(), verifyRole("admin"),  deleteManager )




// ----------------------------------------worker of manager--------------------------
router.get("/worker/all",  verifyRole("manager"), getAllWorkers )
router.get("/worker/one/:id",  verifyRole("manager"), getOneWorker )
router.post("/worker/create", verifyRole("manager"), validation(managerCreateSchema), createWorker)
router.patch("/worker/update/:id", verifyToken(), verifyRole("manager"), validation(managerCreateSchema),  updateWorker )
router.delete("/worker/delete/:id", verifyToken(), verifyRole("manager"),  deleteWorker )



// --------------------------------------------task of manager---------------------------------

router.get("/tasks/all", getAllTasks )
router.get("/tasks/:company_id",  getByCompanyId )
router.get("/task/one/:id",  getOneTask )
router.post("/task/create", verifyRole("manager"), validation(createTaskSchema), createTask)
router.patch("/task/update/:id", verifyToken(), verifyRole("manager"), validation(updateTaskSchema),  updateTask)
router.delete("/task/delete/:id", verifyToken(), verifyRole("manager"),  deleteTask)





// ------------------------------------users_tasks of manager--------------------------

router.post("/user_task/create", verifyRole("manager"),validation(createUser_TaskSchema) ,createUser_task)
router.get("/user_task/getAll" ,getAllUser_task)
router.get("/user_task/getByTaskId/:task_id" ,getByTaskId)
router.get("/user_task/getByUserId/:user_id" ,getByUserId)
router.get("/user_task/getOne/:id" ,getOneUser_task)
router.patch("/user_task/update/:id", verifyToken(), verifyRole("manager"), validation(updateUser_TaskSchema), updateUser_task  )
router.delete("/user_task/delete/:id", verifyToken(), verifyRole("manager"),  deleteUser_task )



module.exports = router