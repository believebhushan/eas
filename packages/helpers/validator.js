const Joi = require('joi');
const _ = require('lodash');
const { BadRequest } = require('./error-helper');

const validation = (req, schema) => {

    const variable = _.pick(req, Object.keys(schema));
    const { error } = Joi.object().keys(schema).validate(variable);

    if (error) {
        throw new BadRequest(error.message);
    }
};

module.exports = validation;
