"use strict";

import { APIGatewayProxyHandler } from "aws-lambda";
import prisma from "../../utils/db";

module.exports.handler = async (event) => {
  try {
    const body = JSON.parse(event.body);
    const userExists = await prisma.user.findFirst({
      where: {
        OR: [
          {
            email: body.email,
          },
          {
            phone: body.phone,
          },
        ],
      },
    });
    console.log(userExists);
    if (userExists) {
      const result = await prisma.user.update({
        where: {
          id: userExists.id,
        },
        data: {
          plan: body.plan,
        },
      });
      return {
        statusCode: 200,
        body: JSON.stringify({
          message: "User already exists, plan updated",
          result,
        }),
      };
    }

    const result = await prisma.user.create({
      data: {
        phone: body.phone,
        email: body.email,
        plan: body.plan,
      },
    });

    return {
      statusCode: 201,
      body: JSON.stringify({
        message: "User created",
        result,
      }),
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
