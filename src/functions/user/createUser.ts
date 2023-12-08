"use strict";

import { APIGatewayProxyHandler } from "aws-lambda";
import prisma from "../../utils/db";

module.exports.handler = async (event) => {
  try {
    const body = JSON.parse(event.body);
    const result = await prisma.user.create({
      data: {
        phone: body.phone,
      },
    });

    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: error.message,
      }),
    };
  }
};
