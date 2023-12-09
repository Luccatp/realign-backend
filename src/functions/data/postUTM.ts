"use strict";

import prisma from "../../utils/db";

module.exports.handler = async (event) => {
  try {
    const body = JSON.parse(event.body);
    const result = await prisma.utmData.create({
      data: {
        ...body
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
