import { Form } from "../models/form.model.ts";

export const FORM_DESCRIPTIONS: Record<keyof Form["data"], string> = {
    M1800: "Grooming",
    M1810: "Current ability to bathe",
    M1820: "Dressing upper body",
    M1830: "Dressing lower body",
    M1840: "Toileting hygiene",
    M1850: "Transfers",
    M1860: "Ambulation/locomotion"
};