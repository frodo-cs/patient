import OpenAI from "openai";
import { zodTextFormat } from "openai/helpers/zod";
import config from "../config/config.ts";
import { z } from "zod";

const client = new OpenAI({
    apiKey: config.models.openAIKey,
});

export async function summarizeText(text: string): Promise<string> {
    try {
        const response = await client.responses.create({
            model: "gpt-4o-mini",
            input: [
                {
                    role: "system",
                    content:
                        "You are a medical assistant. Summarize the following medical notes into a **single concise paragraph**, focusing only on key medical details and omitting irrelevant information. Do not use bullet points, lists, or formatting—just plain text in one paragraph.",
                },
                {
                    role: "user",
                    content: text,
                },
            ],
            max_output_tokens: 500,
        });

        return response.output_text?.trim() ?? "No summary available.";
    } catch (error) {
        console.error("Error summarizing text:", error);
        return "Unable to summarize the text at this time.";
    }
}


const FormCodesSchema = z.object({
    M1800: z.number().min(1).max(4).nullable(),
    M1810: z.number().min(1).max(4).nullable(),
    M1820: z.number().min(1).max(4).nullable(),
    M1830: z.number().min(1).max(4).nullable(),
    M1840: z.number().min(1).max(4).nullable(),
    M1850: z.number().min(1).max(4).nullable(),
    M1860: z.number().min(1).max(4).nullable(),
});

export async function extractFormCodes(text: string): Promise<Record<string, number>> {
    try {
        const response = await client.responses.create({
            model: "gpt-4o-mini",
            input: [
                {
                    role: "system",
                    content: `
                You are a medical assistant. 
                From the provided medical notes, extract the following OASIS form codes if relevant:

                M1800: Grooming  
                M1810: Current ability to bathe  
                M1820: Dressing upper body  
                M1830: Dressing lower body  
                M1840: Toileting hygiene  
                M1850: Transfers  
                M1860: Ambulation/locomotion  

                For each code, assign a difficulty rating from 1 to 4:
                1 = Independent / Easy  
                2 = Mild difficulty  
                3 = Moderate difficulty  
                4 = Severe difficulty / Dependent  

                Return the result as a **strict JSON object only** with the code as the key and the number as the value. 
                Do not include explanations or text outside the JSON.
          `,
                },
                {
                    role: "user",
                    content: text,
                },
            ],
            max_output_tokens: 300,
            text: {
                format: zodTextFormat(FormCodesSchema, "formCodes"),
            },
        });

        const output = response.output_text?.trim() ?? "{}";
        return JSON.parse(output);
    } catch (error) {
        console.error("Error extracting form codes:", error);
        return {};
    }
}
