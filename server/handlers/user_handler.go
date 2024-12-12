package handlers

import (
	"github.com/gofiber/fiber/v2"
)

// GetAllUsers handles retrieving all users
func GetAllUsers(c *fiber.Ctx) error {
	return c.JSON(fiber.Map{"status": "success", "message": "All users retrieved", "data": nil})
}

// CreateUser handles creating a new user
func CreateUser(c *fiber.Ctx) error {
	// Example: parse and validate JSON body (add your logic)
	type UserInput struct {
		Name string `json:"name"`
	}
	var input UserInput
	if err := c.BodyParser(&input); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"status": "error", "message": "Invalid input", "error": err.Error()})
	}
	return c.JSON(fiber.Map{"status": "success", "message": "User created", "data": input})
}
