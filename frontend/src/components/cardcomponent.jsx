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

const Cardcomponent = ({ title, description }) => {

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
      <Card className="w-[400px] h-[200px] flex flex-row items-start p-4 relative mx-auto overflow-hidden">
      {/* Left Side - Name & Description */}
      <div className="flex-1 overflow-hidden">
        <CardHeader className="p-0 pb-2"> {/* Removed extra margin and added spacing below */}
          <CardTitle className="text-lg truncate w-full">{title}</CardTitle>
        </CardHeader>
        <CardContent className="p-0 mt-2"> {/* Added margin-top for spacing */}
          <CardDescription className="text-sm text-gray-600 w-full">
            {description}
          </CardDescription>
        </CardContent>
      </div>

      {/* Right Side - Image */}
      <div className="w-20 h-20 ml-4 flex-shrink-0">
        <img src={profileImage} alt="Card Image" className="w-full h-full object-cover rounded-lg" />
      </div>

      {/* Footer - Smaller Buttons */}
      <CardFooter className="absolute bottom-2 left-0 w-full flex justify-end gap-2">
        <Button variant="default" size="sm" className="px-3 py-1 text-xs">Let's go stats</Button>
        <Button variant="outline" size="sm" className="px-3 py-1 text-xs">Go to Article</Button>
        <button onClick={toggleBookmark}>{bookmarked ? <BookmarkCheck/> : <Bookmark/>}</button>
      </CardFooter>
    </Card>
    <Toaster/>
    </div>
  );
};

export default Cardcomponent;
