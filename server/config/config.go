package config

import (
	"os"

	"github.com/gofiber/fiber/v2"
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

	// Add middleware to inject config into context
	app.Use(func(c *fiber.Ctx) error {
		c.Locals("telegramSecret", config.TelegramSecret)
		c.Set("Server", "Fiber")
		return c.Next()
	})
}