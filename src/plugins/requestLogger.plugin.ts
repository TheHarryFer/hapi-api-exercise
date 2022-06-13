import { Server, Request, ResponseToolkit } from "@hapi/hapi";

// Logging incoming request plugin
exports.plugin = {
  name: "requestLogger",
  version: "1.0.0",
  register: async (server: Server, options: any) => {
    // Set start request time
    server.ext("onRequest", (request: Request, h: ResponseToolkit): any => {
      request.headers["x-req-start"] = new Date().getTime().toString();

      return h.continue;
    });

    // Set end request time and calculate response time
    server.ext("onPreResponse", (request: Request, h: ResponseToolkit): any => {
      const start: number = Number(request.headers["x-req-start"]);
      const end: number = new Date().getTime();
      const responseTime: number = end - start;

      request.headers["x-req-end"] = end.toString();
      request.headers["x-response-time"] = responseTime.toString();

      console.log(
        `[${new Date().toISOString()}] ${request.method
          .toUpperCase()
          .padEnd(6, " ")} ${request.url.href} (${responseTime} ms)`
      );
      return h.continue;
    });
  },
};
