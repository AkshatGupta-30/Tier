interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const Switch = ({ checked = true, onChange }: SwitchProps) => {
  return (
    <button
      className="w-12 cursor-pointer rounded-full bg-gray-300 p-1"
      onClick={() => onChange(!checked)}
    >
      <div
        className={`h-5 w-5 translate-x-0 rounded-full transition-all duration-300 ${checked ? 'translate-x-5 bg-blue-700' : 'bg-gray-500'}`}
      />
    </button>
  );
};

export default Switch;
