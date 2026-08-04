export type Gender = 'Male' | 'Female' | 'Other' | null;

export interface Customer {
  id: string;                      // Unique identifier (from your database/auth)
  fullName: string;                // The customer's full name
  email: string;                   // The customer's email address
  gender: Gender;                  // Gender selected during profile completion
  dateOfBirth: Date | string | null; // Date of birth
  profileImageUrl?: string | null; // Optional profile image (e.g., from Google)
  phoneNumber?: string | null;     // Optional phone number
  createdAt: Date | string;        // When the profile was created
  updatedAt: Date | string;        // When the profile was last updated
}
