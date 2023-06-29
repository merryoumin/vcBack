const express = require("express");
const { PrismaClient } = require("@prisma/client");

const router = express.Router();

const client = new PrismaClient();

router.post("/", async (req, res) => {
  try {
    const { account, title, type, status, options } = req.body;
    //없는 유저 확인
    const existUser = await client.VcUser.findUnique({
      where: {
        account,
      },
    });
    //없는 유저 리젝트
    if (!existUser) {
      return res.status(400).json({ ok: false, error: "no user" });
    }

    const newVotes = await client.Votes.create({
      data: {
        authorAccount: {
          connect: VcUser.map((VcUser) => ({
            where: { authorAccount: VcUser.account },
          })),
          title,
          type,
          status,
        },
      },
    });

    const newVoteOption = await client.voteOption.create({
      data: {
        option,
        voteBool,
        voterAccount: {
          connect: VcUser.map((VcUser) => ({
            where: { voterAccount: VcUser.nickName },
          })),
        },
        voteId: newVotes.id,
      },
    });
    await Promise.all(voteOptions);
    res.json({ ok: true, Vote: newVotes });
  } catch (error) {
    console.error(error);
  }
});

//투표
router.post("/:account", async (req, res) => {
  try {
    const { account, type, status, voterAccount, voteId, option, voteBool } =
      req.body;
    //없는 유저 확인
    const existUser = await client.VcUser.findUnique({
      where: {
        account,
      },
    });
    //없는 유저 리젝트
    if (!existUser) {
      return res.status(400).json({ ok: false, error: "no user" });
    }

    const newVoteOption = await client.voteOption.create({
      data: {
        voteId: {
          connect: Votes.map((Votes) => ({
            where: { voteId: Votes.id },
          })),
        },
        option,
        voteBool,
        voterAccount: {
          connect: VcUser.map((VcUser) => ({
            where: { voterAccount: VcUser.nickName },
          })),
        },
      },
    });

    res.json({ ok: true, Vote: newVotes });
    res.json({ ok: true, Vote: newVoteOption });
  } catch (error) {
    console.error(error);
  }
});

router.get("/", async (req, res) => {
  try {
    const allNfts = await client.nft.findMany({
      orderBy: {
        createdAt: "desc",
      },
      skip: parseInt(skip),
      take: 3,
    });

    res.json({ ok: true, allNfts });
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
