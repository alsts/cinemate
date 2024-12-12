package routes

import (
	"cinemate.alsts.net/handlers"
	"github.com/gofiber/fiber/v2"
)

// UserRoutes defines routes related to user operations
func UserRoutes(app *fiber.App) {
	userGroup := app.Group("/users")
	userGroup.Get("/", handlers.GetAllUsers)
	userGroup.Post("/", handlers.CreateUser)
}
