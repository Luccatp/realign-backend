"use strict";

import { APIGatewayProxyHandler } from "aws-lambda";
import prisma from "../../utils/db";

module.exports.handler = async (event) => {
  try {
    const body = JSON.parse(event.body);
    console.log(body);
    const id = event.pathParameters.id;

    const result = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        ...body,
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
