import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoadingState } from "@/components/ui/loadingState";
import { UserAvatar } from "@/components/ui/user-avatar";
import { useToast } from "@/hooks/use-toast";
import { imageSchema, ImageSchema } from "@/schema/imageSchema";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { Camera, Check, Trash, User } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { User as UserType } from "@prisma/client";
import { useUploadThing } from "@/lib/uploadthing";

interface Props {
  profileImage?: string | null;
}

export const AddUserImage = ({ profileImage }: Props) => {
  const [imagePreview, setImagePreview] = useState("");
  const inputRef = useRef<null | HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { update } = useSession();
  const { toast } = useToast();

  const form = useForm<ImageSchema>({
    resolver: zodResolver(imageSchema),
  });

  const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      const result = imageSchema.safeParse({ image: selectedFile });
      if (result.success) {
        form.clearErrors("image");
        form.setValue("image", selectedFile);
        setImagePreview(URL.createObjectURL(e.target.files[0]));
      } else {
        const errors = result.error.flatten().fieldErrors.image;
        errors?.forEach((error) => form.setError("image", { message: error }));
      }
    }
  };

  const { startUpload, isUploading } = useUploadThing("imageUploader", {
    onUploadError: (error) => {
      toast({
        title: "Image is uploading",
        variant: "destructive",
      });
    },
    onClientUploadComplete: (data) => {
      if (data) uploadProfileImage(data[0].url);
      else {
        toast({
          title: "Something went wrong",
          variant: "destructive",
        });
      }
    },
  });

  const { mutate: deleteProfileImage, isPending: isDeleting } = useMutation({
    mutationFn: async () => {
      const { data } = await axios.post(`/api/profile/delete_profile_image`);
      return data as UserType;
    },
    onError: (err) => {
      toast({
        title: "Something went wrong",
        variant: "destructive",
      });
    },
    onSuccess: async () => {
      toast({
        title: "Image deleted successfully",
      });
      await update();
      router.refresh();
    },
    mutationKey: ["deleteProfileImage"],
  });

  const { mutate: uploadProfileImage, isPending } = useMutation({
    mutationFn: async (profileImage: string) => {
      const { data } = await axios.post(`/api/profile/profileImage`, {
        profileImage,
      });
      return data as UserType;
    },
    onError: (err) => {
      toast({
        title: "Error uploading images",
        variant: "destructive",
      });
    },
    onSuccess: async () => {
      toast({
        title: "Image is uploaded succesfully",
      });
      setOpen(false);
      await update();
      router.refresh();
    },
    mutationKey: ["updateProfileImage"],
  });

  const imageOptions = useMemo(() => {
    if (!imagePreview && profileImage) {
      return {
        canDelete: true,
        canSave: false,
      };
    } else if (imagePreview && profileImage) {
      return {
        canDelete: false,
        canSave: true,
      };
    } else if (imagePreview && !profileImage) {
      return {
        canDelete: false,
        canSave: true,
      };
    } else {
      return {
        canDelete: false,
        canSave: false,
      };
    }
  }, [imagePreview, profileImage]);

  return (
    <div className="w-full flex flex-col justify-center items-center gap-2">
      <p className="text-sm text-muted-foreground">Add a photo</p>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="group relative bg-muted w-16 h-16 md:h-20 md:w-20 rounded-full flex justify-center items-center text-muted-foreground overflow-hidden">
            {profileImage ? (
              <Image
                priority
                src={profileImage}
                alt=""
                fill
                className="object-cover w-full h-full"
              />
            ) : (
              <User />
            )}
            <div className="group-hover:opacity-80 transition-opacity duration-200 opacity-0 w-full h-full absolute bg-black flex justify-center items-center flex-col gap-1 text-xs text-white">
              <Camera size={20} />
              <p>Hover</p>
            </div>
          </Button>
        </DialogTrigger>
        <DialogContent className="flex flex-col items-center justify-center sm:max-w-[28rem] p-0">
          <DialogHeader className="items-center justify-center">
            <DialogTitle>Upload a photo</DialogTitle>
          </DialogHeader>
          {imagePreview ? (
            <div className="rounded-full w-32 h-32 sm:w-52 sm:h-52 relative overflow-hidden my-5">
              <Image
                src={imagePreview}
                alt=""
                fill
                className="object-cover w-full h-full"
              />
            </div>
          ) : (
            <UserAvatar
              className="w-32 h-32 sm:w-52 sm:h-52 my-5"
              size={52}
              profileImage={profileImage}
            />
          )}
          <Form {...form}>
            <form onSubmit={() => {}}>
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex justify-center items-center">
                        <Button
                          onClick={() => {
                            inputRef.current?.click();
                          }}
                          type="button"
                          className="dark:text-white mb-1"
                        >
                          Choose a file
                        </Button>
                        <Input
                          {...field}
                          ref={inputRef}
                          value={undefined}
                          onChange={onImageChange}
                          type="file"
                          id="image"
                          className="hidden"
                          accept="image/*"
                        />
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              ></FormField>

              <div className="flex mt-5 w-full justify-center items-center gap-4">
                <Button
                  type="button"
                  disabled={!imageOptions.canDelete}
                  variant={imageOptions.canDelete ? "default" : "secondary"}
                  className={`rounded-full w-12 h-12 p-2 ${
                    imageOptions.canDelete
                      ? "text-white"
                      : "text-muted-foreground"
                  }`}
                  onClick={() => ()}
                >
                  {isDeleting ? <LoadingState /> : <Trash size={18} />}
                </Button>
                <Button
                  type="submit"
                  disabled={!imageOptions.canSave}
                  variant={imageOptions.canSave ? "default" : "secondary"}
                  className={`rounded-full w-12 h-12 p-2 ${
                    imageOptions.canSave
                      ? "text-white"
                      : "text-muted-foreground"
                  }`}
                >
                  {isPending || isUploading ? (
                    <LoadingState />
                  ) : (
                    <Check size={18} />
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};