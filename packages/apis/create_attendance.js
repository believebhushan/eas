const Joi = require('joi');
const validate = require('../helpers/validator');
const client=require("../Client/index")


const createAttendance = async (req) => {

    // const schema = {
    //     date: Joi.string().required(),
    //     user_id:Joi.string.uuid(),
    // };

    console.log("reached")

    // validate(req, schema);
    return await client().getDataFrom({relationName:"users",columnToFetch:""})
  

};

module.exports = createAttendance;