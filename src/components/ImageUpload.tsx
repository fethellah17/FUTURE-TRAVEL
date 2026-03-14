import { useState, useRef } from "react";
import { Upload, X } from "lucide-react";
import { toast } from "sonner";

interface ImageUploadProps {
  value: string;
  onChange: (imageUrl: string) => void;
  label?: string;
  required?: boolean;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_FORMATS = ["image/jpeg", "image/png"];

export const ImageUpload = ({ value, onChange, label = "Image du voyage", required = false }: ImageUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const validateFile = (file: File): boolean => {
    if (!ACCEPTED_FORMATS.includes(file.type)) {
      toast.error("Format non accepté. Utilisez JPG, JPEG ou PNG.");
      return false;
    }
    if (file.size > MAX_FILE_SIZE) {
      toast.error("Fichier trop volumineux. Limite : 5MB.");
      return false;
    }
    return true;
  };

  const handleFile = async (file: File) => {
    if (!validateFile(file)) return;
    
    setIsLoading(true);
    try {
      const base64 = await convertToBase64(file);
      onChange(base64);
      toast.success("Image uploadée avec succès");
    } catch (error) {
      toast.error("Erreur lors de l'upload");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleRemove = () => {
    onChange("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium mb-1.5">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      {value ? (
        <div className="relative inline-block w-full">
          <div className="relative w-full h-48 rounded-lg overflow-hidden border-2 border-accent/30 bg-white">
            <img
              src={value}
              alt="Prévisualisation"
              className="w-full h-full object-cover"
            />
            <button
              type="button"
              onClick={handleRemove}
              className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition-colors shadow-lg"
              aria-label="Supprimer l'image"
            >
              <X size={18} />
            </button>
          </div>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            Cliquez sur le bouton rouge pour changer d'image
          </p>
        </div>
      ) : (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          className={`relative w-full p-8 rounded-lg border-2 border-dashed transition-all cursor-pointer
            ${isDragging
              ? "border-accent bg-accent/5"
              : "border-accent/40 bg-white hover:border-accent/60"
            }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".jpg,.jpeg,.png"
            onChange={handleFileInput}
            className="absolute inset-0 opacity-0 cursor-pointer"
            disabled={isLoading}
          />

          <div className="flex flex-col items-center justify-center text-center">
            <div className="mb-3 p-3 bg-accent/10 rounded-lg">
              <Upload size={24} className="text-accent" />
            </div>
            <p className="text-sm font-semibold text-foreground mb-1">
              Cliquer pour uploader
            </p>
            <p className="text-xs text-muted-foreground mb-3">
              ou glisser-déposer une image
            </p>
            <p className="text-xs text-muted-foreground">
              JPG, JPEG, PNG • Max 5MB
            </p>
          </div>

          {isLoading && (
            <div className="absolute inset-0 bg-white/50 rounded-lg flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-2 border-accent border-t-transparent" />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
