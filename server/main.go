package main

import (
	"log"

	"cinemate.alsts.net/config"
	"cinemate.alsts.net/routes"
	"github.com/gofiber/fiber/v2"
	"github.com/joho/godotenv"
)

func main() {
	// Load environment variables
	if err := godotenv.Load(); err != nil {
		log.Printf("Warning: .env file not found: %v", err)
	}

	// Initialize Fiber
	app := fiber.New()

	// Setup app config and middleware
	config.SetupAppConfig(app)

	// Setup routes
	routes.RegisterRoutes(app)

	// Start server
	log.Fatal(app.Listen(":3000"))
}