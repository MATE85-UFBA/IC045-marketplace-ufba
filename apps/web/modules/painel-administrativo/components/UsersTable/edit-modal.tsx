import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { UserType } from "../../types/user";
import { Edit } from "lucide-react";
import { EditForm } from "./edit-form";
import { useState } from "react";

function EditModal(user: UserType) {
  const [isOpen, setIsOpen] = useState(false);

  function handleCloseModal() {
    setIsOpen(false);
  }

  return (
    <Dialog open={isOpen}>
      <DialogTrigger
        className="bg-primary text-white py-2 px-4 text-sm rounded-md hover:brightness-110"
        onClick={() => setIsOpen(true)}
      >
        <Edit />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar usuário</DialogTitle>
          <DialogDescription>
            <EditForm user={user} closeModal={handleCloseModal} />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export { EditModal };
