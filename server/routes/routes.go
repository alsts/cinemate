package routes

import (
	"github.com/gofiber/fiber/v2"
)

// RegisterRoutes sets up all application routes
func RegisterRoutes(app *fiber.App) {
	UserRoutes(app)
}
