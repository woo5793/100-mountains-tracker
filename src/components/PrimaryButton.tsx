interface PrimaryButtonProps {
  text: string;
  disabled: boolean;
}

export default function PrimaryButton({
  text,
  disabled,
}: PrimaryButtonProps) {
  return (
    <button
      disabled={disabled}
      className={`
        w-full rounded-2xl py-4 font-semibold transition
        ${
          disabled
            ? "cursor-not-allowed bg-gray-300 text-gray-500"
            : "bg-green-700 text-white hover:bg-green-800 active:scale-[0.99]"
        }
      `}
    >
      {text}
    </button>
  );
}