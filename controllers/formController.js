const renderTaskForm = (req, res, ...args) => {
    let task = args.task || null;
    res.render('noteForm', { task: task });
}

const renderLoginForm = (req, res) => {
    res.render('loginForm');
}

const renderRegisterForm = (req, res) => {
    res.render('registerForm');
}

module.exports = { renderTaskForm, renderLoginForm, renderRegisterForm };
