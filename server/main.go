package main

import (
	"log"
	"cinemate.alsts.net/routes"
	"github.com/gofiber/fiber/v2"
)

func main() {
	// Initialize Fiber
	app := fiber.New()

	// Setup routes
	routes.RegisterRoutes(app)

	// Start server
	log.Fatal(app.Listen(":3000"))
}