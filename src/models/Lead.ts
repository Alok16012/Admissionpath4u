import mongoose, { Schema, Document } from 'mongoose';

export interface ILead extends Document {
    name: string;
    email: string;
    phone: string;
    state: string;
    interestedCourse: string;
    message?: string;
    source?: string;
    status: 'new' | 'contacted' | 'enrolled';
    createdAt: Date;
}

const LeadSchema: Schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    state: { type: String },
    interestedCourse: { type: String },
    message: { type: String },
    source: { type: String, default: 'Contact Page' },
    status: { type: String, enum: ['new', 'contacted', 'enrolled'], default: 'new' },
}, { timestamps: true });

export default mongoose.models.Lead || mongoose.model<ILead>('Lead', LeadSchema);
