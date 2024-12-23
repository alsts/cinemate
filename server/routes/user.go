package routes

import (
	"cinemate.alsts.net/handlers"
	"github.com/gofiber/fiber/v2"
)

// SetupUserRoutes defines routes related to user operations
func SetupUserRoutes(router fiber.Router) {
	userGroup := router.Group("/users")
	userGroup.Get("/", handlers.GetAllUsers)
	userGroup.Post("/", handlers.CreateUser)
}
