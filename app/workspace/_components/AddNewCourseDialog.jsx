import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Sparkle } from "lucide-react";
import { useState } from "react";

const AddNewCourseDialog = ({ children }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    includeVideo: false,
    noOfChapters: 1,
    category: "",
    level: "",
  });

  const onHandleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    console.log(formData);
  };

  const onGenerate = () => {
    console.log(formData);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Course Using AI</DialogTitle>
          <DialogDescription asChild>
            <div className="flex flex-col gap-4 mt-4">
              <div className="flex flex-col gap-2">
                <label>Course Name</label>
                <Input
                  placeholder="Enter Course Name"
                  onChange={(e) => onHandleInputChange("name", e?.target.value)}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label>Course Description (Optional)</label>
                <Textarea
                  placeholder="Enter Course Description"
                  onChange={(e) =>
                    onHandleInputChange("description", e?.target.value)
                  }
                />
              </div>

              <div className="flex flex-col gap-2">
                <label>No. Of Chapters</label>
                <Input
                  placeholder="Enter No. of Chapters"
                  type="number"
                  onChange={(e) =>
                    onHandleInputChange("noOfChapters", e?.target.value)
                  }
                />
              </div>

              <div className="flex gap-3 items-center">
                <label>Include Video</label>
                <Switch
                  onCheckedChange={() =>
                    onHandleInputChange("includeVideo", !formData?.includeVideo)
                  }
                />
              </div>

              <div className="flex flex-col gap-2">
                <label>Difficulty Level</label>
                <Select
                  className="mt-1"
                  onValueChange={(value) => onHandleInputChange("level", value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Difficulty Level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="moderate">Moderate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-2">
                <label>Category</label>
                <Input
                  placeholder="Category (Separated by Comma)"
                  onChange={(e) =>
                    onHandleInputChange("category", e?.target.value)
                  }
                />
              </div>

              <div className="mt-5">
                <Button
                  className={"w-full cursor-pointer active:scale-98"}
                  onClick={onGenerate}
                >
                  {" "}
                  <Sparkle /> Generate Course
                </Button>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default AddNewCourseDialog;
