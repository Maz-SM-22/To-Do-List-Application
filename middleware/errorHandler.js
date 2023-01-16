const { GeneralError, BadRequest, NotFoundError } = require('../utils/error');

const handleErrors = (err, req, res, next) => {
    if (err instanceof NotFoundError) {
        return res.status(err.getStatusCode()).json({
            error: 'Error',
            message: err.message
        });
    }

    else if (err instanceof BadRequest) {
        return res.status(err.getStatusCode()).json({
            status: 'Error',
            message: err.message
        })
    }

    return res.status(500).json({
        status: 'Error',
        message: 'Something went wrong here'
    })
}

module.exports = handleErrors; 