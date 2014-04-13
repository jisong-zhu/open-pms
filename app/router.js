/**
 * Config routes
 **/

var messageController = require('./message-controller');
var issueController = require('./issue-controller');
var apiController = require('./api-controller');

var nodeEnv = process.env.NODE_ENV || 'development';

module.exports = function(app) {
    // app.get('/*', messageController.filter);
    app.get('/login', messageController.login);
    app.post('/login', messageController.postLogin);
    app.del('/logout', messageController.logout);
    app.get('/password', messageController.changePassword);
    app.post('/password', messageController.postChangePassword);
    app.get('/', messageController.autoLogin, messageController.message);
    app.post('/messages/post', messageController.postMessage);

    app.get('/messages/:id', messageController.queryMessage);
    app.del('/messages/:id/delete', messageController.deleteMessage);

    app.get('/download/:category/:folder_id/:filename', messageController.download);

    // routes of issue system
    app.get('/issues', issueController.issues);
    app.get('/issues/new', issueController.newIssuePage);
    app.get('/issues/:id/edit', issueController.editIssuePage);
    app.get('/issues/:id', issueController.issueDetail);
    app.post('/issues/create', issueController.createIssue);
    app.post('/issues/:id/update', issueController.updateIssue);
    app.post('/issues/:id/update/status/:status', issueController.updateIssueStatus);
    app.post('/issues/:id/delete', issueController.deleteIssue);
    app.delete('/issues/:id/attachments/:filename', issueController.deleteIssueAttach);
    app.delete('/comments/:id', issueController.deleteComment);

    // routes for api 
    app.get('/api/users', apiController.queryUserList);
    app.get('/api/projects', apiController.queryProjectList);

    // routes for admin
    app.get('/admin/users', issueController.users);
    app.post('/admin/users/create', issueController.createUser);
    app.get('/admin/projects', issueController.projects);
    app.post('/admin/projects/create', issueController.createProject);
    app.post('/admin/projects/:id/update', issueController.updateProject);

    app.use(function(err, req, res, next) {
        if (err) {
            res.render('error', {
                title: 'Error ' + res.statusCode,
                content: err.message
            });
        } else {
            res.render('error', {
                title: 'Error 500',
                content: 'Unknown error.'
            });
        }
    });
};