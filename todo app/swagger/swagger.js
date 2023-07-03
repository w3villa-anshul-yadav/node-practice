const swaggerAutogen = require("swagger-autogen")();
const outputFile = "./swagger/swagger.json";
const endpointsFiles = ["../server.js", "../controllers/v1/**/*.js"];
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
            description:
                "Endpoints to register, login, forget password and reset password",
        },
        {
            name: "Task",
            description: "Endpoints to get, create, update and delete a task",
        },
        {
            name: "Home",
            description: "Endpoints to get home page",
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
        ForgetPassword: {
            email: "example@gmail.com",
        },
        ForgetPasswordResponse: {
            success: true,
            token: "",
            msg: "response message",
        },
        ResetPassword: {
            password: "123456",
            confirmPassword: "123456",
            token: "",
        },
        ResetPasswordResponse: {
            success: true,
            msg: "response message",
        },
        AuthResponse: {
            token: "",
            success: true,
            msg: "response message",
        },
        TaskResponse: {
            success: true,
            msg: "response message",
            task: {},
        },
        SuccessResponse: {
            success: true,
            msg: "response message",
        },
        BadRequest: {
            success: false,
            msg: "response message",
        },
        NotFound: {
            success: false,
            msg: "response message",
        },
        Unauthenticated: {
            success: false,
            msg: "response message",
        },
        InternalServerError: {
            success: false,
            msg: "response message",
        },
    },
};
swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require("../server.js");
});
