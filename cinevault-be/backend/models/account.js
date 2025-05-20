import mongoose from 'mongoose';

const accountSchema = new mongoose.Schema({
  name: { type: String, required: true },
  plan: { type: String, required: true },
  pricePerMonth: { type: String, required: true },
  duration: [{ type: Number, required: true }],
  concurrentUsers: { type: Number, default: 4 },

  profilePin: { type: String, required: true },

  service: { type: String },
  customService: { type: String },
  features: { type: String },
  restrictProfiles: { type: Boolean, default: false },
  preventDownloads: { type: Boolean, default: false },
  preventChanges: { type: Boolean, default: true },
  additionalInstructions: { type: String },
  publicListing: { type: Boolean, default: true },
  featuredListing: { type: Boolean, default: false },
}, {
  timestamps: true
});

const Account = mongoose.model('Account', accountSchema);

export default Account;
