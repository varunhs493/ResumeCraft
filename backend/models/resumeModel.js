import mongoose from 'mongoose';

const ResumeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  title:{
    type: String,
    required: true
  },
  thumbnailLink: {
    type: String,
    //required: true
  },
  template:{
    theme:String,
    colorPalette: {String}
  },
  profileInfo:{
    profilePreviewUrl: String,
    fullName: String,
    designation: String,
    summary: String,
  },
  contactInfo: {
    email: String,
    phone: String,
    location: String,
    linkedIn: String,
    github: String,
    website: String,
  },
  workExperience: [{
    companyName: String,
    role: String,
    startDate: String,
    endDate: String,
    description: String
  }],
  education: [{
    institutionName: String,
    degree: String,
    startDate: String,
    endDate: String,
    description: String
  }],
  skills:[{
    name: String,
    progress: Number,
  }],
  projects: [{
    title: String,
    description: String,
    github: String,
    liveDemo: String,
  }],
  certifications: [{
    name: String,
    issuer: String,
    year: String,
  }],
  languages: [{
    name: String,
    progress: Number,
  }],
  interests:[String]
},
{
  timestamps:{createdAt: 'createdAt', updatedAt: 'updatedAt'}
}
);

export default mongoose.model("Resume", ResumeSchema);