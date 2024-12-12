package config

import "github.com/gofiber/fiber/v2"

// Add app-wide configurations here
func SetupAppConfig(app *fiber.App) {
	// Example: Adding middleware
	app.Use(func(c *fiber.Ctx) error {
		c.Set("Server", "Fiber")
		return c.Next()
	})
}