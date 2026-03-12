import { z } from "zod";

const phonePattern = /^[+\d\s().-]{7,}$/;
const optionalTextField = z
  .string()
  .trim()
  .transform((value) => value || undefined)
  .optional();
const optionalPhoneField = z
  .string()
  .trim()
  .refine((value) => value === "" || phonePattern.test(value), "Please enter a valid phone number.")
  .transform((value) => value || undefined)
  .optional();

export const contactInquirySchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name."),
  email: z.email("Please enter a valid email address."),
  phone: optionalPhoneField,
  company: optionalTextField,
  interest: z.string().trim().min(2, "Select a topic."),
  message: z
    .string()
    .trim()
    .min(20, "Please share a few more details.")
    .max(1200, "Message is too long."),
});

export const wholesaleInquirySchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name."),
  email: z.email("Please enter a valid email address."),
  company: z.string().trim().min(2, "Please enter your business name."),
  phone: z
    .string()
    .trim()
    .regex(phonePattern, "Please enter a valid phone number."),
  cityState: z.string().trim().min(2, "Please enter your city and state."),
  businessType: z.string().trim().min(2, "Select a business type."),
  productInterest: z.string().trim().min(2, "Tell us which products interest you."),
  orderQuantity: z.string().trim().min(2, "Share the expected quantity or pack requirement."),
  message: z
    .string()
    .trim()
    .min(30, "Please share more about your requirements.")
    .max(1500, "Message is too long."),
});

export const newsletterSignupSchema = z.object({
  email: z.email("Please enter a valid email address."),
});

export type ContactInquiryInput = z.infer<typeof contactInquirySchema>;
export type WholesaleInquiryInput = z.infer<typeof wholesaleInquirySchema>;
export type NewsletterSignupInput = z.infer<typeof newsletterSignupSchema>;
