package routes

import (
	"github.com/gofiber/fiber/v2"
)

// RegisterRoutes sets up all application routes
func RegisterRoutes(app *fiber.App) {
	// Create API group
	api := app.Group("/api")

	// Register all routes under /api
	SetupUserRoutes(api)
	SetupMovieRoutes(api)
	SetupAuthRoutes(api)
}
