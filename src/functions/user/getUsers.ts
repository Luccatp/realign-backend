"use strict";

import prisma from "../../utils/db";

module.exports.handler = async (_, res: Response) => {
  try {
    const result = await prisma.user.findMany({
      where: {
        deleted: false,
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
