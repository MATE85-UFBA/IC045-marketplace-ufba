import { Button } from "@/components/ui/button";
import { CustomIcon } from "@/modules/components/icon/customIcon";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { FaTrash } from "react-icons/fa";

interface Props {
  onDelete: (id: string) => void;
  demandId: string;
}

export const DeleteModal = ({ onDelete, demandId }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  function handleCloseModal() {
    setIsOpen(false);
  }
  return (
    <Dialog open={isOpen}>
      <DialogTrigger asChild onClick={() => setIsOpen(true)}>
        <Button variant={"ghost"} size={"icon"} title="Deletar">
          <CustomIcon icon={FaTrash} className="!size-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            Tem certeza que deseja remover essa demanda?
          </DialogTitle>
          <DialogDescription>
            <div className="flex gap-2">
              <Button onClick={() => onDelete(demandId)}>Sim</Button>
              <Button onClick={handleCloseModal}>Cancelar</Button>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
