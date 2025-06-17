interface ModalBaseProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  title: string;
  children: React.ReactNode;
}

export function ConfirmModal({
  isOpen,
  onConfirm,
  onCancel,
  title,
  children,
}: ModalBaseProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="flex w-11/12 max-w-lg  flex-col items-center gap-4 rounded-2xl bg-loteria-cream p-8 text-center text-loteria-blue shadow-2xl">
        <h2 className="text-2xl font-bold">{title}</h2>
        <div className="w-full max-h-[70vh] overflow-y-scroll">{children}</div>
        <button
          className="hover:cursor-pointer  w-full rounded-lg bg-green-600 px-6 py-2 font-bold text-white z-50"
          onClick={onConfirm}
        >
          Yes
        </button>
        <button
          className="hover:cursor-pointer  w-full rounded-lg bg-red-500 px-6 py-2 font-bold text-white z-50"
          onClick={onCancel}
        >
          No
        </button>
      </div>
    </div>
  );
}
