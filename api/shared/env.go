package shared

import "github.com/kelseyhightower/envconfig"

type Env struct {
	JWTKey            string `envconfig:"JWTKEY"`
	MysqlDatabase     string `envconfig:"MYSQL_DATABASE"`
	MysqlUser         string `envconfig:"MYSQL_USER"`
	MysqlPassword     string `envconfig:"MYSQL_PASSWORD"`
	MysqlRootPassword string `envconfig:"MYSQL_ROOT_PASSWORD"`
}

func NewConfig() (Env, error) {
	var env Env
	if err := envconfig.Process("", &env); err != nil {
		return env, err
	}

	return env, nil
}
