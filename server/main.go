package main

import (
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/joho/godotenv"

	"cinemate.alsts.net/config"
	"cinemate.alsts.net/routes"
)

func main() {
	// Load environment variables
	if err := godotenv.Load(); err != nil {
		log.Printf("Warning: .env file not found: %v", err)
	}

	// Run database migrations
	if err := config.RunMigrations(); err != nil {
		log.Fatalf("Failed to run migrations: %v", err)
	}

	// Initialize database connection
	config.InitDB()

	// Initialize Fiber
	app := fiber.New()

	// Setup app config and middleware
	config.SetupAppConfig(app)

	// Setup routes
	routes.RegisterRoutes(app)

	// Start server
	log.Fatal(app.Listen(":3000"))
}