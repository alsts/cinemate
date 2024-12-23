package config

import (
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

// Config holds all configuration for our application
type Config struct {
	TelegramBotToken string
	TelegramSecret   string
}

// LoadConfig loads configuration from environment variables
func LoadConfig() *Config {
	return &Config{
		TelegramBotToken: os.Getenv("TELEGRAM_BOT_TOKEN"),
		TelegramSecret:   os.Getenv("TELEGRAM_SECRET"),
	}
}

// SetupAppConfig configures the Fiber application
func SetupAppConfig(app *fiber.App) {
	config := LoadConfig()

	// Add CORS middleware
	app.Use(cors.New(cors.Config{
		AllowOrigins: "http://localhost:5173,https://alsts.github.io,https://web.telegram.org,https://t.me",
		AllowHeaders: "Origin, Content-Type, Accept",
	}))

	// Add middleware to inject config into context
	app.Use(func(c *fiber.Ctx) error {
		c.Locals("telegramSecret", config.TelegramSecret)
		c.Set("Server", "Fiber")
		return c.Next()
	})
}