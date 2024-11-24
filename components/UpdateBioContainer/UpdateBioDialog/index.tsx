"use client";

import { useUpdateBioContext } from "@/contexts/updateBioContext";
import { useUpdateBioDialogFormContext } from "@/contexts/updateBioDialogFormContext";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { UpdateBioForm } from "@/components/UpdateBioContainer/UpdateBioForm";

export const UpdateBioDialog = () => {
  const { data } = useUpdateBioContext();
  const { isOpen, setIsOpen, isPending } = useUpdateBioDialogFormContext();

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(prev) => !isPending && setIsOpen(prev)}
    >
      <DialogTrigger asChild>
        <Button type="button" className="gap-x-2" disabled={!data}>
          <span className="pb-[2px]">編集する</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="w-full max-w-md p-0">
        <ScrollArea className="max-h-screen">
          <div className="p-6">
            <DialogTitle className="text-xl font-bold">
              プロフィールの編集
            </DialogTitle>

            <DialogDescription className="mt-6">
              他人を傷つけるような発言や、社会のルールに反するような内容を投稿するのは避けましょう。そういった行為は法律に触れる可能性があります。
            </DialogDescription>

            <div className="mt-6">
              <UpdateBioForm />
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
