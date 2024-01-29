type HttpStatusDescriptions = {
    [key: number]: string;
};

export const httpStatusDescriptions: HttpStatusDescriptions = {
    200: "OK",
    201: "Created",
    204: "No Content",
    400: "Bad Request",
    401: "Unauthorized",
    403: "Forbidden",
    404: "Not Found",
    500: "Internal Server Error",
    0: "Unknown error",
};
