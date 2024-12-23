package routes

import (
	"github.com/gofiber/fiber/v2"
	"cinemate.alsts.net/handlers"
)

// SetupMovieRoutes sets up all movie-related routes
func SetupMovieRoutes(router fiber.Router) {
	movies := router.Group("/movies")
	movies.Get("/", handlers.GetMovies)
	movies.Get("/:id", handlers.GetMovie)
}
