const swaggerAutogen = require("swagger-autogen")();
const outputFile = "./swagger/swagger.json";
const endpointsFiles = ["../server.js", "../controllers/**/*.js"];
const doc = {
    info: {
        version: "1.0.0",
        title: "Task API Documentation",
        description: "Task API Documentation",
    },
    host: "localhost:5000",
    basePath: "/",
    schemes: ["http"],
    consumes: ["application/json"],
    produces: ["application/json"],
    tags: [
        {
            name: "User",
            description: "Endpoints to register, login,current user",
        },
        {
            name: "Task",
            description: "Endpoints to get, create, update and delete a task",
        },

        {
            name: "Role",
            description: "Endpoints to get ,assign ,remove roles of user",
        },
    ],
    definitions: {
        User: {
            name: "exampleUser",
            email: "example@gmail.com",
            password: "123456",
            phoneNumber: "1234567890",
        },
        Task: {
            title: "Task title",
            description: "Task description",
        },
        TasksResponse: {
            success: true,
            msg: "response message",
            tasks: [],
        },
        UpdateTask: {
            title: "Task title",
            description: "Task description",
            completed: true,
        },
        Login: {
            email: "example@gmail.com",
            password: "123456",
        },
    },
};
swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require("../server.js");
});
