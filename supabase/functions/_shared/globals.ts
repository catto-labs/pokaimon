import cors from "./cors.ts";

export const sendErrorResponse = (options: {
  message: string;
  status: number;
}) =>
  new Response(
    JSON.stringify({
      success: false,
      error: options.message,
    }),
    {
      headers: {
        ...cors,
        "Content-Type": "application/json",
      },
      status: options.status,
    }
  );

export const sendSuccessResponse = <T>(data: T) =>
  new Response(
    JSON.stringify({
      success: true,
      data,
    }),
    {
      headers: {
        ...cors,
        "Content-Type": "application/json",
      },
      status: 200,
    }
  );

export const randomBetween = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1) + min);
