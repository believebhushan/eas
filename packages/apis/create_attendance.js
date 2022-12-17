const Joi = require('joi');
const validate = require('../helpers/validator');
const client=require("../Client/index");
const { BadRequest } = require('../helpers/error-helper');


const createAttendance = async (req) => {

    const schema = {
        employee_id:Joi.string().uuid(),
        is_on_leave:Joi.bool()
    };

    console.log("reached")

    validate(req, schema);

    const {data:all}= await client().client.from("employees").select().eq("id",req.employee_id)
    const employee=all[0]
    if(!employee){
        throw new BadRequest("The Employee doesnot exists")
    }
    const {data:users}=await client().client.from("users").select().eq("id",employee.user_id)
  
    const today = new Date()

   const dateLocalStr=today.getFullYear()+"-"+(today.getMonth()+1)+"-"+today.getDate()

    

    const attendances= await client().client.from("attendances").select().eq("employee_id",employee.id)
    const todayAtt=(attendances.data || []).find((attendance)=>attendance.date_of_punch===dateLocalStr)
    const currentTimeStamp=(new Date()).getTime()
    
    
 
    if(todayAtt){
        try {
        
         const {error} = await client().client.from("attendances").update({punches:[...todayAtt.punches,currentTimeStamp]}).eq("id",todayAtt.id)
         if(error){
            throw new InternalServerError({errors:error})
         }
         return {id:todayAtt.id,status:"success"}
            
        } catch (error) {
            throw new InternalServerError(error)
          

        }
    }
    else
    {
        const createParams={
            user_id:users[0].id,
            employee_id:req.employee_id,
            date_of_punch:dateLocalStr,
            punches:[currentTimeStamp],
            taken_leave:req?.is_on_leave ? is_on_leave :false
        }
        try {
            const {error,data} = await client().client.from("attendances").insert(createParams)
            if(error){
              throw new InternalServerError({errors:error})
           }
           return "success"

          } catch (error) {
              
          }

    }
  

};

module.exports = createAttendance;