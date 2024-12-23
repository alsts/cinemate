package routes

import (
	"github.com/gofiber/fiber/v2"
	"cinemate.alsts.net/handlers"
)

// SetupAuthRoutes sets up all authentication-related routes
func SetupAuthRoutes(router fiber.Router) {
	authGroup := router.Group("/auth")
	authGroup.Get("/telegram", handlers.HandleTelegramLogin)
}
