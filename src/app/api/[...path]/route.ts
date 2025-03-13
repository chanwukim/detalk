import { NextResponse, type NextRequest } from "next/server";

import serverEnv from "@/config/server-env";

async function handleRequest(request: NextRequest) {
  try {
    const method = request.method;

    // extract headers
    const headers: Record<string, string> = {};
    const skipHeaders = ["host", "content-length"];

    request.headers.forEach((value, key) => {
      if (!skipHeaders.includes(key.toLowerCase())) {
        headers[key] = value;
      }
    });

    // extract body
    let body;
    const contentLength = request.headers.get("content-length");
    const hasBody = contentLength && parseInt(contentLength) > 0;

    if (method !== "GET" && method !== "OPTIONS" && hasBody) {
      const contentType = request.headers.get("content-type") ?? "";
      if (
        contentType.includes("multipart/form-data") ||
        contentType.includes("application/x-www-form-urlencoded")
      ) {
        body = await request.formData();
      } else {
        body = await request.json();
      }
    }

    // extract url and method
    const url = `${serverEnv.apiUrl}${request.nextUrl.pathname}`;

    const response = await fetch(url, {
      method,
      headers,
      body,
    });

    if (!response.ok) {
      if (response.status >= 500) {
        return NextResponse.json(
          { message: response.statusText },
          { status: response.status },
        );
      }

      const init = {
        status: response.status,
        headers: response.headers,
        statusText: response.statusText,
      };

      const responseBody = await response.json();

      return NextResponse.json(responseBody, init);
    }

    const init = {
      status: response.status,
      headers: response.headers,
      statusText: response.statusText,
    };

    const responseBody = await response.json();

    return NextResponse.json(responseBody, init);
  } catch (error) {
    console.warn("[route]", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function GET(request: NextRequest) {
  return handleRequest(request);
}

export async function POST(request: NextRequest) {
  return handleRequest(request);
}

export async function PUT(request: NextRequest) {
  return handleRequest(request);
}

export async function PATCH(request: NextRequest) {
  return handleRequest(request);
}

export async function DELETE(request: NextRequest) {
  return handleRequest(request);
}
