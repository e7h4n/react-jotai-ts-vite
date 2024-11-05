import { http, RequestHandler } from 'msw'

export const handlers: RequestHandler[] = [
    http.get("/api/users/current", () => {
        return Response.json({
            id: "123",
            name: "John Doe",
            email: "john.doe@example.com"
        });
    }),
];
