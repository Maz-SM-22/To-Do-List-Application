const { GeneralError, BadRequest, NotFoundError } = require('../utils/error');

const handleErrors = (err, req, res, next) => {
    req.flash('info', 'Error Occured :O');
    if (err instanceof NotFoundError) {
        return res.status(err.getStatusCode()).render('error', { error: err, message: req.flash('info') });
    }
    else if (err instanceof BadRequest) {
        return res.status(err.getStatusCode()).render('error', { error: err, message: req.flash('info') });
    }
    return res.status(500).render('error', {
        error: new GeneralError('Unknown Error')
    })
}

module.exports = handleErrors; 
