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
import { Loader2Icon, Sparkles, VideoIcon } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid'
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const AddNewCourseDialog = ({ children }) => {
  const [loading, setLoading] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    includeVideo: false,
    noOfChapters: 1,
    category: "",
    level: "",
  });
  const router = useRouter()

  const onHandleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const onGenerate = async () => {
    if (!formData.name || !formData.category || !formData.level) {
      toast.error("Please fill in all required fields");
      return;
    }

    setLoading(true)
    const courseId = uuidv4();

    try {
      const res = await axios.post("/api/generate-course-layout", {
        ...formData,
        courseId: courseId
      });

      toast.success("Course Layout Generated!");
      router.push("/workspace/edit-course/" + res?.data?.courseId)

    } catch (error) {
      if (error?.response?.data?.response === "Limit Exceeded") {
        router.push('/workspace/billing')
        toast.warning("Free limit reached. Upgrade to Pro to create more.");
        return;
      }
      toast.error("Failed to generate course. Please try again.");
    } finally {
      setLoading(false)
      setDialogOpen(false)
    }
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>

      <DialogContent className="bg-slate-900 border-white/10 sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl text-white">
            Create New Course
          </DialogTitle>
          <DialogDescription className="text-slate-400">
            Let our AI craft a personalized learning path for you.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-5 mt-4">
          {/* ----------- Course Name ------------- */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">
              Topic or Title
            </label>
            <Input
              className="ai-input"
              placeholder="e.g. Python for Data Science"
              onChange={(e) => onHandleInputChange("name", e?.target.value)}
            />
          </div>

          {/* ---------- Description ------------ */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">
              Description (Optional)
            </label>
            <Textarea
              className="ai-input min-h-[100px]"
              placeholder="What specific areas do you want to cover?"
              onChange={(e) =>
                onHandleInputChange("description", e?.target.value)
              }
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* ------------ Level ----------- */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">
                Difficulty
              </label>
              <Select
                onValueChange={(value) => onHandleInputChange("level", value)}
              >
                <SelectTrigger className="ai-input">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent className="bg-slate-900 border-white/10 text-white">
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="moderate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* ------------ Duration/Chapters ------------- */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">
                Chapters
              </label>
              <Input
                type="number"
                className="ai-input"
                placeholder="Ex. 5"
                min={1}
                max={10}
                onChange={(e) =>
                  onHandleInputChange("noOfChapters", e?.target.value)
                }
              />
            </div>
          </div>

          {/* ------------ Category ------------ */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">
              Category
            </label>
            <Input
              className="ai-input"
              placeholder="Tech, Health, Art..."
              onChange={(e) => onHandleInputChange("category", e?.target.value)}
            />
          </div>

          {/* --------------- Toggle --------------- */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/30 border border-white/5">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-purple-500/20 text-purple-400">
                <VideoIcon size={18} />
              </div>
              <div>
                <div className="text-sm font-medium text-white">
                  Include Video Tutorials
                </div>
                <div className="text-xs text-slate-500">
                  AI will curate relevant videos
                </div>
              </div>
            </div>
            <Switch
              onCheckedChange={(val) =>
                onHandleInputChange("includeVideo", val)
              }
            />
          </div>

          {/* ------------- Action Button -------------- */}
          <Button
            disabled={loading}
            onClick={onGenerate}
            className="w-full btn-primary mt-2"
          >
            {loading ? (
              <>
                <Loader2Icon className="animate-spin mr-2" /> Generating Curriculum...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" /> Generate Course Layout
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddNewCourseDialog;
