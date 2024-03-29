package usecase

import (
	"github.com/htoyoda18/TweetAppV2/api/shared"
	gomail "gopkg.in/gomail.v2"
)

type MailSubject string

const (
	SignUpSubject         = MailSubject("ご登録ありがとうございます")
	PasswordRessetSubject = MailSubject("パスワードのリセット")
)

type SendMailParam struct {
	From     string
	Username string
	Body     string
	Subject  MailSubject
}

func SendMail(param SendMailParam) error {
	shared.Debug(LogVal("SendMail", ""))

	mailer := gomail.NewMessage()
	mailer.SetHeader("From", param.From)
	mailer.SetHeader("To", param.From)
	mailer.SetHeader("Subject", string(param.Subject))
	mailer.SetBody("text/plain", param.Body)

	env, _ := shared.NewEnv()

	d := gomail.Dialer{Host: env.SmtpHost, Port: 1025}
	if err := d.DialAndSend(mailer); err != nil {
		shared.Error(LogVal("SendMail", "gomail.Diale Error", param, err))
		return err
	}
	return nil
}
