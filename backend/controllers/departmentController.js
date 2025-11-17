
import Department from "../models/Department.js"

  const getDepartments = async (req, res) => {
    try {
      const departments = await Department.find(); 
      res.status(200).json({ success: true, data: departments });
    } catch (error) {
      console.error("Error fetching departments:", error.message); 
      res.status(500).json({ success: false, error: "Server error" });
    }
  };
  
const addDepartment = async (req,res) => {
   
    try{

        const {dep_name, description} = req.body;
        const newDep = new Department({
        dep_name,
        description
    })
        await newDep.save()
        return res.status(200).json({success:true,department: newDep})
    }catch(error){
        return res.status(500).json({success: false,error: "add department server error "})
    }

}

const getDepartment = async (req,res) => {
    try{

        const {id} = req.params;
        const department = await Department.findById({_id:id})
        return res.status(200).json({success:true, department})
    } catch(error){
        return res.status(500).json({success: false,error: "get department server error "})
    }
      
    }

    const updateDepartment = async (req,res) => {
        try{
            const {id} = req.params;
            const {dep_name,description} = req.body;
            const updateDep = await Department.findByIdAndUpdate({_id:id},{
                dep_name,
                description
            })      
            return res.status(200).json({success:true, updateDep})
        } catch(error){
            return res.status(500).json({success: false,error: "edit department server error "})
        }
    }

 const deleteDepartment = async (req,res) => {

    try{
        const {id} = req.params;
        const deletdep = await Department.findById({_id:id})    
        await deletdep.deleteOne()
        return res.status(200).json({success:true, deletdep})
    } catch(error){
        console.error("Delete Error: ", error);
        return res.status(500).json({success: false,error: "delete department server error "})
    }
 }

export {addDepartment,getDepartments,getDepartment,updateDepartment,deleteDepartment}

