package handlers

import (
	"github.com/gofiber/fiber/v2"
	"strconv"

	"cinemate.alsts.net/models"
)

// GetMovies returns all movies
func GetMovies(c *fiber.Ctx) error {
	// TODO: Replace with actual database query
	movies := []models.Movie{
		{ID: 1, Title: "The Shawshank Redemption"},
		{ID: 2, Title: "The Godfather"},
	}
	return c.JSON(movies)
}

// GetMovie returns a single movie by ID
func GetMovie(c *fiber.Ctx) error {
	id, err := strconv.Atoi(c.Params("id"))
	if err != nil {
		return c.Status(400).JSON(fiber.Map{
			"error": "Invalid movie ID",
		})
	}

	// TODO: Replace with actual database query
	movie := models.Movie{
		ID:    id,
		Title: "Sample Movie",
	}

	return c.JSON(movie)
}
