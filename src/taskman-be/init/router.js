module.exports = (app) => {

    app.use('/', require("../routes/home.routes"));
    
    app.use('/tasks', require('../routes/task.routes'));
    app.use('/groups', require('../routes/group.routes'));
    app.use('/users', require('../routes/user.routes'));

    app.use('/auth', require('../routes/auth.routes'));    
}