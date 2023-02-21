package shaerd

import (
	"go.uber.org/zap"
	"go.uber.org/zap/zapcore"
)

var zapLog *zap.Logger

func Setup() {
	config := zap.Config{
		Level:             zap.NewAtomicLevelAt(zap.InfoLevel),
		Development:       true,
		DisableStacktrace: true,
		Encoding:          "console",
		OutputPaths:       []string{"stdout"},
		ErrorOutputPaths:  []string{"stderr"},
		EncoderConfig: zapcore.EncoderConfig{
			LevelKey:      "severity",
			NameKey:       "logger",
			CallerKey:     "caller",
			StacktraceKey: "stack_trace",
			TimeKey:       "time",
			MessageKey:    "message",
			LineEnding:    zapcore.DefaultLineEnding,
			EncodeTime:    zapcore.RFC3339NanoTimeEncoder,
			EncodeLevel:   zapcore.CapitalColorLevelEncoder,
			EncodeCaller:  zapcore.ShortCallerEncoder,
		},
	}

	var err error
	zapLog, err = config.Build(zap.AddCallerSkip(1))
	if err != nil {
		panic(err)
	}
}

func Info(message string, args ...interface{}) {
	zapLog.Sugar().Infof("%s %s", message, args)
}

func Error(message string, args ...interface{}) {
	zapLog.Sugar().Errorf("%s %s", message, args)
}
