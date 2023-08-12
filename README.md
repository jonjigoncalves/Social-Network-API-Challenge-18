# Social-Network-API-Challenge-18

This README provides a comprehensive guide to setting up and using the Social Media API for your social network startup. The API is designed to handle large amounts of unstructured data using a NoSQL database, specifically MongoDB. It includes various endpoints for managing users, thoughts, reactions, and friend lists.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
  - [User Routes](#user-routes)
  - [Thought Routes](#thought-routes)
  - [Reaction Routes](#reaction-routes)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. Clone this repository to your local machine.
2. Navigate to the project directory in your terminal.
3. Run `npm install` to install the necessary dependencies.

## Usage

1. Ensure that you have a running MongoDB instance.
2. Configure the MongoDB connection in the `.env` file using the `MONGODB_URI` variable.
3. Run `npm start` to start the server and sync the Mongoose models with the MongoDB database.
4. You can now use API endpoints to interact with the database.

## API Endpoints

### User Routes

- **GET `/api/users`**: Retrieve a list of all users.
- **GET `/api/users/:id`**: Retrieve a specific user by their ID.
- **POST `/api/users`**: Create a new user.
- **PUT `/api/users/:id`**: Update a user's information by their ID.
- **DELETE `/api/users/:id`**: Delete a user by their ID.

### Thought Routes

- **GET `/api/thoughts`**: Retrieve a list of all thoughts.
- **GET `/api/thoughts/:id`**: Retrieve a specific thought by its ID.
- **POST `/api/thoughts`**: Create a new thought.
- **PUT `/api/thoughts/:id`**: Update a thought's content by its ID.
- **DELETE `/api/thoughts/:id`**: Delete a thought by its ID.

### Reaction Routes

- **POST `/api/thoughts/:thoughtId/reactions`**: Add a reaction to a thought.
- **DELETE `/api/thoughts/:thoughtId/reactions/:reactionId`**: Remove a reaction from a thought.
- **POST `/api/users/:userId/friends/:friendId`**: Add a friend to a user's friend list.
- **DELETE `/api/users/:userId/friends/:friendId`**: Remove a friend from a user's friend list.

## Testing

1. Ensure that your server is running on local host 3000.
2. Use a tool like Insomnia to test the different API routes(http://localhost:3000/api/).
3. Test GET routes to retrieve data and verify the JSON format.
4. Test POST, PUT, and DELETE routes to create, update, and delete data.

## Contributing

Any additions are welcome, please just follow the community guidelines 

## License

This project is licensed under the [MIT License](LICENSE).