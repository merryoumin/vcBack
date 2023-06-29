const express = require("express");
const { PrismaClient } = require("@prisma/client");

const router = express.Router();
const client = new PrismaClient();

router.post("/", async (req, res) => {
  try {
    const { account, email } = req.body;

    const existUser = await client.user.findUnique({
      where: {
        account,
      },
    });

    if (existUser) {
      return res.status(400).json({ ok: false, error: "already have" });
    }

    const user = await client.user.create({
      data: {
        account,
        // nickName,
        email,
        // tags: {
        //   connectOrCreate: tags.map((tag) => ({
        //     where: { tagName: tag.tagName },
        //     create: { tagName: tag.tagName },
        //   })),
        // },
      },
    });

    res.json({ ok: true, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, error: "Internal server error" });
  }
});

// 유저조회
router.get("/:account", async (req, res) => {
  try {
    const { account } = req.params;

    const user = await client.user.findUnique({
      where: {
        account,
      },
    });

    if (!user) {
      return res.status(400).json({
        ok: false,
        error: "No user.",
      });
    }

    res.json({
      ok: true,
      user,
    });
  } catch (error) {
    console.error(error);
  }
});

// 회원 수정
router.put("/", async (req, res) => {
  try {
    const { account, email } = req.body;

    const user = await client.user.findUnique({
      where: {
        account,
      },
    });

    if (!user) {
      return res.status(400).json({ ok: false, error: "you can't" });
    }

    const updatedUser = await client.user.update({
      where: {
        account,
      },
      data: {
        // nickName,
        email,
        // teamId,
        // tags: {
        //   connectOrCreate: tags
        //     ? tags.map((tag) => ({
        //         where: { tagName: tag.tagName },
        //         create: { tagName: tag.tagName },
        //       }))
        //     : [],
        // }
      },
    });
    res.json({ ok: true, user: updatedUser });
  } catch (error) {
    res.status(500).json({ ok: false, error: "Error updating user" });
    console.error(error);
  }
});

// router.delete("/:account/:tagName", async (req, res) => {
//   try {
//     const { account, tagName } = req.params;

//     const user = await client.user.findUnique({
//       where: {
//         account,
//       },
//     });

//     if (!user) {
//       return res.status(400).json({
//         ok: false,
//         error: "No user.",
//       });
//     }
//     const tagCheck = await client.tag.findUnique({
//       where: {
//         tagName: tagName,
//       },
//     });

//     if (!tagCheck) {
//       return res.status(400).json({ ok: false, error: "Not exist tag." });
//     }

//     const updatedUser = await client.user.update({
//       where: {
//         account,
//       },
//       data: {
//         tags: {
//           delete: { tagName: tagName },
//         },
//       },
//     });

//     res.json({ ok: true, todo: updatedUser });
//   } catch (error) {
//     console.error(error);
//   }
// });

module.exports = router;
