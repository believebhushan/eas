const Joi = require('joi');
const validate = require('../helpers/validator');
const client = require("../Client/index");
const { BadRequest, InternalServerError } = require('../helpers/error-helper');


const CreateLeave = async (req) => {

    const schema = {
        leave_date: Joi.string().isoDate(),
        employee_id:Joi.string().uuid()
    };

    validate(req, schema);

    const { data: all } = await client().client.from("employees").select().eq("id", req.employee_id)
    const employee = all[0]
    if (!employee) {
        throw new BadRequest("The Employee doesnot exists")
    }

    const { data: users } = await client().client.from("users").select().eq("id", employee.user_id)

    let today = new Date()
    const dateLocalStr = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate()
    if(!req?.leave_date){
        today= new Date(Date.parse(dateLocalStr))
    }
    else{
        today= new Date(Date.parse(req?.leave_date))
    }
   
    
    if ( [0, 6].includes(today.getDay())) {
        throw new BadRequest("Its already a week holiday.")
    }

    const attendances = await client().client.from("attendances").select().eq("employee_id", employee.id)
    const todayAtt = (attendances.data || []).find((attendance) => attendance.date_of_punch === (req?.leave_date || dateLocalStr))

   
    if(todayAtt){
        const {error}= await client().client.from("attendances").update({taken_leave:true}).eq("id",todayAtt.id)
        if(error){
            throw new InternalServerError(error)
        }
      
        return await client().client.from("attendances").select().eq("id",todayAtt.id)
    }
    else{
        const res= await client().client.from("attendances").insert({employee_id:req?.employee_id,user_id:users[0].id, taken_leave:true,date_of_punch:(req?.leave_date || dateLocalStr)})
        return res
    }

    


};

module.exports = CreateLeave;