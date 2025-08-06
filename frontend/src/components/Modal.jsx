import Button from "./Button";

export default function Modal({
  isOpen,
  onClose,
  onConfirm,
  title,
  children,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
        <h3 className="text-lg font-bold mb-4">{title}</h3>
        <div>{children}</div>
        <div className="flex justify-end gap-4 mt-6">
          <Button onClick={onClose} className="secondary">
            Cancelar
          </Button>
          <Button onClick={onConfirm} className="primary">
            Confirmar
          </Button>
        </div>
      </div>
    </div>
  );
}
