package usecase

import (
	gomail "gopkg.in/gomail.v2"
)

type SendMailParam struct {
	From     string
	Username string
	Body     string
	Subject  string
}

func SendMail(param SendMailParam) error {
	mailer := gomail.NewMessage()
	mailer.SetHeader("From", param.From)
	mailer.SetHeader("To", param.From)
	mailer.SetHeader("Subject", param.Subject)
	mailer.SetBody("text/plain", param.Body)

	d := gomail.Dialer{Host: "smtp", Port: 1025}
	if err := d.DialAndSend(mailer); err != nil {
		return err
	}
	return nil
}
