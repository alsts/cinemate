package routes

import (
	"github.com/gofiber/fiber/v2"
	"cinemate.alsts.net/handlers"
)

// MovieRoutes sets up all movie-related routes
func MovieRoutes(router fiber.Router) {
	movies := router.Group("/movies")
	movies.Get("/", handlers.GetMovies)
	movies.Get("/:id", handlers.GetMovie)
}
