const Joi = require('joi');
const validate = require('../helpers/validator');
const client = require("../Client/index");
const { BadRequest } = require('../helpers/error-helper');

const getPunch=(att,in_out)=>{
      const punches=att.punches || []
      return in_out="in"? Math.min(...punches):Math.max(...punches)
}


const GetAttendanceTracks = async (req) => {

    const schema = {
        employee_id:Joi.string().uuid(),
        from_date:Joi.string().isoDate(),
        to_date:Joi.string().isoDate()
    };

    validate(req, schema);

    const { data: all } = await client().client.from("employees").select().eq("id", req.employee_id)
    const employee = all[0]
    if (!employee) {
        throw new BadRequest("The Employee doesnot exists")
    }

    let today=new Date()
    let lastMomthDay = new Date(new Date().setDate(today.getDate() - 30));
    const dateLocalStr = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate()
    const dateLocalStrLastMonth = lastMomthDay.getFullYear() + "-" + (lastMomthDay.getMonth() + 1) + "-" + lastMomthDay.getDate()
    let to_date =   req?.to_date || dateLocalStr
    let from_date= req?.from_date || dateLocalStrLastMonth
   
    if(req?.to_date && req?.from_date && Date.parse(req?.to_date)< Date.parse(req.from_date)){
        throw new BadRequest(" End date cannot be smaller than start date")
    }

    const attendances = await client().client.from("attendances").select().eq("employee_id", employee.id)
    const requiredAtts = (attendances.data || []).filter((attendance) => Date.parse(attendance.date_of_punch )>= Date.parse(from_date) && Date.parse(attendance.date_of_punch) <= Date.parse(to_date))


  
   const response=[]
   requiredAtts.forEach(att => {
    response.push({
        date:att.date_of_punch,
        is_a_holiday:[0,6].includes((new Date(Date.parse(att.date_of_punch))).getDay()),
        punch_in:getPunch(att,"in")? (new Date(getPunch(att,"in"))):null,
        punch_out:getPunch(att,"out")?(new Date(getPunch(att,"out"))):null,
        taken_leave:att.taken_leave
    })
   });
   return response


};

module.exports = GetAttendanceTracks;