import { Inter } from 'next/font/google'
import './globals.css'
import { AuthProvider } from './hooks'
import Head from 'next/head'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'ChatApp',
  description: `A ChatApp is a software application or platform designed to facilitate real-time communication between users. It enables users to exchange text messages, media files, and sometimes even conduct voice or video calls. Here's a more detailed description:

  **ChatApp Description:**
  
  A ChatApp is a modern and dynamic communication solution that allows individuals or groups to interact seamlessly over the internet. It serves as a virtual space where users can engage in real-time conversations, fostering instant and efficient communication. Key features of a ChatApp often include:
  
  1. **Text Messaging:** Users can send and receive text messages in real-time, enabling quick and asynchronous communication.
  
  2. **Media Sharing:** ChatApps typically support the sharing of various media files, including images, videos, documents, and links, enhancing the richness of conversations.
  
  3. **Group Chats:** Users can create or participate in group chats, facilitating collaboration and communication among multiple individuals simultaneously.
  
  4. **Notifications:** ChatApps often provide real-time notifications to alert users about new messages, ensuring timely responses.
  
  5. **Emojis and Stickers:** Expressive elements like emojis, stickers, and GIFs contribute to a more engaging and lively conversation experience.
  
  6. **User Profiles:** Users can create profiles with personal information, profile pictures, and status updates, adding a social aspect to the platform.
  
  7. **Voice and Video Calls (Optional):** Some ChatApps may offer additional features such as voice and video calls, allowing users to connect in more immersive ways.
  
  8. **Security and Privacy:** Security features, such as end-to-end encryption, may be implemented to protect user data and ensure privacy.
  
  ChatApps find widespread use in various contexts, including personal communication, professional collaboration, customer support, and more. They have become integral tools for staying connected in a fast-paced, digital world, providing a convenient and accessible means of communication for users across different locations and time zones. Whether used for casual conversations, work-related discussions, or team collaboration, a ChatApp enhances connectivity and fosters meaningful interactions in the virtual realm.`,
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" type="image/jpg" href="./ico.jpg" />
      </Head>
      <body className={inter.className}>
          <AuthProvider>
            {children}
          </AuthProvider>
        </body>
    </html>
  )
}
