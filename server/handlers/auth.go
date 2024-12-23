package handlers

import (
	"crypto/hmac"
	"crypto/sha256"
	"encoding/base64"
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/gofiber/fiber/v2"
)

// TelegramAuthData represents the decoded Telegram auth data
type TelegramAuthData struct {
	AuthDate  string `json:"auth_date"`
	FirstName string `json:"first_name"`
	ID        string `json:"id"`
	Username  string `json:"username"`
}

// VerifyTelegramAuthData verifies the authenticity of the Telegram authentication data
func VerifyTelegramAuthData(authData, secret string) (bool, error) {
	decoded, err := base64.URLEncoding.DecodeString(authData)
	if err != nil {
		return false, fmt.Errorf("error decoding auth data: %v", err)
	}

	data := string(decoded[:len(decoded)-32])
	signature := decoded[len(decoded)-32:]

	hash := hmac.New(sha256.New, []byte(secret))
	hash.Write([]byte(data))
	calculatedSignature := hash.Sum(nil)

	if !hmac.Equal(calculatedSignature, signature) {
		return false, fmt.Errorf("invalid signature")
	}

	return true, nil
}

// HandleTelegramLogin handles the Telegram authentication callback
func HandleTelegramLogin(c *fiber.Ctx) error {
	// Get Telegram secret from environment variable
	telegramSecret := c.Locals("telegramSecret").(string)
	if telegramSecret == "" {
		return c.Status(http.StatusInternalServerError).JSON(fiber.Map{
			"error": "Telegram secret not configured",
		})
	}

	authData := c.Query("auth_data")
	if authData == "" {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{
			"error": "Authentication data not found",
		})
	}

	valid, err := VerifyTelegramAuthData(authData, telegramSecret)
	if !valid {
		return c.Status(http.StatusUnauthorized).JSON(fiber.Map{
			"error": fmt.Sprintf("Invalid authentication data: %v", err),
		})
	}

	decodedAuthData := TelegramAuthData{}
	decodedData, err := base64.URLEncoding.DecodeString(authData)
	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(fiber.Map{
			"error": "Error decoding auth data",
		})
	}

	err = json.Unmarshal(decodedData[:len(decodedData)-32], &decodedAuthData)
	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(fiber.Map{
			"error": "Error unmarshaling auth data",
		})
	}

	// TODO: Create or update user in database
	// TODO: Generate JWT token for the authenticated user

	return c.JSON(fiber.Map{
		"message": "Authentication successful",
		"user":    decodedAuthData,
	})
}
