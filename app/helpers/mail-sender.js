var nodeMailer = require('nodemailer'),
	emailTemplates = require('email-templates'),
	path = require('path'),
	config = require('../../config');

var templatesDir = path.join(__dirname, '..', 'emails');
var tansport = nodeMailer.createTransport('SMTP', {
	host: 'smtp.ym.163.com',
	port: 25,
	authMethod: 'login',
	auth: {
		user: config.mail_server_account || '',
		pass: config.mail_server_password || ''
	}
});

console.log('Mail sender configurated.');

module.exports.sendMail = function(templateName, locals, callback) {
	emailTemplates(templatesDir, function(err, template) {
		if (err) {
			console.error(err);
			callback(err);
		} else {
			template(templateName, locals, function(err, html, text) {
				if (err) {
					console.error(err);
					callback(err);
				} else {
					var message = {
						from: 'Open-PMS<open_pms@163.com>',
						to: locals.receivers,
						html: html,
						text: text
					};

					transport.sendMail(message, function(err, responseStatus) {
						if (err) {
							console.error(err);
							callback(err);
						} else {
							console.log('Send mail successfully.');
							console.log(responseStatus.message);
							callback();
						}
					});
				}
			});
		}
	});
};