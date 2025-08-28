import { AssemblyAI } from "assemblyai";
import fs from "fs";
import config from "../config/config.ts";

const client = new AssemblyAI({
    apiKey: config.models.assemblyKey,
});


export async function transcribeAudio(buffer: Buffer): Promise<string> {
    const tmpPath = `./tmp_${Date.now()}.mp3`;
    await fs.promises.writeFile(tmpPath, buffer);

    try {
        const transcript = await client.transcripts.transcribe({
            audio: tmpPath,
            speech_model: "universal",
        });

        return transcript.text;
    } finally {
        await fs.promises.unlink(tmpPath);
    }
}

export async function transcribeFromUrl(url: string): Promise<string> {
    const transcript = await client.transcripts.transcribe({
        audio: url,
        speech_model: "universal",
    });
    return transcript.text;
}
