import mongoose, { Document, Schema } from 'mongoose';

export interface IProcessStep {
    title: string;
    description: string;
}

export interface IFAQ {
    question: string;
    answer: string;
}

export interface IService extends Document {
    title: string;
    slug: string;
    shortDescription: string;
    fullDescription: string;
    icon: string;
    image?: string;
    features: string[];
    benefits: string[];
    processSteps: IProcessStep[];
    faqs: IFAQ[];
    ctaText: string;
    isActive: boolean;
    order: number;
    createdAt: Date;
    updatedAt: Date;
}

const ProcessStepSchema = new Schema<IProcessStep>({
    title: { type: String, required: true },
    description: { type: String, required: true },
});

const FAQSchema = new Schema<IFAQ>({
    question: { type: String, required: true },
    answer: { type: String, required: true },
});

const ServiceSchema = new Schema<IService>(
    {
        title: { type: String, required: true },
        slug: { type: String, required: true, unique: true },
        shortDescription: { type: String, required: true },
        fullDescription: { type: String, required: true },
        icon: { type: String, required: true, default: 'Star' },
        image: { type: String },
        features: [{ type: String }],
        benefits: [{ type: String }],
        processSteps: [ProcessStepSchema],
        faqs: [FAQSchema],
        ctaText: { type: String, default: 'Contact Us' },
        isActive: { type: Boolean, default: true },
        order: { type: Number, default: 0 },
    },
    { timestamps: true }
);

export default mongoose.models.Service || mongoose.model<IService>('Service', ServiceSchema);
