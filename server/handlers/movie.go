package handlers

import (
	"github.com/gofiber/fiber/v2"
	"strconv"

	"cinemate.alsts.net/config"
	"cinemate.alsts.net/models"
)

// GetMovies returns all movies
func GetMovies(c *fiber.Ctx) error {
	var movies []models.Movie
	result := config.DB.Find(&movies)
	if result.Error != nil {
		return c.Status(500).JSON(fiber.Map{
			"error": "Failed to fetch movies",
		})
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

	var movie models.Movie
	result := config.DB.First(&movie, id)
	if result.Error != nil {
		return c.Status(404).JSON(fiber.Map{
			"error": "Movie not found",
		})
	}

	return c.JSON(movie)
}
