import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import { convertHourStringToMinutes } from "./utils/convert-hour-string-to-minutes";
import { convertMinutesToHourString } from "./utils/convert-minutes-to-hour-string";

const app = express()

app.use(express.json())

app.use(cors(
    { origin: process.env.FRONTEND_URL }
))

const prisma = new PrismaClient({
    log: ['query']
})

app.get('/games', async (request, response) => {
    const games = await prisma.game.findMany({
        include: {
            _count: {
                select: {
                    ads: true
                }
            }
        }
    })

    return response.json(games)
})

app.post('/games/:id/ads', async (request, response) => {
    const gameId: string = request.params.id
    const body = request.body

    const ad = await prisma.ad.create({
        data: {
            gameId,
            name: body.name,
            yearsPlaying: body.yearsPlaying,
            discord: body.discord,
            weekDays: body.weekDays.join(','),
            hourStart: convertHourStringToMinutes(body.hourStart),
            hourEnd: convertHourStringToMinutes(body.hourEnd),
            useVoiceChannel: body.useVoiceChannel
        }
    })

    return response.status(201).json(ad)
})

app.get('/games/:id/ads', async (request, response) => {
    const gameId = request.params.id

    const ads = await prisma.ad.findMany({
        where: {
            gameId
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    const processedAds = ads.map(({ discord, createdAt, ...rest }) => {
        return {
            ...rest,
            weekDays: rest.weekDays.split(','),
            hourStart: convertMinutesToHourString(rest.hourStart),
            hourEnd: convertMinutesToHourString(rest.hourEnd)
        }
    })

    return response.status(200).json(processedAds)
})

app.get('/ads/:id/discord', async (request, response) => {
    const adId = request.params.id

    const ad = await prisma.ad.findUnique({
        where: {
            id: adId
        },
        select: {
            discord: true
        }
    })

    if (!ad) return response.status(404).send()

    return response.status(200).json({
        discord: ad.discord
    })
})

app.listen(3333)