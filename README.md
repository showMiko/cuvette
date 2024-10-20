# Full Stack Job Posting

## Description
Full Stack Job Posting is a comprehensive job posting application that allows companies to register, verify their identity, and post job listings. The application features email and phone OTP verification for secure user authentication, along with automated email notifications for job postings.

## Features
- **Company Registration**: Companies can register on the platform.
- **Email and Phone OTP Verification**: Ensures secure verification for registered users.
- **Job Posting**: Verified users can post job listings.
- **Email Automation**: Selected email addresses during interview creation receive job descriptions and details.
- **Maintainable UI**: A user-friendly interface for easy navigation and interaction.
- **Authentication and Authorization**: JWT session-based authentication with session persistence.
- **Twilio Integration**: Used for sending OTPs to users.
- **NodeMailer Integration**: Used for automated email notifications.
- **Frontend Development**: Built using React.
- **Backend Development**: Implemented with Node.js and Express.
- **Database**: MongoDB is used for storing user and job information.
- **Organized File Structure**: Maintained for easy readability and maintainability.

## Installation

### Prerequisites
Before you begin, ensure you have the following installed:
- Node.js (LTS version recommended)
- MongoDB (either locally or use a cloud service like MongoDB Atlas)
- Twilio Account (for sending OTPs)
- NodeMailer Account (for sending automated emails)

### Steps
1. **Fork the repository**:
   - Click the "Fork" button at the top right of the GitHub page to create a copy of the repository in your account.

2. **Clone your forked repository**:
   - Go to your forked repository on GitHub, copy the clone URL, and use it to clone the repository to your local machine. Navigate into the cloned directory.

3. **Install dependencies for the backend**:
   - Navigate to the backend directory and install the required packages.

4. **Install dependencies for the frontend**:
   - Navigate to the frontend directory and install the required packages.

5. **Set up environment variables**:
   - In the `backend` directory, create a `.env` file to store your environment variables. Add the following keys and their corresponding values:
     ```
     MONGODB_URI=your_mongodb_connection_string
     TWILIO_ACCOUNT_SID=your_twilio_account_sid
     TWILIO_AUTH_TOKEN=your_twilio_auth_token
     TWILIO_PHONE_NUMBER=your_twilio_phone_number
     EMAIL_USER=your_email@example.com
     EMAIL_PASS=your_email_password
     JWT_SECRET=your_jwt_secret
     ```
   - Replace the placeholders with your actual credentials.

6. **Run the application on your local system**:
   - Start the backend server.
   - Start the frontend application in a separate terminal window or tab.

7. **Access the application**:
   - Open your web browser and go to `http://localhost:3000` to access the frontend of the application.
8. **Link to the Backend**:
   - Open your web browser and go to `https://cuvette-wlsp.onrender.com/`. Since I am using free package of Render there is a downtime and the server might not respond. In that Case Open this Link to get it running and test the frontend. 

## Usage
1. Follow the registration process for companies.
2. Verify your email and phone number using the OTP sent to you.
3. Post job listings as a verified user.
4. Check your email for job posting details.

## Online Access
For using the app online, visit: [https://cuvette-flax.vercel.app/](https://cuvette-flax.vercel.app/)

## Contributing
Contributions are welcome! Please create a pull request or open an issue to discuss any changes or enhancements.
