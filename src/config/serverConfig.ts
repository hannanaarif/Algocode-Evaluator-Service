// Import the dotenv library
import dotenv from 'dotenv';

// Load environment variables from a .env file into process.env
dotenv.config();

// Export the configuration as a default export
export default {
    PORT: process.env.PORT || 3000,
};
