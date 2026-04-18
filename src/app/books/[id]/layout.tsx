import { Metadata } from "next";
// Adjust this path to wherever your constants.ts file is located
import { books } from "../data"; 

type Props = {
  params: Promise<{ id: string }>;
};

// This function generates the metadata based on your local data file
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  
  // Find the specific book in your constants array
  // Assuming your objects have an 'id' or 'blogNumber' property
  const book = books.find((b) => b.id === id);

  if (!book) {
    return {
      title: "Book Not Found",
    };
  }

  const socialImage = "https://res.cloudinary.com/dasl9qdnu/image/upload/v1775479618/Channel_Avatar_suag7u.png";

  return {
    // English title from your data file
    title: book.entitle, 
    // The description you requested with your name in Arabic
    description: `Read the summary of ${book.entitle} by Mahmoud Elrashedy (محمود الرشيدي).`,
    
    openGraph: {
      title: `${book.entitle} | Mahmoud Elrashedy`,
      description: `Read the summary of ${book.entitle} by Mahmoud Elrashedy (محمود الرشيدي).`,
      type: "article",
      images: [
        {
          url: socialImage,
          width: 1200,
          height: 630,
          alt: `Book summary: ${book.entitle}`,
        },
      ],
    },
    
    twitter: {
      card: "summary_large_image",
      title: book.entitle,
      description: `Read the summary of ${book.entitle} by Mahmoud Elrashedy.`,
      images: [socialImage],
    },
  };
}

export default function BookLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}