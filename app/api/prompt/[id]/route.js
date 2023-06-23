import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const GET = async (request, {params}) => {
    try {
        await connectToDB()

        const prompt = await Prompt.findById(params.id).populate('creator')
        if(!prompt) return new Response("Prompt not found", {status: 404})
        return new Response(JSON.stringify(prompt), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch all prompts", { status: 500 })
    }
}

export const PATCH = async ( request, {params}) => {
    const {prompt, tag} = await request.json();
    try {
        await connectToDB()
        const currentPrompt = await Prompt.findById(params.id)
        if(!currentPrompt) return new Response("Prompt not found", {status: 404})
        currentPrompt.prompt = prompt
        currentPrompt.tag = tag
        await currentPrompt.save()
        return new Response(JSON.stringify(currentPrompt), { status: 200 })
    } catch (error) {
        return new Response("Failed to update the prompt", { status: 500 })
    }
}

export const DELETE = async (request, {params}) => {
    try {
        await connectToDB();

        await Prompt.findByIdAndRemove(params.id)
        return new Response("Prompt deleted successfully", {status: 200})
    } catch (error) {
        new Response("Failed to delete prompt", {status: 500})
    }
}