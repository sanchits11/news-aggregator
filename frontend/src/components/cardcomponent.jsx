import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import profileImage from "@/assets/burner-911030_1280.jpg";
import { Bookmark } from "lucide-react";
import { BookmarkCheck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "./ui/toaster";
import { ToastAction } from "./ui/toast";
import { Toast } from "@radix-ui/react-toast";
import { Lens } from "./magicui/lens";


const Cardcomponent = ({image, title, description, category, article}) => {

    const { toast } = useToast()

    const [bookmarked, setbookmarked] = useState(false)

    const toggleBookmark = () =>{
        setbookmarked((prev) => !prev)

        toast({
          title: "Article Bookmarked",
          description: "Check your profile page!",
          action: (
            <ToastAction altText="Undo action">
              Undo
            </ToastAction>
          ),
        })
    }
  return (
    <div>
      <Card className="relative max-w-md shadow-none">
      <CardHeader>
      <Lens
          zoomFactor={2}
          lensSize={150}
          isStatic={false}
          ariaLabel="Zoom Area"
        >
          <img
            src={image}
            width={500}
            height={500}
          />
      </Lens>
      </CardHeader>
      <CardContent>
        <CardTitle className="text-2xl">{title}</CardTitle>
        <CardDescription>
          {description}
        </CardDescription>
      </CardContent>
      <CardFooter className="space-x-4">
        <Button>{category}</Button>
        <Button variant="secondary">{article}</Button>
        <button onClick={toggleBookmark}>{bookmarked ? <BookmarkCheck/> : <Bookmark/>}</button>
      </CardFooter>
    </Card>
    </div>
  );
};

export default Cardcomponent;

