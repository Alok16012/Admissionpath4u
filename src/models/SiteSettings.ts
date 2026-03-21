import mongoose, { Document, Schema } from 'mongoose';

export interface ISiteSettings extends Document {
  key: string;
  aboutMission: string;
  aboutVision: string;
  aboutStats: { label: string; value: string }[];
  aboutWhyUs: { title: string; description: string }[];
  updatedAt: Date;
}

const SiteSettingsSchema = new Schema<ISiteSettings>(
  {
    key: { type: String, default: 'main', unique: true },
    aboutMission: { type: String, default: '' },
    aboutVision: { type: String, default: '' },
    aboutStats: [{ label: String, value: String }],
    aboutWhyUs: [{ title: String, description: String }],
  },
  { timestamps: true }
);

export default mongoose.models.SiteSettings ||
  mongoose.model<ISiteSettings>('SiteSettings', SiteSettingsSchema);
