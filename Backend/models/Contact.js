import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({ 
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ["Interested", "Follow Up", "Not Interested"],
    default: 'Interested'
  }, 
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Contact = mongoose.model('Contact', contactSchema);

export default Contact;
