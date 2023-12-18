import { Schema } from "mongoose";

export class BaseSchema extends Schema {
    constructor(structure: any, options?: any) {
        super({
            ...structure,
            createdBy: {
                type: String,
                required: true
            },
            updatedBy: {
                type: String
            },
            isDeleted: {
                type: Boolean,
                default: false,
                required: true
            }
        }, { ...options, timestamps: true })
    }
}