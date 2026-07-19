interface PrimaryButtonProps {
  text: string;
}

export default function PrimaryButton({
  text,
}: PrimaryButtonProps) {
  return (
    <button
      className="
        w-full
        bg-green-700
        hover:bg-green-800
        text-white
        py-4
        rounded-2xl
        font-semibold
        transition
      "
    >
      {text}
    </button>
  );
}