import { Router } from "express"
import { prisma } from "../prismaClient.js"

const router = Router()

//Create User
router.post("/users", async (req, res) => {
  try {
    const { username } = req.body

    const existingUser = await prisma.user.findUnique({ where: { username } })
    if (existingUser) {
      return res.status(200).json(existingUser)
    }

    const user = await prisma.user.create({ data: { username } })

    res.json(user)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

//Create Poll
router.post("/polls", async (req, res) => {
  try {
    const { creatorId, question, options } = req.body

    if (!creatorId) {
      return res.status(400).json({ error: "creatorId must be provided" })
    }

    if (!question || question.length === 0) {
      return res.status(400).json({ error: "question must be provided" })
    }

    if (!options || options.length < 2 || options.length > 8) {
      return res.status(400).json({ error: "Options must be 2 to 8" })
    }

    const poll = await prisma.poll.create({
      data: {
        question,
        creatorId,
        options: {
          create: options.map((text) => ({ text })),
        },
      },
      include: { options: true },
    })
    res.json(poll)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

//Vote on Poll
router.post("/polls/:id/vote", async (req, res) => {
  try {
    const { userId, optionId } = req.body

    if (!userId) {
      return res.status(400).json({ error: "userId must be provided" })
    }

    if (!optionId) {
      return res.status(400).json({ error: "optionId must be provided" })
    }

    const existingVote = await prisma.vote.findFirst({
      where: {
        userId,
        option: { pollId: Number(req.params.id) },
      },
    })

    if (existingVote) {
      return res.status(400).json({ error: "User has already voted" })
    }

    const vote = await prisma.vote.create({
      data: {
        userId,
        optionId,
      },
    })

    res.json(vote)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

//View Poll Results
router.get("/polls/:id", async (req, res) => {
  try {
    const userId = Number(req.params.id)
    if (isNaN(userId)) {
      return res.status(400).json({ error: "Invalid user ID" })
    }
    const poll = await prisma.poll.findMany({
      where: { creatorId: userId },
      include: {
        options: {
          include: { votes: true },
        },
      },
    })
    if (!poll) return res.status(404).json({ error: "Poll not found" })
    res.json(poll)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

export default router
