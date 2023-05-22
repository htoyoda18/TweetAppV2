package model

import (
	"time"

	"gorm.io/gorm"
)

type ModelAt struct {
	CreatedAt time.Time      `json:"createdAt" binding:"-"`
	UpdatedAt time.Time      `json:"updatedAt" binding:"-"`
	DeletedAt gorm.DeletedAt `json:"-" binding:"-"`
}
