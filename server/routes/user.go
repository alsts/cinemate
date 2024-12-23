package routes

import (
	"cinemate.alsts.net/handlers"
	"github.com/gofiber/fiber/v2"
)

// UserRoutes defines routes related to user operations
func UserRoutes(router fiber.Router) {
	userGroup := router.Group("/users")
	userGroup.Get("/", handlers.GetAllUsers)
	userGroup.Post("/", handlers.CreateUser)

	// Auth routes
	authGroup := router.Group("/auth")
	authGroup.Get("/telegram", handlers.HandleTelegramLogin)
}
