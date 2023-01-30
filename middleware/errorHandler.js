const { GeneralError, BadRequest, NotFoundError } = require('../utils/error');

const handleErrors = (err, req, res, next) => {
    if (err instanceof NotFoundError) {
        return res.status(err.getStatusCode()).render('error', { error: err });
    }
    else if (err instanceof BadRequest) {
        return res.status(err.getStatusCode()).render('error', { error: err });
    }
    return res.status(500).render('error', {
        error: new GeneralError('Unknown Error')
    })
}

module.exports = handleErrors; 
